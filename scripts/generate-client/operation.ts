import ts from 'typescript';

import { formatOperationName, formatRoute } from './format';
import { Operations } from './operations';
import { Parameters } from './parameters';

export class Operation {
  private httpMethod: Uppercase<HTTPMethod> | undefined;
  public apiRoute: string | undefined;
  public response: string | undefined;
  private parameters: Parameters = new Parameters(this);
  public requestBody: string | undefined;

  constructor(
    public readonly operationName: string,
    private operations: Operations,
  ) {}

  addParameter(kind: string, key: string, type: string): void {
    this.parameters.add(kind, key, type);
  }

  addParameters(kind: string, values: Record<string, string>): void {
    for (const [key, value] of Object.entries(values)) {
      this.addParameter(kind, key, value);
    }
  }

  addResponse(property: APIResponse): void {
    const response = property['200']['content']["'application/json'"];
    this.response = response;
  }

  addRequestBody(property: APIRequestResponseBody): void {
    const body = property.content["'application/json'"];
    this.requestBody = body;
  }

  addRoute(method: HTTPMethod, route: string): void {
    this.apiRoute = formatRoute(route);
    this.httpMethod = method.toUpperCase() as Uppercase<HTTPMethod>;
  }

  get name() {
    return formatOperationName(this.operationName);
  }

  get sourceFile() {
    return this.operations.sourceFile;
  }

  get node(): ts.Node {
    const node = this.sourceFile.findNodeByName(this.operationName);
    if (!node) throw new Error(`Node not found: ${this.operationName}`);
    return node;
  }

  get method() {
    return this.httpMethod || 'GET';
  }

  get keys() {
    return this.parameters.all.map((parameter) => parameter.keyName);
  }

  get types(): string[] {
    return this.parameters.all.map((parameter) => parameter.typeSignature);
  }

  get methodSignature() {
    const params: string[] = [];

    if (this.keys.length) {
      params.push(`{ ${this.keys.join(', ')} }: { ${this.types.join(', ')} }`);
    }

    if (this.requestBody) {
      params.push(`body: ${this.requestBody}`);
    }

    return params.join(', ');
  }

  get requestOptions() {
    const options = [`method: '${this.method}'`, `headers: { 'Content-Type': 'application/json' }`];
    if (this.requestBody) options.push(`body: JSON.stringify(body)`);
    return options.join(',\n');
  }

  get searchParams() {
    return this.parameters.queries
      .map((parameter) => parameter.searchParamConditional)
      .join('\n\n');
  }

  get route() {
    if (!this.apiRoute) throw new Error('Route not found');
    return formatRoute(this.apiRoute);
  }

  get documentation() {
    return this.sourceFile.getJSDoc(this.node);
  }
}
