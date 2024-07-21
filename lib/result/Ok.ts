import { ErrorType, Result } from './Result';

export class Ok<V, E = ErrorType> extends Result<V, E> {
  constructor(readonly _v: V) {
    super(_v);
  }

  readonly is_ok = true;
  readonly is_err = false;
}
