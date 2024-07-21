import { Err } from './Err';
import { Ok } from './Ok';
import { ErrorType } from './Result';

function _isOk(v: unknown): v is Exclude<typeof v, ErrorType> {
  // 判断传入的值是否为undefined 或 null
  if (v === undefined || v === null || v instanceof Error) {
    return false;
  }
  return true;
}

export function result<T>(v: T, compare: (v: T) => boolean = _isOk) {
  if (compare(v)) {
    return new Ok(v);
  }
  return new Err(v);
}

export function ok<T>(v: T) {
  return new Ok<T>(v);
}

export function err<E>(v: E) {
  return new Err<E>(v);
}

export type { Result } from './Result';
