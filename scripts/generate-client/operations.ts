import { Operation } from './operation';
import type { SourceFile } from './source-file';

export class Operations {
  public readonly metadata: Record<string, Operation> = {};

  constructor(public readonly sourceFile: SourceFile) {}

  add(operation: string): Operation {
    const metadata = new Operation(operation, this);
    this.metadata[operation] = metadata;
    return metadata;
  }

  get(operation: string): Operation {
    return this.metadata[operation];
  }

  get all() {
    return Array.from(Object.values(this.metadata));
  }
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

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
}
