import { camelCase } from 'change-case';

export function removeQuotes(str: string): string {
  if (str.startsWith("'") && str.endsWith("'")) return str.slice(1, -1);
  return str;
}

export function removeQuotesAndQuestionMark(str: string): string {
  return removeQuotes(removeQuestionMark(str));
}

export function removeQuestionMark(str: string): string {
  return str.replace('?', '');
}

export function formatPropertyName(propertyName: string): string {
  if (propertyName.includes('.')) {
    propertyName = propertyName.split('.').map(removeQuotesAndQuestionMark).pop() as string;
  }

  return camelCase(removeQuotesAndQuestionMark(propertyName));
}

/**
 * Camel case the operation name.
 */
export function formatOperationName(operationName: string): string {
  return camelCase(operationName);
}

/**
 * Remove the quotes and brackets from the indexed access type
 * @param indexedAccessType
 * @returns The operation name
 * @example
 * getOperationName("components['ListNamespaces']") // 'ListNamespaces'
 */
export function getOperationName(indexedAccessType: string): string {
  return indexedAccessType.split("['")[1].split("']")[0];
}

export function toTemplateLiteral(str: string): string {
  if (str.startsWith('{') && str.endsWith('}')) {
    return '${' + formatPropertyName(str) + '}';
  }
  return str;
}

export function formatRoute(route: string) {
  return removeQuotes(route).split('/').map(toTemplateLiteral).join('/');
}
