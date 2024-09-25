import { camelCase } from 'change-case';
import { formatPropertyName, removeQuotesAndQuestionMark } from './format';

export class Parameter {
  constructor(
    public readonly kind: ParameterKind,
    public readonly originalKey: string,
    public readonly type: string,
  ) {}

  get isQuery() {
    return this.kind === 'query';
  }

  get isPath() {
    return this.kind === 'path';
  }

  get isMethod() {
    return this.kind === 'method';
  }

  get isOptional() {
    return this.originalKey.endsWith('?');
  }

  get typeSignature() {
    let key = this.key;
    if (this.isOptional) key += '?';
    return `${key}: ${this.type}`;
  }

  get searchParamKey(): string {
    return removeQuotesAndQuestionMark(this.originalKey);
  }

  get searchParamValue(): string {
    if (this.type === 'boolean' || this.type === 'number') return `String(${this.key})`;
    if (this.type.endsWith('[]')) return `${this.key}.join(',')`;
    return this.key;
  }

  get searchParamConditional(): string {
    return `if (${this.key}) url.searchParams.append('${this.searchParamKey}', ${this.searchParamValue});`;
  }

  get key() {
    if (this.isQuery) {
      return camelCase(this.searchParamKey);
    }

    return formatPropertyName(this.originalKey);
  }
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('Parameter', () => {
    it('creates a query parameter', () => {
      const parameter = new Parameter('query', 'name', 'string');

      expect(parameter.isQuery).toBe(true);
      expect(parameter.isPath).toBe(false);
      expect(parameter.isMethod).toBe(false);
    });

    it('creates a path parameter', () => {
      const parameter = new Parameter('path', 'name', 'string');

      expect(parameter.isQuery).toBe(false);
      expect(parameter.isPath).toBe(true);
      expect(parameter.isMethod).toBe(false);
    });

    describe('#typeSignature', () => {
      it('returns the type signature', () => {
        const parameter = new Parameter('query', 'name', 'string');
        expect(parameter.typeSignature).toBe('name: string');
      });

      it('returns the optional type signature', () => {
        const parameter = new Parameter('query', 'name?', 'string');
        expect(parameter.typeSignature).toBe('name?: string');
      });

      it('returns the type signature for path', () => {
        const parameter = new Parameter('path', 'name', 'string');
        expect(parameter.typeSignature).toBe('name: string');
      });
    });

    describe('#searchParamKey', () => {
      it('returns the search param key', () => {
        const parameter = new Parameter('query', 'name', 'string');
        expect(parameter.searchParamKey).toBe('name');
      });

      it('returns the search param key for optional', () => {
        const parameter = new Parameter('query', 'name?', 'string');
        expect(parameter.searchParamKey).toBe('name');
      });
    });

    describe('#searchParamValue', () => {
      it('returns the search param value', () => {
        const parameter = new Parameter('query', 'name', 'string');
        expect(parameter.searchParamValue).toBe('name');
      });

      it('returns the search param value for boolean', () => {
        const parameter = new Parameter('query', 'name', 'boolean');
        expect(parameter.searchParamValue).toBe('String(name)');
      });

      it('returns the search param value for number', () => {
        const parameter = new Parameter('query', 'name', 'number');
        expect(parameter.searchParamValue).toBe('String(name)');
      });

      it('returns the search param value for array', () => {
        const parameter = new Parameter('query', 'name', 'string[]');
        expect(parameter.searchParamValue).toBe("name.join(',')");
      });
    });

    describe('#searchParamConditional', () => {
      it('returns the search param conditional', () => {
        const parameter = new Parameter('query', 'name', 'string');
        expect(parameter.searchParamConditional).toBe(
          "if (name) url.searchParams.append('name', name);",
        );
      });

      it('returns the search param conditional for boolean', () => {
        const parameter = new Parameter('query', 'name', 'boolean');
        expect(parameter.searchParamConditional).toBe(
          "if (name) url.searchParams.append('name', String(name));",
        );
      });

      it('returns the search param conditional for number', () => {
        const parameter = new Parameter('query', 'name', 'number');
        expect(parameter.searchParamConditional).toBe(
          "if (name) url.searchParams.append('name', String(name));",
        );
      });

      it('returns the search param conditional for array', () => {
        const parameter = new Parameter('query', 'name', 'string[]');
        expect(parameter.searchParamConditional).toBe(
          "if (name) url.searchParams.append('name', name.join(','));",
        );
      });
    });

    describe('#key', () => {
      it('returns the key name', () => {
        const parameter = new Parameter('query', 'name', 'string');
        expect(parameter.key).toBe('name');
      });

      it('returns the key name for path', () => {
        const parameter = new Parameter('path', 'name', 'string');
        expect(parameter.key).toBe('name');
      });
    });

    describe('#isOptional', () => {
      it('checks if it is optional', () => {
        const parameter = new Parameter('query', 'name?', 'string');
        expect(parameter.isOptional).toBe(true);
      });

      it('checks if it is not optional', () => {
        const parameter = new Parameter('query', 'name', 'string');
        expect(parameter.isOptional).toBe(false);
      });
    });
  });
}
