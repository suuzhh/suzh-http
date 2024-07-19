import { ErrorType, Result } from './Result';

export class Ok<V, E = ErrorType> extends Result<V, E> {
  constructor(readonly _v: V) {
    super(_v);
  }

  is_ok(): boolean {
    return true;
  }
  is_err(): boolean {
    return false;
  }
}
