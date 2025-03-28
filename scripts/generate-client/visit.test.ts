import { expect, it } from 'bun:test';
import ts from 'typescript';

import { visit } from './visit';

it('visits each node', () => {
  const source = ts.createSourceFile('test.ts', 'const x = 1;', ts.ScriptTarget.ESNext);
  let count = 0;

  visit(source, () => count++);

  expect(count).toBe(7);
});
