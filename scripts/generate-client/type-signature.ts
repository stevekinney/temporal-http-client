import ts from 'typescript';

export class TypeSignature {
  static printer = ts.createPrinter();
  static print(node: ts.Node) {
    return TypeSignature.printer.printNode(ts.EmitHint.Unspecified, node, node.getSourceFile());
  }

  public route: string | undefined;

  constructor(
    public readonly name: string,
    public readonly node: ts.Node,
    public readonly type: ts.Type,
    private readonly checker: ts.TypeChecker,
  ) {}

  content(resolveType: boolean = false) {
    const apparentTypeNode = this.checker.typeToTypeNode(
      this.apparentType,
      resolveType ? this.node : undefined,
      ts.NodeBuilderFlags.NoTruncation,
    );

    if (!apparentTypeNode) throw new Error('No apparentTypeNode');

    return TypeSignature.print(apparentTypeNode);
  }

  private get apparentType() {
    return this.checker.getApparentType(this.type);
  }

  serialize() {
    const name = this.name;
    const content = this.content();
    return { name, content };
  }
}
