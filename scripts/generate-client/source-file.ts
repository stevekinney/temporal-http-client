import ts from 'typescript';

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

  findNodeByName(name: string | string[], startingNode: ts.Node = this.sourceFile) {
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
    if ('jsDoc' in node && Array.isArray(node.jsDoc)) return true;
    return false;
  }

  getJSDoc(node: ts.Node) {
    if (!this.hasJSDoc(node)) return '';
    return node.jsDoc.map((doc) => doc.getText(this.sourceFile)).join('\n');
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('visits each node', () => {
    const source = ts.createSourceFile('test.ts', 'const x = 1;', ts.ScriptTarget.ESNext);
    const sourceFile = new SourceFile(source);
    let count = 0;

    sourceFile.visit(() => count++);

    expect(count).toBe(6);
  });
}
