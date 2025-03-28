import ts from 'typescript';
import z from 'zod';

type NodeWithName = ts.Node & { name: ts.Node };

const NodeNameSchema = z.object({
  name: z.object({
    getText: z.function().returns(z.string()),
  }),
});

export function hasNameNode(node: ts.Node): node is NodeWithName {
  return NodeNameSchema.safeParse(node).success;
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
