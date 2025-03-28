import { describe, it, expect } from 'bun:test';

import { Operation } from './operation';
import { Parameters } from './parameters';
import type { Operations } from './operations';

describe('Parameters', () => {
  it('adds a parameter', () => {
    const operation = new Operation('getUsers', {} as Operations);
    const parameters = new Parameters(operation);

    parameters.add('query', 'name', 'string');

    expect(parameters.all.length).toBe(1);
    expect(parameters.queries.length).toBe(1);
    expect(parameters.pathParameters.length).toBe(0);
  });

  it('finds a parameter', () => {
    const operation = new Operation('getUsers', {} as Operations);
    const parameters = new Parameters(operation);

    parameters.add('query', 'name', 'string');

    expect(parameters.find('name')).toBeDefined();
  });

  it('finds a parameter by kind', () => {
    const operation = new Operation('getUsers', {} as Operations);
    const parameters = new Parameters(operation);

    parameters.add('query', 'name', 'string');

    expect(parameters.find('name', 'query')).toBeDefined();
  });

  it('throws an error for an invalid parameter kind', () => {
    const operation = new Operation('getUsers', {} as Operations);
    const parameters = new Parameters(operation);

    expect(() => {
      parameters.add('invalid', 'name', 'string');
    }).toThrowError('Invalid parameter kind: invalid');
  });
});
