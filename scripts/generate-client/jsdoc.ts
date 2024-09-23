import ts from 'typescript';

export function hasJSDoc(node: ts.Node): node is ts.Node & { jsDoc: ts.JSDoc[] } {
  if ('jsDoc' in node && Array.isArray(node.jsDoc)) return true;
  return false;
}

export function getJSDoc(node: ts.Node | undefined, sourceFile: ts.SourceFile) {
  if (!node) return '';
  if (!hasJSDoc(node)) return '';
  return node.jsDoc.map((doc) => doc.getText(sourceFile)).join('\n');
}
