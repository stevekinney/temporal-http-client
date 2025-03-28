import { describe, expect, it } from 'bun:test';

import {
  formatOperationName,
  formatPropertyName,
  formatRoute,
  getOperationName,
  removeQuestionMark,
  removeQuotes,
  removeQuotesAndQuestionMark,
  toTemplateLiteral,
} from './format';

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
