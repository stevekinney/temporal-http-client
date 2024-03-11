import createClient, { type ClientOptions } from 'openapi-fetch';
import type { paths } from './schema.js';

const createTemporalClient = (options: ClientOptions) => {
	return createClient<paths>(options);
};

export { createTemporalClient as createClient };
