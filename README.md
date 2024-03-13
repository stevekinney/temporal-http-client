# Temporal HTTP Client

**Nota bene**: This is currently experimental.

Provides a typesafe API client for [Temporal](https://temporal.io)'s HTTP API. This is primarily intended for use in [Temporal's UI](https://github.com/temporalio/ui).

## Updating the Schema

- **Using `npm`**: `npm run generate`
- **Using `pnpm`**: `pnpm generate`

This will download [Temporal's API repository](https://github.com/temporalio/api), generate types based on the OpenAPI specification, and write the types to `src/schema.d.ts`.

It will also create a client class in `src/client.ts`.

## Usage

```ts
import { Client } from 'temporal-http-client';

const client = new Client({ baseUrl: 'http://localhost:8233' });

const response = await client.listNamespaces();

response.data?.namespaces?.forEach((namespace) => {
  console.log(namespace);
});

if (response.error) {
  console.error(response.error.code, response.error.message);
}
```
