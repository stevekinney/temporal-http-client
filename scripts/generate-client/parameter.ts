import { camelCase } from 'change-case';
import { formatPropertyName, removeQuotesAndQuestionMark } from './format';

export class Parameter {
  constructor(
    public readonly kind: ParameterKind,
    public readonly key: string,
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
    return this.key.endsWith('?');
  }

  get typeSignature() {
    let key = this.keyName;
    if (this.isOptional) key += '?';
    return `${key}: ${this.type}`;
  }

  get searchParamKey(): string {
    return removeQuotesAndQuestionMark(this.key);
  }

  get searchParamValue(): string {
    if (this.type === 'boolean' || this.type === 'number') return `String(${this.keyName})`;
    if (this.type.endsWith('[]')) return `${this.keyName}.join(',')`;
    return this.keyName;
  }

  get searchParamConditional(): string {
    return `if (${this.keyName}) url.searchParams.append('${this.searchParamKey}', ${this.searchParamValue});`;
  }

  get keyName() {
    if (this.isQuery) {
      return camelCase(this.searchParamKey);
    }

    return formatPropertyName(this.key);
  }
}
