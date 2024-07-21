import { FetchAdaptor } from '@lib/adaptor';
import { IHttpResponse } from '@lib/adaptor/Response';
import { Result } from '@lib/result';
import { safeCall } from '@lib/util';

interface IClientResult<T> {
  data?: T;
  error?: Error;
}

export interface IHttpClient {
  get<T>(): Promise<IClientResult<T>>;
  // post(): Promise<Response>;
  // put(): Promise<Response>;
  // delete(): Promise<Response>;

  // TODO： 所有请求类型的通用实现
  // request(): Promise<Response>;
}

export const createHttpClient = (): IHttpClient => {
  // 实现IHttpClient
  const adaptor = new FetchAdaptor();

  return {
    get: async (url: string, options?: any) => {
      const res = await adaptor.request({
        url: new URL(url),
        method: 'GET',
        headers: options?.headers,
      });

      // TODO: 处理IHttpResponse
      return buildResult(res);
    },
    //   post: () => {},
    //   put: () => {},
    //   delete: () => {},

    //   request: () => {},
  };
};

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
    if (res.is_ok) {
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
