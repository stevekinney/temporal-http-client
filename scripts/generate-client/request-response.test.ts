import { describe, expect, it } from 'bun:test';
import { isHTTPMethod, isRequestBody, isResponse } from './request-response';

describe('isHTTPMethod', () => {
  it('checks if it is an HTTP method', () => {
    expect(isHTTPMethod('get')).toBe(true);
    expect(isHTTPMethod('post')).toBe(true);
    expect(isHTTPMethod('put')).toBe(true);
    expect(isHTTPMethod('delete')).toBe(true);
    expect(isHTTPMethod('patch')).toBe(true);
    expect(isHTTPMethod('head')).toBe(false);
  });

  it('checks if it not is an HTTP method', () => {
    expect(isHTTPMethod('head')).toBe(false);
  });
});

describe('isResponse', () => {
  it('checks if it is a response', () => {
    expect(isResponse({ '200': { content: { "'application/json'": {} } } })).toBe(true);
  });

  it('checks if it is not a response', () => {
    expect(isResponse({})).toBe(false);
  });

  it('checks if it is not a response without content', () => {
    expect(isResponse({ '200': {} })).toBe(false);
  });
});

describe('isRequestBody', () => {
  it('checks if it is a request body', () => {
    expect(isRequestBody({ content: { "'application/json'": {} } })).toBe(true);
  });

  it('checks if it is not a request body', () => {
    expect(isRequestBody({})).toBe(false);
  });

  it('checks if it is not a request body without content', () => {
    expect(isRequestBody({})).toBe(false);
  });
});
