import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { SourceFile } from './source-file';

const createSourceFile = (code: string) => {
  return ts.createSourceFile('test.ts', code, ts.ScriptTarget.ESNext);
};

describe('SourceFile', () => {
  it('creates a source file and keeps a reference', () => {
    const source = createSourceFile('const x = 1;');
    const sourceFile = new SourceFile(source);
    expect(sourceFile.sourceFile).toBe(source);
  });

  it('finds a node by name', () => {
    const source = createSourceFile('const x = 1;');
    const sourceFile = new SourceFile(source);
    const node = sourceFile.findNodeByName('x');

    if (!node) throw new Error('Node not found');
    if (!ts.isVariableDeclaration(node)) throw new Error('Node is not a variable declaration');

    expect(node.name.getText(source)).toBe('x');
  });

  describe('exportedInterfaces', () => {
    const source = createSourceFile(`
      export interface User {
        name: string;
      }
      interface Admin {
        role: string;
      }
    `);

    it('returns an object with exported interfaces', () => {
      const sourceFile = new SourceFile(source);

      expect(Object.keys(sourceFile.exportedInterfaces)).toEqual(['User']);
    });

    it('does not include non-exported interfaces', () => {
      const sourceFile = new SourceFile(source);
      expect(Object.keys(sourceFile.exportedInterfaces)).not.toContain('Admin');
    });

    it('returns the interface node', () => {
      const sourceFile = new SourceFile(source);
      const user = sourceFile.exportedInterfaces.User;

      if (!user) throw new Error('User interface not found');

      expect(user.name.getText(source)).toBe('User');
      expect(ts.isInterfaceDeclaration(user)).toBe(true);
    });
  });

  describe('hasJSDoc', () => {
    it('returns true if node has JSDoc', () => {
      const source = createSourceFile(`
        type User = {
          /** @type {string} */
          name: string;
        }
      `);
      const sourceFile = new SourceFile(source);
      const node = sourceFile.findNodeByName('name');

      if (!node) throw new Error('Node not found');

      expect(sourceFile.hasJSDoc(node)).toBe(true);
    });

    it('returns false if node does not have JSDoc', () => {
      const source = createSourceFile(`
        const x = 'hello';
      `);
      const sourceFile = new SourceFile(source);
      const node = sourceFile.findNodeByName('x');

      if (!node) throw new Error('Node not found');

      expect(sourceFile.hasJSDoc(node)).toBe(false);
    });
  });

  describe('findNodesBySyntaxKind', () => {
    it('finds a node by syntax kind', () => {
      const source = createSourceFile(`
        const x = 1;
        const y = 'hello';
        console.log('Nope')
      `);
      const sourceFile = new SourceFile(source);
      const nodes = sourceFile.findNodesBySyntaxKind(ts.isVariableStatement);

      expect(nodes).toHaveLength(2);
      for (const node of nodes) {
        expect(node.kind).toBe(ts.SyntaxKind.VariableStatement);
        expect(ts.isVariableStatement(node)).toBe(true);
      }
    });
  });

  describe('findNodeBySyntaxKind', () => {
    it('finds a node by syntax kind', () => {
      const source = createSourceFile(`
        const x = 1;
        const y = 'hello';
        console.log('Nope')
      `);
      const sourceFile = new SourceFile(source);
      const node = sourceFile.findNodeBySyntaxKind(ts.isVariableStatement);

      if (!node) throw new Error('Node not found');

      expect(node.kind).toBe(ts.SyntaxKind.VariableStatement);
      expect(ts.isVariableStatement(node)).toBe(true);
    });
  });
});
