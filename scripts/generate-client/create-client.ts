import { Operations } from './operations';
import { renderOperation } from './render-operation';

// @ts-expect-error - There is no default export, but we're importing it as text.
import TemporalError from './temporal-error.ts' with { type: 'text' };

export function createClient(operations: Operations) {
  return `
    /**
     * This file was automatically generated. Do not modify.
     * Run \`bun run generate:client\` to update this file.
     */

    import type { components } from './schema';

    ${TemporalError}

    export default class TemporalClient {
      /**
       * @param baseURL {string} The base URL of the Temporal API.
       * @example
       * const client = new TemporalClient('https://api.temporal.io');
       */
      constructor(private readonly baseURL: string) {}

      ${renderOperation(operations)}

    }
  `;
}
