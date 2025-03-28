import ts from 'typescript';
import { TypeSignature } from './type-signature';
import { schemaInputPath } from './parse-args';
import { findByName } from './find-by-name';

type Validator = (params: {
  node: ts.Node;
  type: ts.Type;
  checker: ts.TypeChecker;
  name: string;
}) => boolean;

export class TypeSignatues {
  private program: ts.Program;
  private checker: ts.TypeChecker;
  private readonly _typeSignatures: TypeSignature[] = [];

  constructor(
    public readonly rootNodeName: string,
    public readonly nodeValidator: Validator,
    public readonly rootNodeValidator: (node: ts.Node) => boolean = ts.isIdentifier,
    private readonly sourceFiles: string[] = [schemaInputPath],
  ) {
    this.program = ts.createProgram(this.sourceFiles, { skipLibCheck: true });
    this.checker = this.program.getTypeChecker();
  }

  get typeSignatures() {
    if (!this._typeSignatures.length) {
      this.generate();
    }

    return this._typeSignatures;
  }

  get(name: string) {
    return this.typeSignatures.find((signature) => signature.name === name);
  }

  generate() {
    const { program, checker, rootNodeName, nodeValidator: validator, rootNodeValidator } = this;

    const result: TypeSignature[] = this._typeSignatures;

    for (const sourceFile of program.getSourceFiles()) {
      if (sourceFile.fileName !== schemaInputPath) continue;
      if (!sourceFile.isDeclarationFile) {
        const targetNode = findByName(sourceFile, rootNodeName, rootNodeValidator);

        if (!targetNode) throw new Error(`${rootNodeName} was found`);

        if (!ts.isInterfaceDeclaration(targetNode)) {
          throw new Error(`${rootNodeName} is not an interface declaration`);
        }

        visit(targetNode);
      }
    }

    function visit(node: ts.Node) {
      const symbol = checker.getSymbolAtLocation(node);

      if (symbol && ts.isIdentifier(node)) {
        const name = symbol.getName();
        const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);

        if (validator({ node, type, checker, name })) {
          const typeSignature = new TypeSignature(name, node, type, checker);
          result.push(typeSignature);
        }
      }

      ts.forEachChild(node, visit);
    }

    return result;
  }
}
