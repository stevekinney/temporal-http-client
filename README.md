# Temporal HTTP Client

**Nota bene**: This is currently experimental.

Provides a typesafe API client for [Temporal](https://temporal.io)'s HTTP API. This is primarily intended for use in [Temporal's UI](https://github.com/temporalio/ui).

## Updating the Schema

- **Using `npm`**: `npm run generate:schema`
- **Using `pnpm`**: `pnpm generate:schema`

This will download [Temporal's API repository](https://github.com/temporalio/api), generate types based on the OpenAPI specification, and write the types to `src/schema.d.ts`.

## Usage

```ts
import { createClient } from 'temporal-http-client';

const client = createClient({ baseUrl: 'http://localhost:8233' });

const namespaces = await client.GET('/api/v1/namespaces');

namespaces.data?.namespaces?.forEach((namespace) => {
  console.log(namespace.namespaceInfo?.name);
}
```
