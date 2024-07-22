import { safeCall } from '@lib/util';
import type { ISendResult, IHttpAdaptor, IRequestInit } from './Adaptor';
import { IResult } from '@lib/result';

/**
 * 构建响应结果
 * @param {Response} response - `Response`对象或Promise包裹`Response`对象的函数
 */
async function buildResult(response: Response): Promise<IResult<Response>> {
  if (response.ok) {
    return ok(response);
    try {
      // const data: DataType = await response.json();
      // if (data.errCode) {
      //   return { error: new Error(data.errMsg), data: null };
      // }
      // try {
      //   const result = validateInput(data.data);
      //   return {
      //     error: null,
      //     data: result,
      //   };
      // } catch (err) {
      //   if (err instanceof Error) {
      //     return { error: err, data: null };
      //   }
      //   return { error: new Error('数据验证失败'), data: null };
      // }
    } catch (error) {
      console.error(error);
      return result(new Error('数据解析失败'));
    }
  } else {
    return err(
      new Error(
        `获取数据失败${response.status ? `, 状态码${response.status}` : ''}`
      )
    );
  }
}

function timeoutCall(milliseconds: number, promise: Promise<Response>) {
  return new Promise<Response>(function (resolve, reject) {
    const timer = setTimeout(() => {
      reject(new Error('request timeout'));
    }, milliseconds);

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((reason) => {
        clearTimeout(timer);
        reject(reason);
      });
  });
}

/**
 * 浏览器环境下的http请求适配器
 */
export class FetchAdaptor implements IHttpAdaptor {
  request(url: string, req?: IRequestInit) {
    let ab: AbortController;

    const { timeout = 60 * 1000 } = req ?? {};

    return {
      send: async () => {
        ab = new AbortController();
        const r = new Request(url, { ...req, signal: ab.signal });
        const result = await safeCall(() => timeoutCall(timeout, fetch(r)));

        return result.map_or<ISendResult>(
          { error: result.unwrap() as Error },
          (response) => ({
            response,
          })
        );
      },
      abort: () => {
        if (ab) {
          ab.abort();
          // 使用新的AbortController
          ab = new AbortController();
        }
      },
    };
  }

  response<R>(response: Response): Promise<ISendResult> {
    throw new Error('Method not implemented.');
  }
}
