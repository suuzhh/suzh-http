import { err, ok, type Result } from '@lib/result';

export async function safeCall<R>(
  runnable: () => Promise<R> | R
): Promise<Result<R>> {
  try {
    const res = await runnable();
    return ok(res);
  } catch (e) {
    console.error('[safeCall]', e);
    return err(e as Error);
  }
}
