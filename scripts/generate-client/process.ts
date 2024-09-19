import type { Properties } from './get-property-signatures';
import { isBody, isResponse } from './request-response';
import { camelCase } from 'change-case';

type HTTPMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

function getOperationName(indexedAccessType: string) {
  return indexedAccessType.split("['")[1].split("']")[0];
}

function formatOperationName(operationName: string) {
  return camelCase(operationName);
}

function formatPropertyName(
  propertyName: string,
  parameterType?: string,
  operation?: { parameters?: { path?: Record<string, string> } },
) {
  let name = camelCase(propertyName.split('.').pop() || propertyName);

  // If the parameter is a query parameter and it is also a path parameter
  if (parameterType === 'query' && operation?.parameters?.path) {
    if (
      Object.keys(operation?.parameters?.path)
        .map((key) => camelCase(key))
        .includes(camelCase(propertyName))
    ) {
      return camelCase(propertyName);
    }
  }

  if (propertyName.endsWith('?')) {
    name = `${name}?`;
  }

  return name;
}

function isHTTPMethod(method: string): method is HTTPMethod {
  return ['get', 'post', 'put', 'delete', 'patch'].includes(method);
}

type OperationMetadata = {
  route: string;
  response: string;
  body: string;
  mappings: Record<string, string>;
  parameters: string[];
  parametersTypes: Record<string, string>;
  query: string[];
  queryTypes: Record<string, string>;
};

export type OperationsMetadataWithRoute = OperationMetadata & {
  route: string;
  method: HTTPMethod;
};

function createOperationsMetadata(): OperationMetadata {
  return {
    route: '',
    response: '',
    body: '',
    mappings: {},
    parameters: [],
    parametersTypes: {},
    queryTypes: {},
    query: [],
  };
}

function withoutQuotesOrQuestionMark(str: string) {
  return str.replace(/'/g, '').replace('?', '');
}

function getParameterData(
  parameter: string,
  property: Properties,
  metadata: OperationMetadata,
  operation: Properties,
) {
  if (parameter === 'query?') parameter = 'query';
  if (parameter === 'path') parameter = 'parameters';
  if (parameter !== 'query' && parameter !== 'parameters') return;

  const types = metadata[`${parameter}Types`];
  const keys = metadata[parameter];

  for (const [propertyName, propertyValue] of Object.entries(property)) {
    const name = formatPropertyName(propertyName, parameter, operation);
    const baseName = withoutQuotesOrQuestionMark(name);

    // Add the parameter to the list of parameters
    types[name] = String(propertyValue);

    // Add the parameter to the list of mappings
    metadata.mappings[baseName] = withoutQuotesOrQuestionMark(propertyName);

    // Add the parameter to the list of keys
    keys.push(baseName);
  }
}

function formatRoute(route: string) {
  return route
    .slice(1, -1)
    .split('/')
    .map((part) => {
      if (part.startsWith('{') && part.endsWith('}'))
        return `\${${formatPropertyName(part.slice(1, -1))}}`;
      return part;
    })
    .join('/');
}

export function processOperations(operations: Properties) {
  const result: Record<string, OperationMetadata> = {};

  for (const [operationName, operation] of Object.entries(operations)) {
    const operationMetadata = (result[operationName] = createOperationsMetadata());
    for (const [propertyName, property] of Object.entries(operation)) {
      if (propertyName === 'parameters') {
        for (const [parameter, parameterValue] of Object.entries(property)) {
          getParameterData(
            parameter,
            parameterValue as Properties,
            operationMetadata,
            operations[operationName] as Properties,
          );
        }
      }
      if (propertyName === 'responses' && isResponse(property)) {
        result[operationName].response = property['200']['content']["'application/json'"];
      }
      if (propertyName === 'requestBody' && isBody(property)) {
        result[operationName].body = property['content']["'application/json'"];
      }
    }
  }

  return result;
}

export function processPaths(
  paths: Properties,
  operationsMetadata: Record<string, OperationMetadata>,
) {
  const result: Record<string, OperationsMetadataWithRoute> = {};

  for (const [pathName, path] of Object.entries(paths)) {
    if (!pathName.includes('/api/v1')) continue;
    for (const [method, operationType] of Object.entries(path as Properties)) {
      const operation = getOperationName(operationType as string);
      const methodName = formatOperationName(operation);
      result[methodName] = result[methodName] || operationsMetadata[operation];
      if (isHTTPMethod(method)) {
        result[methodName].route = formatRoute(pathName);
        result[methodName].method = method;
      }
    }
  }

  return result;
}
