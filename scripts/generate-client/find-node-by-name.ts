import ts from 'typescript';

import { visit } from './visit';
import { getNodeName } from './get-node-name';

export function findNodeByName(name: string, sourceFile: ts.SourceFile) {
  let result: ts.Node | undefined;

  visit(sourceFile, (node) => {
    const nodeName = getNodeName(node, sourceFile);
    if (nodeName === name) result = node;
  });

  return result;
}
