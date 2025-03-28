import ts from 'typescript';

type NodeWithName = ts.Node & { name: ts.Node };

export function hasNameNode(node: ts.Node): node is NodeWithName {
  if ('name' in node) {
    if (!node.name) return false;
    if (typeof node.name !== 'object') return false;
    if ('getText' in node.name) return true;
  }

  return false;
}

export function findByName(
  node: ts.Node,
  name: string,
  validator: (node: ts.Node) => boolean = () => true,
): NodeWithName | undefined {
  if (validator(node)) {
    if (hasNameNode(node)) {
      if (node.name.getText() === name) return node;
    }
  }

  return ts.forEachChild(node, (child) => findByName(child, name, validator));
}
