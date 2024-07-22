import { ErrorType, IResult } from './Result';

export class Ok<V = any> implements IResult<V, ErrorType> {
  readonly is_ok = true;
  readonly is_err = false;

  constructor(private readonly _v: V) {}

  unwrap() {
    return this._v;
  }

  map_or<DV>(_: DV, f: (v: V) => DV): DV {
    return f(this._v);
  }
}
