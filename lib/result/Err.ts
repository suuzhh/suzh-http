import { Result } from './Result';

export class Err<V, E> extends Result<V, E> {
  constructor(readonly _v: V | E) {
    super(_v);
  }

  is_ok(): boolean {
    return false;
  }
  is_err(): boolean {
    return true;
  }
}
