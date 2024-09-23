import type { OperationsMetadataWithRoute } from './process';

export function createClient(data: Record<string, OperationsMetadataWithRoute>) {
  let result = `
    /**
     * This file was automatically generated. Do not modify.
     */

    import type { components } from './schema';

    export default class TemporalClient {
      /**
       * @param The base URL of the Temporal API.
       * @example
       * const client = new TemporalClient('https://api.temporal.io');
       */
      constructor(private readonly baseURL: string) {}
  `;

  for (const [name, operation] of Object.entries(data)) {
    result += createOperation(name, operation);
  }

  result += `}`;

  return result;
}

function createOperation(name: string, operation: OperationsMetadataWithRoute) {
  const {
    route,
    response,
    body,
    mappings,
    parameters,
    query,
    queryTypes,
    parametersTypes,
    method,
    documentation,
  } = operation;

  const fetchOptions = [
    `method: '${method.toUpperCase()}'`,
    `headers: { 'Content-Type': 'application/json' }`,
  ];

  const parameterKeys: string[] = [...query, ...parameters];
  const parameterTypes: string[] = [];

  for (const [parameterName, parameterType] of [
    Object.entries(parametersTypes),
    Object.entries(queryTypes),
  ].flat()) {
    parameterTypes.push(`${parameterName}: ${parameterType}`);
  }

  if (body) {
    parameterKeys.push('body');
    parameterTypes.push(`body: ${body}`);
    fetchOptions.push(`body: JSON.stringify(body)`);
  }

  parameterKeys.push('onError');
  parameterTypes.push('onError: (response: Response) => void');

  const methodParameters: string = `{ ${parameterKeys.join(', ')} }: { ${parameterTypes.join(', ')} }`;

  return `
    ${documentation}
    async ${name}(${methodParameters}): Promise<${response}> {
      const url = new URL(\`${route}\`, this.baseURL);

      ${query.map((key) => `if (${key}) url.searchParams.append('${mappings[key]}', String(${key}));`).join('\n\n')}

      const response = await fetch(url, {
        ${fetchOptions.join(',\n')}
      })

      if (!response.ok) {
        if (onError) {
          onError(response);
        } else {
          throw new Error(\`${name} request failed.\`);
        }
      };

      return response.json();
    }

  `;
}
