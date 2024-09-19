import ts from 'typescript';

export function getNodeName(node: ts.Node, sourceFile: ts.SourceFile) {
  let name = '';

  if ('name' in node) {
    name = (node.name as ts.Node).getText(sourceFile);
  }

  if ('questionToken' in node && node.questionToken) {
    name += '?';
  }

  return name;
}
