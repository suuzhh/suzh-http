import { err, ok, type IResult } from '@lib/result';

export async function safeCall<R>(
  runnable: () => Promise<R> | R
): Promise<IResult<R>> {
  try {
    const res = await runnable();
    return ok(res);
  } catch (e) {
    console.error('[safeCall]', e);
    return err(e as Error);
  }
}
