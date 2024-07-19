export type ErrorType = undefined | null | Error;

export enum ResultType {
  Ok,
  Err,
}

/**
 * 结果对象
 *
 * @description 实现rust语言的`Result`
 * @link https://rustwiki.org/zh-CN/std/result/enum.Result.html
 */
export interface IResult<V = any, Err = ErrorType> {
  is_ok(): boolean;
  is_err(): boolean;
  unwrap(): V | Err;
  map_or<DV>(dv: DV, f: (v: Exclude<V, Err>) => DV): DV;
}

export abstract class Result<V, Err = ErrorType> implements IResult<V, Err> {
  constructor(protected readonly _v: V | Err) {}

  abstract is_ok(): boolean;

  abstract is_err(): boolean;

  unwrap(): V | Err {
    return this._v;
  }

  map_or<DV>(dv: DV, f: (v: Exclude<V, Err>) => DV): DV {
    if (this.is_ok()) {
      return f(this._v as Exclude<V, Err>);
    }
    return dv;
  }
}
