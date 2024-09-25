type HTTPMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

type Properties<T extends string | object = object> = {
  [key: string]: string | T;
};

type APIRequestResponseBody = {
  content: {
    "'application/json'": string;
  };
};

type APIResponse = {
  '200': APIRequestResponseBody;
};

type ParameterKind = 'path' | 'query' | 'method';

// Utility type to extract the type predicate from a NodeTypeValidator
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtractPredicateType<T extends NodeTypeValidator> = T extends (node: any) => node is infer U
  ? U
  : never;
