import type { Operation } from './operation';
import { Operations } from './operations';

export function renderOperations(operation: Operations): string;
export function renderOperations(operation: Operation): string;
export function renderOperations(operation: Operation | Operations): string {
  if (operation instanceof Operations) {
    return operation.all.map(renderOperations).join('\n\n');
  }

  return `
  ${operation.documentation}
    async ${operation.name}(${operation.methodSignature}): Promise<import('${operation.schemaFilePath}').${operation.response}> {
      const url = new URL(\`${operation.route}\`, this.baseURL);

      ${operation.searchParams}

      const request = new Request(url, { ${operation.requestOptions} });

      const response = await fetch(request);

      if (!response.ok) {
        throw new TemporalError(\`\${response.status}: ${operation.name} request failed.\`, { request, response, operation: '${operation.name}' });
      };

      try {
        const json = await response.json();
        const { ${operation.response} } = await import('${operation.schemaFilePath}');
        return ${operation.response}.parse(json);
      } catch (error) {
        throw new TemporalError(\`Failed to parse response from ${operation.name}.\`, { request, response, operation: '${operation.name}' });
      }
  }
  `;
}
