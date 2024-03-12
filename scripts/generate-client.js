import { readFile, writeFile } from 'fs/promises';

import prettier from 'prettier';
import { resolve } from 'path';
import ts from 'typescript';

const inputFilePath = resolve('./src/schema.d.ts');
const outputFilePath = resolve('./src/client.ts');
const prettierConfigutation = await readFile('.prettierrc', 'utf8').then(JSON.parse);

/**
 * Parses a TypeScript file to extract information and generate a JSON object.
 * @param {string} filePath Path to the TypeScript file.
 * @returns {Promise<Object>} The generated JSON object.
 */
async function generateMethods(filePath) {
	// Read the TypeScript file
	const fileContents = await readFile(filePath, 'utf8');
	const sourceFile = ts.createSourceFile(filePath, fileContents, ts.ScriptTarget.Latest, true);

	// The result object to be filled with the parsed data
	const result = {};

	// Helper function to process each node in the AST
	const visit = (node) => {
		if (ts.isInterfaceDeclaration(node) && node.name.text === 'paths') {
			node.members.forEach((member) => {
				if (ts.isPropertySignature(member) && member.type) {
					const route = member.name.getText(sourceFile).replace(/"/g, '');
					if (ts.isTypeLiteralNode(member.type)) {
						member.type.members.forEach((typeMember) => {
							if (ts.isPropertySignature(typeMember) && typeMember.type) {
								const methodName = typeMember.name.getText(sourceFile).toUpperCase(); // HTTP method
								const operationName = typeMember.type
									.getText(sourceFile)
									.match(/operations\["(.*?)"\]/)[1];

								if (!result[operationName]) result[operationName] = {};

								result[operationName] = {
									...result[operationName],
									route,
									method: methodName
								};
							}
						});
					}
				}
			});
		}

		if (ts.isInterfaceDeclaration(node) && node.name.text === 'operations') {
			node.members.forEach((member) => {
				if (ts.isPropertySignature(member) && member.type) {
					const operation = member.name.getText(sourceFile);
					if (!result[operation]) result[operation] = {};
					if (ts.isTypeLiteralNode(member.type)) {
						member.type.members.forEach((typeMember) => {
							if (ts.isPropertySignature(typeMember) && typeMember.type) {
								if (typeMember.name.getText(sourceFile) === 'parameters') {
									if (!result[operation]) result[operation] = {};
									typeMember.type.members.forEach((paramMember) => {
										if (ts.isPropertySignature(paramMember) && paramMember.type) {
											result[operation].params = result[operation].params || {};
											if (paramMember.name.getText(sourceFile) === 'path') {
												result[operation].params.path =
													`operations['${operation}']['parameters']['path']`;
											}
											if (paramMember.name.getText(sourceFile) === 'query') {
												result[operation].params.query =
													`operations['${operation}']['parameters']['query']`;
											}
										}
									});
								}

								if (typeMember.name.getText(sourceFile) === 'requestBody') {
									typeMember.type.members.forEach((requestBodyMember) => {
										if (ts.isPropertySignature(requestBodyMember) && requestBodyMember.type) {
											requestBodyMember.type.members.forEach((requestBodyMember) => {
												if (ts.isPropertySignature(requestBodyMember)) {
													const body = requestBodyMember.type.getText(sourceFile);
													result[operation].body = body.replace(/"/g, "'");
												}
											});
										}
									});
								}
							}
						});
					}
				}
			});
		}
	};

	// Start processing the AST
	ts.forEachChild(sourceFile, visit);

	return result;
}

try {
	const operations = await generateMethods(inputFilePath);
	await writeFile('./src/schema.json', JSON.stringify(operations, null, 2));

	const methods = Object.entries(operations)
		.map(([operation, config]) => formatMethod(operation, config))
		.join('\n\n');

	const result = `
		import createClient, { type ClientOptions } from 'openapi-fetch';
		import type { components, operations, paths } from './schema.js';

		export class Client {
			private client: ReturnType<typeof createClient<paths>>;
			private _options: ClientOptions;

			constructor(options: ClientOptions) {
				this._options = options;
				this.client = createClient<paths>(options);
			}
			
			set baseUrl(baseUrl: string) {
				this.client = createClient<paths>({ ...this.options, baseUrl });
			};

			get options() {
				return this._options;
			};

			set options(options: ClientOptions) {
				this.client = createClient<paths>({ ...this.options, ...options });
			};

			${methods}

		}
	`.trim();

	await writeFile(
		outputFilePath,
		await prettier.format(result, { ...prettierConfigutation, parser: 'typescript' })
	);

	console.log('Client generated successfully.');
} catch (error) {
	console.error('An error occurred:', error);
}

/**
 * Formats a method for an API client.
 *
 * @param {string} operation - The name of the operation to be formatted.
 * @param {Object} config - The configuration object for the method.
 * @param {string} config.route - The API route the method will call.
 * @param {string} config.method - The HTTP method to be used.
 * @param {Object} [config.params] - The parameters for the route, if any.
 * @param {string} [config.body] - The body schema reference, if applicable.
 * @returns {string} The formatted method as a string.
 */
function formatMethod(operation, config) {
	// Convert the first character to lowercase to follow JS naming conventions
	const methodName = operation.charAt(0).toLowerCase() + operation.slice(1);

	// Base method structure
	let methodSignature = `${methodName}(`;
	let methodBody = `return this.client.${config.method.toUpperCase()}('${config.route}'`;

	// Determine if params or body are required
	const hasParams = config.params && Object.keys(config.params).length > 0;
	const hasBody = !!config.body;

	// Handling params and/or body
	if (hasParams || hasBody) {
		/** @type { string[] } */
		let paramsList = [];
		/** @type { string[] } */
		let paramsSignature = [];
		let methodParams = `{ `;

		if (config.params) {
			for (let [key, value] of Object.entries(config.params)) {
				paramsList.push(key);
				if (key === 'query') key = 'query?';
				paramsSignature.push(`${key}: ${value}`);
			}
		}

		if (hasBody) {
			paramsList.push('body');
			paramsSignature.push(`body: ${config.body}`);
		}

		methodSignature += `{ ${paramsList.join(', ')} }: { ${paramsSignature.join(', ')} }`;

		// Add a default value if there are only optional parameters
		if (paramsSignature.every((key) => key.includes('?'))) {
			methodSignature += ` = {}`;
		}

		methodParams += hasParams ? `params: { ${Object.keys(config.params).join(', ')} }` : '';

		if (hasBody) {
			methodParams += hasParams ? `, body` : `body`;
		}

		methodParams += ` `;
		methodBody += `, ${methodParams} }`;
	}

	methodSignature += `) {\n\t`;
	methodBody += `);\n};`;

	return methodSignature + methodBody;
}
