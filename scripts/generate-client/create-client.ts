import type { OperationsMetadataWithRoute } from './process';

export function createClient(data: Record<string, OperationsMetadataWithRoute>) {
  let result = `
    import type { components } from './schema';

    type RequestOptions = {
      onError?: (response: Response) => void;
      baseUrl?: string;
    }
  `;

  for (const [name, operation] of Object.entries(data)) {
    result += createOperation(name, operation);
  }

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

  const args: string[] = [];
  const options = `{ onError, baseUrl = window.location.origin  }: RequestOptions = {}`;

  if (parameterKeys.length) {
    args.push(`{ ${parameterKeys.join(', ')} }: { ${parameterTypes.join(', ')} }`);
  }

  args.push(options);

  return `
    export async function ${name}(${args.join(',')}): Promise<${response}> {
      const url = new URL(\`${route}\`, baseUrl);

      ${query.map((key) => `if (${key}) url.searchParams.append('${mappings[key]}', String(${key}));`).join('\n\n')}

      return fetch(url, {
        ${fetchOptions.join(',\n')}
      }).then((response) => {
        if (!response.ok) {
          if (onError) return onError(response);
          throw new Error(\`${name} request failed.\`);
        };
        return response.json();
      });
    }

  `;
}
