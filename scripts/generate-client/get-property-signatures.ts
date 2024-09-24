import ts from 'typescript';
import { SourceFile } from './source-file';

export function getPropertySignatures(
  node: ts.Node | undefined,
  sourceFile: SourceFile,
): string | Properties {
  if (!node) throw new Error('Node is undefined');

  if (ts.isIndexedAccessTypeNode(node)) {
    const name = sourceFile.getText(node);
    return name;
  }

  if (!('members' in node)) return sourceFile.getText(node);
  if (!Array.isArray(node.members)) throw new Error('Node members is not an array');

  const properties: Properties = {};

  for (const member of node.members) {
    if (ts.isPropertySignature(member)) {
      const name = sourceFile.getNodeName(member);
      if (name) properties[name] = getPropertySignatures(member.type, sourceFile);
    }

    if (ts.isTypeLiteralNode(member)) {
      const nestedProperties = getPropertySignatures(member, sourceFile);
      Object.assign(properties, nestedProperties);
    }

    if (ts.isIndexSignatureDeclaration(member)) {
      member.parameters.forEach((parameter) => {
        if (parameter.type && ts.isTemplateLiteralTypeNode(parameter.type)) {
          const name = sourceFile.getText(parameter.type);
          if (name) properties[name] = getPropertySignatures(member.type, sourceFile);
        }
      });
    }

    if (ts.isInterfaceDeclaration(member)) {
      const nestedProperties = getPropertySignatures(member, sourceFile);
      Object.assign(properties, nestedProperties);
    }
  }

  return properties as Properties;
}
