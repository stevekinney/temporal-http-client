import type { Operation } from './operation';
import { Operations } from './operations';

export function renderOperation(operation: Operations): string;
export function renderOperation(operation: Operation): string;
export function renderOperation(operation: Operation | Operations): string {
  if (operation instanceof Operations) {
    return operation.all.map(renderOperation).join('\n\n');
  }

  return `
  ${operation.documentation}
    async ${operation.name}(${operation.methodSignature}): Promise<${operation.response}> {
      const url = new URL(\`${operation.route}\`, this.baseURL);

      ${operation.searchParams}

      const request = new Request(url, { ${operation.requestOptions} });

      const response = await fetch(request);

      if (!response.ok) {
        throw new TemporalError('', { request, response, operation: '${operation.name}' });
      };

      return response.json();
  }
  `;
}
