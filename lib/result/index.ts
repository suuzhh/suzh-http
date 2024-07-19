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

export function result<T>(v: T) {
  if (_isOk(v)) {
    return new Ok(v);
  }
  return new Err(v);
}

export type { Result } from './Result';
