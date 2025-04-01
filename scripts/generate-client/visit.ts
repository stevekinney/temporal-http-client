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
