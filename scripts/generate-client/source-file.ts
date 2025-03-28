import ts from 'typescript';

type NodeTypeValidator = (node: ts.Node) => node is ts.Node;

function isSyntaxKind<T extends NodeTypeValidator>(
  node: ts.Node,
  validator: T,
): node is ExtractPredicateType<T> {
  return validator(node);
}

function isNodeExported(node: ts.Node): boolean {
  return (
    (ts.getCombinedModifierFlags(node as ts.Declaration) & ts.ModifierFlags.Export) !== 0 ||
    (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
  );
}

export class SourceFile {
  constructor(public readonly sourceFile: ts.SourceFile) {}

  /**
   * Visit each node in the AST
   * @param node A TypeScript AST node
   * @param callback A callback function to run on each node
   */
  visit(callback: (node: ts.Node) => void, startingNode: ts.Node = this.sourceFile) {
    function visit(node: ts.Node) {
      callback(node);
      ts.forEachChild(node, visit);
    }

    ts.forEachChild(startingNode, visit);
  }

  findNodesBySyntaxKind<T extends NodeTypeValidator, R = ExtractPredicateType<T>>(
    validator: T,
  ): R[] {
    const nodes: R[] = [];

    this.visit((node) => {
      if (isSyntaxKind(node, validator)) {
        nodes.push(node as R);
      }
    });

    return nodes;
  }

  findNodeBySyntaxKind<T extends NodeTypeValidator, R = ExtractPredicateType<T>>(
    validator: T,
  ): R | undefined {
    let result: R | undefined;

    this.visit((node) => {
      if (isSyntaxKind(node, validator)) {
        result = node as R;
      }
    });

    return result;
  }

  findNodeByName(
    name: string | string[],
    startingNode: ts.Node = this.sourceFile,
  ): ts.Node | undefined {
    let result: ts.Node | undefined;

    if (Array.isArray(name)) {
      for (const n of name) {
        const nextNode = this.findNodeByName(n, startingNode);
        if (!nextNode) return;
        startingNode = nextNode;
      }
      return startingNode;
    }

    this.visit((node) => {
      const nodeName = this.getNodeName(node);
      if (nodeName === name) {
        result = node;
      }
    });

    return result;
  }

  getNodeName(node: ts.Node): string {
    const isOptional = 'questionToken' in node && node.questionToken;

    let name = '';

    if ('name' in node) {
      name = (node.name as ts.Node).getText(this.sourceFile);
    }

    if (isOptional) {
      name += '?';
    }

    return name;
  }

  getText(node: ts.Node) {
    return node.getText(this.sourceFile);
  }

  get exportedInterfaces() {
    const exportedInterfaces: Record<string, ts.InterfaceDeclaration> = {};

    this.visit((node) => {
      if (ts.isInterfaceDeclaration(node) && isNodeExported(node)) {
        const name = this.getNodeName(node);
        exportedInterfaces[name] = node;
      }
    });

    return exportedInterfaces;
  }

  hasJSDoc<T extends ts.Node>(node: T): node is T & { jsDoc: ts.JSDoc[] } {
    if ('jsDoc' in node) {
      return Boolean(node.jsDoc);
    }
    return false;
  }

  getJSDoc(node: ts.Node) {
    if (!this.hasJSDoc(node)) return '';
    return node.jsDoc.map((doc) => doc.getText(this.sourceFile)).join('\n');
  }
}
