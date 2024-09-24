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
