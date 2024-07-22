import { ErrorType, IResult } from './Result';

export class Err<E = ErrorType, V = never> implements IResult<V, E> {
  readonly is_ok = false;
  readonly is_err = true;

  constructor(private readonly _v: E) {}

  unwrap(): E | V {
    return this._v;
  }
  map_or<DV>(dv: DV, _: (v: V) => DV): DV {
    return dv;
  }
}
