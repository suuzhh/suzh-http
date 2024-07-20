import { createHttpClient, IHttpClient } from './core';
import { type Result, result, err, ok } from './result';

type Param = Response | (() => Response | Promise<Response>);

/**
 * 构建响应结果
 * @param {Param} param - `Response`对象或Promise包裹`Response`对象的函数
 */
export async function buildResult(param: Param): Promise<Result<Response>> {
  let response: Response;

  if (param instanceof Response) {
    response = param;
  } else {
    const res = await safeCall(param);
    if (res.is_ok()) {
      response = res.unwrap() as Response;
    } else {
      return res;
    }
  }

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

// async function safeRun(
//   fn: Exclude<Param, Response>
// ): Promise<Result<Response>> {
//   try {
//     const r = await fn();
//     return result(r);
//   } catch (err) {
//     // 该错误产生的原因主要为本机网络环境异常或域名错误
//     console.error('[buildResult]', err);
//     return result(new Error('网络请求函数允许失败'));
//   }
// }

async function safeCall<R>(runnable: () => Promise<R> | R): Promise<Result<R>> {
  try {
    const res = await runnable();
    return ok(res);
  } catch (e) {
    console.error('[safeCall]', e);
    return err(e as Error);
  }
}

/**
 * 创建http客户端
 */
export function create() {
  return createHttpClient();
}

/**
 * 供第三方拓展http功能
 * 
 * 包括但不限于
 * - format and validate response
 * - format and validate request
 * - 拓展请求类型
 **/
export function extend(plugin: IPlugin | () => IPlugin) {
  return create();
}
