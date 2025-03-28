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
