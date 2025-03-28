import { describe, it, expect } from 'bun:test';
import { Operations } from './operations';
import { SourceFile } from './source-file';

describe('Operations', () => {
  it('adds an operation', () => {
    const operations = new Operations({} as SourceFile);
    const operation = operations.add('getUsers');
    expect(operation.operationName).toBe('getUsers');
  });

  it('gets an operation', () => {
    const operations = new Operations({} as SourceFile);
    operations.add('getUsers');
    const operation = operations.get('getUsers');
    expect(operation.operationName).toBe('getUsers');
  });

  it('gets all operations', () => {
    const operations = new Operations({} as SourceFile);

    operations.add('getUsers');
    operations.add('getUser');

    expect(operations.all.length).toBe(2);
    expect(Object.keys(operations.metadata)).toEqual(
      expect.arrayContaining(['getUsers', 'getUser']),
    );
  });
});
