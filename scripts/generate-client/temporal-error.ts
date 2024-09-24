export type TemporalErrorParameters = {
  request: Request;
  response: Response;
  operation: string;
} & ErrorOptions;

export function isTemporalError(error: unknown): error is TemporalError {
  return error instanceof TemporalError;
}

export class TemporalError extends Error {
  static isTemporalError = isTemporalError;

  constructor(message: string, parameters: TemporalErrorParameters) {
    super(message, parameters);
    this.name = 'TemporalError';
  }
}
