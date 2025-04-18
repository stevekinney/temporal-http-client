import { camelCase } from 'change-case';

export function removeQuotes(str: string): string {
  if (str.startsWith("'") && str.endsWith("'")) return str.slice(1, -1);
  return str;
}

export function removeQuestionMark(str: string): string {
  return str.replace('?', '');
}

export function removeQuotesAndQuestionMark(str: string): string {
  return removeQuotes(removeQuestionMark(str));
}

/**
 * Grabs the last part of the property name and camel cases it.
 * @param propertyName
 * @returns The formatted property name
 */
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
 * Remove the quotes and format the route to template literal
 * @param route The route to format
 * @returns The formatted route as a template literal
 */
export function formatRoute(route: string) {
  return removeQuotes(route).split('/').map(toTemplateLiteral).join('/');
}

/**
 * Remove the quotes and brackets from the indexed access type
 * @param indexedAccessType
 * @returns The operation name
 * @example getOperationName("components['ListNamespaces']") // 'ListNamespaces'
 * @example getOperationName("components['schemas']['ListNamespaces']") // 'ListNamespaces'
 */
export function getOperationName(indexedAccessType: string): string {
  return removeQuotes(indexedAccessType.split('[').slice(-1)[0].split(']')[0]);
}

/**
 * Turns a string with curly braces to a template literal
 * @param str: A string with curly braces
 * @returns A template literal
 * @example toTemplateLiteral('{hello}') // `${hello}`
 */
export function toTemplateLiteral(str: string): string {
  if (str.startsWith('{') && str.endsWith('}')) {
    return '${' + formatPropertyName(str) + '}';
  }
  return str;
}

