import { readFile, writeFile } from 'fs/promises';

import { camelCase } from 'change-case';
import prettier from 'prettier';
import { resolve } from 'path';
import ts from 'typescript';

const inputFilePath = resolve('./src/schema.d.ts');
const outputFilePath = resolve('./src/methods.ts');
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
					const path = member.name.getText(sourceFile).replace(/"/g, '');
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
									path,
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
									result[operation].params = `operations['${operation}']['parameters']`;
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

	let result = `import { createClient } from './client.js';\n\n`;

	result += `import type { operations, components } from './schema.js';\n\n`;
	result += `const client = createClient({});\n\n`;

	for (const operation in operations) {
		const { path, method, ...args } = operations[operation];

		const argNames = Object.keys(args).join(', ');
		const argsWithTypes = Object.entries(args)
			.map(([name, type]) => `${name}: ${type}`)
			.join(', ');

		result += `export const ${camelCase(operation)} = (${argsWithTypes}) => {
      return client.${method}(${[`'${path}'`, argNames.length && `{${argNames}}`].filter(Boolean).join(', ')});
    };\n\n`;
	}

	await writeFile(
		outputFilePath,
		await prettier.format(result, { ...prettierConfigutation, parser: 'typescript' })
	);

	console.log('Methods generated successfully.');
} catch (error) {
	console.error('An error occurred:', error);
}
