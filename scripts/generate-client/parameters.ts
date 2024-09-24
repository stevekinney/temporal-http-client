import { removeQuestionMark } from './format';
import { Operation } from './operation';
import { Parameter } from './parameter';

const parameterKinds: ParameterKind[] = ['query', 'path', 'method'] as const;

function isValidParameterType(parameter: string): parameter is ParameterKind {
  return parameterKinds.includes(removeQuestionMark(parameter) as ParameterKind);
}

export class Parameters {
  private parameters: Parameter[] = [];

  constructor(private readonly operation: Operation) {}

  add(kind: string, key: string, type: string) {
    kind = removeQuestionMark(kind);

    if (!isValidParameterType(kind)) {
      throw new Error(`Invalid parameter kind: ${kind}`);
    }

    this.parameters.push(new Parameter(kind, key, type));
  }

  get all(): Parameter[] {
    const parameters = [...this.parameters];
    return parameters;
  }

  get queries() {
    return this.parameters.filter((parameter) => parameter.isQuery);
  }

  get pathParameters() {
    return this.parameters.filter((parameter) => parameter.isPath);
  }

  find(key: string, kind?: ParameterKind): Parameter | undefined {
    return this.parameters.find((parameter) => {
      if (kind) {
        return parameter.key === key && parameter.kind === kind;
      } else {
        return parameter.key === key;
      }
    });
  }
}
