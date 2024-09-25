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

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('removeQuotes', () => {
    it('removes quotes', () => {
      expect(removeQuotes("'hello'")).toBe('hello');
    });
  });

  describe('removeQuestionMark', () => {
    it('removes question mark', () => {
      expect(removeQuestionMark('hello?')).toBe('hello');
    });

    it('removes question mark with quotes', () => {
      expect(removeQuestionMark("'hello?'")).toBe("'hello'");
    });
  });

  describe('removeQuotesAndQuestionMark', () => {
    it('removes quotes and question mark', () => {
      expect(removeQuotesAndQuestionMark("'hello?'")).toBe('hello');
    });
  });

  describe('formatPropertyName', () => {
    it('formats property name', () => {
      expect(formatPropertyName("'hello?'")).toBe('hello');
    });

    it('formats property name with dot', () => {
      expect(formatPropertyName("'hello.world?'")).toBe('world');
    });

    it('formats property name with dot and quotes', () => {
      expect(formatPropertyName("'hello.world?'")).toBe('world');
    });
  });

  describe('formatOperationName', () => {
    it('formats operation name', () => {
      expect(formatOperationName('hello-world')).toBe('helloWorld');
    });
  });

  describe('formatRoute', () => {
    it('formats the route', () => {
      expect(formatRoute("'hello/{world}'")).toBe('hello/${world}');
    });

    it('formats the route with multiple parameters', () => {
      expect(formatRoute("'hello/{world}/{universe}'")).toBe('hello/${world}/${universe}');
    });
  });

  describe('getOperationName', () => {
    it('gets operation name', () => {
      expect(getOperationName("components['ListNamespaces']")).toBe('ListNamespaces');
    });

    it('gets operation name with quotes', () => {
      expect(getOperationName("components['schemas']['ListNamespaces']")).toBe('ListNamespaces');
    });
  });

  describe('toTemplateLiteral', () => {
    it('converts to template literal', () => {
      expect(toTemplateLiteral('{hello}')).toBe('${hello}');
    });

    it('converts to template literal without braces', () => {
      expect(toTemplateLiteral('hello')).toBe('hello');
    });

    it('formats the propert name', () => {
      expect(toTemplateLiteral("{'hello.world?'}")).toBe('${world}');
    });
  });
}
