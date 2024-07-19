import { Result } from './Result';

export class Ok<V, Err> extends Result<V, Err> {
  constructor(readonly _v: V | Err) {
    super(_v);
  }

  is_ok(): boolean {
    return true;
  }
  is_err(): boolean {
    return false;
  }
}
