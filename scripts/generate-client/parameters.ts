import { camelCase } from 'change-case';
import { formatPropertyName, removeQuestionMark, removeQuotesAndQuestionMark } from './format';
import { OperationMetadata } from './operations-metadata';

const parameterKinds: ParameterKind[] = ['query', 'body', 'path', 'method'] as const;

function isValidParameterType(parameter: string): parameter is ParameterKind {
  return parameterKinds.includes(removeQuestionMark(parameter) as ParameterKind);
}

export class Parameters {
  private parameters: Parameter[] = [];

  constructor(private readonly operation: OperationMetadata) {}

  add(kind: string, key: string, type: string) {
    kind = removeQuestionMark(kind);

    if (!isValidParameterType(kind)) {
      throw new Error(`Invalid parameter kind: ${kind}`);
    }

    this.parameters.push(new Parameter(kind, key, type));
  }

  get all(): Parameter[] {
    const parameters = [...this.parameters, ...this.methods];
    if (this.requestBody) parameters.push(this.requestBody);
    return parameters;
  }

  get queries() {
    return this.parameters.filter((parameter) => parameter.isQuery);
  }

  get pathParameters() {
    return this.parameters.filter((parameter) => parameter.isPath);
  }

  get methods() {
    return [Parameter.onError];
  }

  get requestBody() {
    if (this.operation.requestBody) {
      return new Parameter('body', 'body', this.operation.requestBody);
    }
  }

  find(key: string, kind?: ParameterKind): Parameter | undefined {
    return this.parameters.find((parameter) => {
      if (kind) {
        return parameter.key === key && parameter.kind === kind;
      } else {
        return parameter.key === key;
      }
    });
  }
}

class Parameter {
  static onError = new Parameter(
    'method',
    'onError',
    '({ response, operation }: { response: Response, operation: string }) => void',
  );

  static requestBody(body: string) {
    new Parameter('body', 'body', body);
  }

  constructor(
    public readonly kind: ParameterKind,
    public readonly key: string,
    public readonly type: string,
  ) {}

  get isQuery() {
    return this.kind === 'query';
  }

  get isRequestBody() {
    return this.kind === 'body';
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
    return `if (${this.keyName}) { url.searchParams.append('${this.searchParamKey}', ${this.searchParamValue}); }`;
  }

  get keyName() {
    if (this.isQuery) {
      return camelCase(this.searchParamKey);
    }

    return formatPropertyName(this.key);
  }
}
