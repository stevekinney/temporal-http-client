import ts from 'typescript';

import { isRequestBody, isHTTPMethod, isResponse } from './request-response';
import { Operations } from './operations-metadata';
import { getOperationName } from './format';

export function processOperations(operations: Properties, sourceFile: ts.SourceFile): Operations {
  const result = new Operations(sourceFile);

  for (const [operationName, operation] of Object.entries(operations)) {
    const operationMetadata = result.add(operationName);

    for (const [propertyName, property] of Object.entries(operation)) {
      if (propertyName === 'parameters') {
        for (const [parameter, parameterValue] of Object.entries(property)) {
          operationMetadata.addParameters(parameter, parameterValue as Record<string, string>);
        }
      }

      if (propertyName === 'responses' && isResponse(property)) {
        operationMetadata.addResponse(property);
      }

      if (propertyName === 'requestBody' && isRequestBody(property)) {
        operationMetadata.addRequestBody(property);
      }
    }
  }

  return result;
}

export function processPaths(paths: Properties, operationsMetadata: Operations) {
  for (const [pathName, path] of Object.entries(paths)) {
    if (!pathName.includes('/api/v1')) continue;

    for (const [method, operationType] of Object.entries(path as Properties)) {
      const operation = getOperationName(String(operationType));

      if (isHTTPMethod(method)) {
        operationsMetadata.get(operation).addRoute(method, pathName);
      }
    }
  }

  return operationsMetadata;
}
