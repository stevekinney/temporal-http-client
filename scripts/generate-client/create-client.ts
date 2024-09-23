import { Operations } from './operations-metadata';

export function createClient(operations: Operations) {
  return `
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

      ${operations}

    }
  `;
}
