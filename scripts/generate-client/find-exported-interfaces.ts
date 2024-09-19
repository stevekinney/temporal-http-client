import ts from 'typescript';

export function findExportedInterfaces(
  sourceFile: ts.SourceFile,
): Record<string, ts.InterfaceDeclaration> {
  const exportedInterfaces: Record<string, ts.InterfaceDeclaration> = {};

  ts.forEachChild(sourceFile, (node) => {
    if (
      ts.isInterfaceDeclaration(node) &&
      node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      const name = node.name.text;
      exportedInterfaces[name] = node;
    }
  });

  return exportedInterfaces;
}
