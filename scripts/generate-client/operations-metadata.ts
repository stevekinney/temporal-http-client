import ts from 'typescript';
import { formatOperationName, formatRoute } from './format';
import { findNodeByName } from './find-node-by-name';
import { getJSDoc } from './jsdoc';
import { Parameters } from './parameters';

export class Operations {
  public readonly metadata: Record<string, OperationMetadata> = {};

  constructor(public readonly sourceFile: ts.SourceFile) {}

  add(operation: string): OperationMetadata {
    const metadata = new OperationMetadata(operation, this);
    this.metadata[operation] = metadata;
    return metadata;
  }

  get(operation: string): OperationMetadata {
    return this.metadata[operation];
  }

  toString() {
    return Object.values(this.metadata)
      .map((metadata) => metadata.toString())
      .join('\n\n');
  }
}

export class OperationMetadata {
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
    this.response = property['200']['content']["'application/json'"];
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
    const node = findNodeByName(this.operationName, this.sourceFile);
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
    return `{ ${this.keys.join(', ')} }: { ${this.types.join(', ')} }`;
  }

  get fetchOptions() {
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
    return getJSDoc(this.node, this.sourceFile);
  }

  toString() {
    return `
    ${this.documentation}
    async ${this.name}(${this.methodSignature}): Promise<${this.response}> {
      const url = new URL(\`${this.route}\`, this.baseURL);

      ${this.searchParams}

      const response = await fetch(url, {
        ${this.fetchOptions}
      })

      if (!response.ok) {
        if (onError) {
          onError({response, operation: '${this.operationName}'});
        } else {
          throw new Error(\`\${response.status}: ${this.operationName} request failed. \${response.statusText}\`.trim());
        }
      };

      return response.json();
    }
  `;
  }
}
