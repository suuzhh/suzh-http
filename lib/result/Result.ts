export type ErrorType = Error;

/**
 * 结果对象
 *
 * @description 实现rust语言的`Result`
 * @link https://rustwiki.org/zh-CN/std/result/enum.Result.html
 */
export interface IResult<V = unknown, Err = ErrorType> {
  readonly is_ok: boolean;
  readonly is_err: boolean;
  unwrap(): Err | V; //V extends Err ? Err : V;
  map_or<DV>(dv: DV, f: (v: V) => DV): DV;
}

// export abstract class Result<V, Err = ErrorType> implements IResult<V, Err> {
//   abstract readonly is_ok: boolean;
//   abstract readonly is_err: boolean;

//   abstract unwrap(): V extends Err ? Err : V;

//   map_or<DV>(dv: DV, f: (v: Exclude<V, Err>) => DV): DV {
//     if (this.is_ok) {
//       return f(this._v as Exclude<V, Err>);
//     }
//     return dv;
//   }
// }
