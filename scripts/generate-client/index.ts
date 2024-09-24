import { file } from 'bun';
import ts from 'typescript';
import prettier from 'prettier';

import { schemaInputPath, clientOutputPath } from './parse-args';
import { getPropertySignatures } from './get-property-signatures';
import { processOperations, processPaths } from './process';
import { createClient } from './create-client';
import { isProperties } from './is-properties';
import { SourceFile } from './source-file';

// Load prettier configuration for code formatting.
const prettierConfigutation = await file('.prettierrc').json();

const schemaFile = file(schemaInputPath);
const schemaContent = await schemaFile.text();
const schemaSourceFile = ts.createSourceFile(
  schemaInputPath,
  schemaContent,
  ts.ScriptTarget.Latest,
);

const sourceFile = new SourceFile(schemaSourceFile);

const { paths, operations } = sourceFile.exportedInterfaces;

const pathsProperties = getPropertySignatures(paths, sourceFile);
const operationsProperties = getPropertySignatures(operations, sourceFile);

if (!isProperties(operationsProperties)) {
  throw new Error('Operations must be an object');
}

const operationsMetadata = processOperations(operationsProperties, sourceFile);

if (!isProperties(pathsProperties)) {
  throw new Error('Paths must be an object');
}

processPaths(pathsProperties, operationsMetadata);

const clientCode = createClient(operationsMetadata);

const code = await prettier.format(clientCode, {
  ...prettierConfigutation,
  parser: 'typescript',
});

await Bun.write(clientOutputPath, code);

console.log(`Client generated successfully: ${clientOutputPath}`);
