import ts from 'typescript';
import { getNodeName } from './get-node-name';

export function getPropertySignatures<T extends Properties | string = Properties>(
  node:
    | ts.InterfaceDeclaration
    | ts.TypeLiteralNode
    | ts.TypeNode
    | ts.IndexSignatureDeclaration
    | undefined,
  sourceFile: ts.SourceFile,
): T {
  if (!node) throw new Error('Node is undefined');

  if (ts.isIndexedAccessTypeNode(node)) {
    return node.getText(sourceFile) as T;
  }

  if (!('members' in node)) return node.getText(sourceFile) as T;

  const properties: Properties = {};

  for (const member of node.members) {
    if (ts.isPropertySignature(member)) {
      const name = getNodeName(member, sourceFile);
      if (name) properties[name] = getPropertySignatures(member.type, sourceFile);
    }

    if (ts.isTypeLiteralNode(member)) {
      const nestedProperties = getPropertySignatures(member, sourceFile);
      Object.assign(properties, nestedProperties);
    }

    if (ts.isIndexSignatureDeclaration(member)) {
      member.parameters.forEach((parameter) => {
        if (parameter.type && ts.isTemplateLiteralTypeNode(parameter.type)) {
          const name = parameter.type.getText(sourceFile);
          if (name) properties[name] = getPropertySignatures(member.type, sourceFile);
        }
      });
    }
  }

  return properties as T;
}
