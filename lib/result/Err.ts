import { ErrorType, Result } from './Result';

export class Err<E = ErrorType, V = any> extends Result<V, E> {
  constructor(readonly _v: E) {
    super(_v);
  }

  is_ok(): boolean {
    return false;
  }
  is_err(): boolean {
    return true;
  }
}
