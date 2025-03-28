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
