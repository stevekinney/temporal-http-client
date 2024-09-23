import { file } from 'bun';
import ts from 'typescript';
import prettier from 'prettier';

import { schemaInputPath, clientOutputPath } from './parse-args';
import { findExportedInterfaces } from './find-exported-interfaces';
import { getPropertySignatures } from './get-property-signatures';
import { processOperations, processPaths } from './process';
import { createClient } from './create-client';

// Load prettier configuration for code formatting.
const prettierConfigutation = await file('.prettierrc').json();

const schemaFile = file(schemaInputPath);
const schemaContent = await schemaFile.text();
const schemaSourceFile = ts.createSourceFile(
  schemaInputPath,
  schemaContent,
  ts.ScriptTarget.Latest,
);

const { paths, operations } = findExportedInterfaces(schemaSourceFile);

const pathsProperties = getPropertySignatures(paths, schemaSourceFile);
const operationsProperties = getPropertySignatures(operations, schemaSourceFile);

const operationsMetadata = processOperations(operationsProperties, schemaSourceFile);
processPaths(pathsProperties, operationsMetadata);

const clientCode = createClient(operationsMetadata);

const code = await prettier.format(clientCode, {
  ...prettierConfigutation,
  parser: 'typescript',
});

await Bun.write(clientOutputPath, code);

console.log(`Client generated successfully: ${clientOutputPath}`);
