import ts from 'typescript';

/**
 *
 * @param node A TypeScript AST node
 * @param sourceFile The source file of the node
 * @returns The name of the node
 */
export function getNodeName(node: ts.Node, sourceFile: ts.SourceFile): string {
  let name = '';

  if ('name' in node) {
    name = (node.name as ts.Node).getText(sourceFile);
  }

  if ('questionToken' in node && node.questionToken) {
    name += '?';
  }

  return name;
}
