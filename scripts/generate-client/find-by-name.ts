import ts from 'typescript';
import z from 'zod';

type NodeWithName = z.infer<typeof NodeNameSchema>;

const NodeNameSchema = z.object({
  kind: z.number(),
  flags: z.number(),
  parent: z.any(),
  name: z.object({
    getText: z.function().returns(z.string()),
  }),
});

export function hasNameNode(node: unknown): node is NodeWithName {
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
