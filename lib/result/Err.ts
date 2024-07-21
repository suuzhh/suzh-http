import { ErrorType, Result } from './Result';

export class Err<E = ErrorType, V = any> extends Result<V, E> {
  constructor(readonly _v: E) {
    super(_v);
  }

  readonly is_ok = false;
  readonly is_err = true;
}
