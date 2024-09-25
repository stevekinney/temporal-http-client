import { isRequestBody, isHTTPMethod, isResponse } from './request-response';
import { Operations } from './operations';
import { getOperationName } from './format';
import { SourceFile } from './source-file';

export function processOperations(
  operationsProperties: Properties,
  sourceFile: SourceFile,
): Operations {
  const operations = new Operations(sourceFile);

  for (const [operationName, operation] of Object.entries(operationsProperties)) {
    const operationMetadata = operations.add(operationName);

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

  return operations;
}

export function processPaths(paths: Properties, operations: Operations) {
  for (const [pathName, path] of Object.entries(paths)) {
    if (!pathName.includes('/api/v1')) continue;

    for (const [method, operationType] of Object.entries(path as Properties)) {
      const operation = getOperationName(String(operationType));

      if (isHTTPMethod(method)) {
        operations.get(operation).addRoute(method, pathName);
      }
    }
  }

  return operations;
}
