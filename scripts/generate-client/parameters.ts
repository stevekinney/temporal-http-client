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
        return parameter.originalKey === key && parameter.kind === kind;
      } else {
        return parameter.originalKey === key;
      }
    });
  }
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  type Operations = import('./operations').Operations;

  describe('Parameters', () => {
    it('adds a parameter', () => {
      const operation = new Operation('getUsers', {} as Operations);
      const parameters = new Parameters(operation);

      parameters.add('query', 'name', 'string');

      expect(parameters.all.length).toBe(1);
      expect(parameters.queries.length).toBe(1);
      expect(parameters.pathParameters.length).toBe(0);
    });

    it('finds a parameter', () => {
      const operation = new Operation('getUsers', {} as Operations);
      const parameters = new Parameters(operation);

      parameters.add('query', 'name', 'string');

      expect(parameters.find('name')).toBeDefined();
    });

    it('finds a parameter by kind', () => {
      const operation = new Operation('getUsers', {} as Operations);
      const parameters = new Parameters(operation);

      parameters.add('query', 'name', 'string');

      expect(parameters.find('name', 'query')).toBeDefined();
    });

    it('throws an error for an invalid parameter kind', () => {
      const operation = new Operation('getUsers', {} as Operations);
      const parameters = new Parameters(operation);

      expect(() => {
        parameters.add('invalid', 'name', 'string');
      }).toThrowError('Invalid parameter kind: invalid');
    });
  });
}
