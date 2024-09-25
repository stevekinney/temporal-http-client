import ts from 'typescript';

/**
 * Visit each node in the AST
 * @param node A TypeScript AST node
 * @param callback A callback function to run on each node
 */
export function visit(node: ts.Node, callback: (node: ts.Node) => void) {
  callback(node);
  ts.forEachChild(node, (child) => visit(child, callback));
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('visits each node', () => {
    const source = ts.createSourceFile('test.ts', 'const x = 1;', ts.ScriptTarget.ESNext);
    let count = 0;

    visit(source, () => count++);

    expect(count).toBe(7);
  });
}
