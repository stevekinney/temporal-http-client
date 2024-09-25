import ts from 'typescript';

type NodeTypeValidator = (node: ts.Node) => node is ts.Node;

function isSyntaxKind<T extends NodeTypeValidator>(
  node: ts.Node,
  validator: T,
): node is ExtractPredicateType<T> {
  return validator(node);
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

  getText(node: ts.Node) {
    return node.getText(this.sourceFile);
  }

  getNodeName(node: ts.Node): string {
    let name = '';

    if ('name' in node) {
      name = (node.name as ts.Node).getText(this.sourceFile);
    }

    if ('questionToken' in node && node.questionToken) {
      name += '?';
    }

    return name;
  }

  get exportedInterfaces() {
    const exportedInterfaces: Record<string, ts.InterfaceDeclaration> = {};

    ts.forEachChild(this.sourceFile, (node) => {
      if (
        ts.isInterfaceDeclaration(node) &&
        node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
      ) {
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
