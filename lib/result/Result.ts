export type ErrorType = undefined | null | Error;

/**
 * 结果对象
 *
 * @description 实现rust语言的`Result`
 * @link https://rustwiki.org/zh-CN/std/result/enum.Result.html
 */
export interface IResult<V = any, Err = ErrorType> {
  readonly is_ok: boolean;
  readonly is_err: boolean;
  unwrap(): V | Err;
  map_or<DV>(dv: DV, f: (v: Exclude<V, Err>) => DV): DV;
}

export abstract class Result<V, Err = ErrorType> implements IResult<V, Err> {
  constructor(protected readonly _v: V | Err) {}

  abstract readonly is_ok: boolean;

  abstract readonly is_err: boolean;

  unwrap(): V | Err {
    return this._v;
  }

  map_or<DV>(dv: DV, f: (v: Exclude<V, Err>) => DV): DV {
    if (this.is_ok) {
      return f(this._v as Exclude<V, Err>);
    }
    return dv;
  }
}
