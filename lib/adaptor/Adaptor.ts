import type { IHttpRequest } from './Request';
import type { IHttpResponse } from './Response';

interface IHttpAdaptor {
  /** 发起请求 */
  request: (request: IHttpRequest) => Promise<IHttpResponse>;

  /** 处理响应 */
  response(): Promise<IHttpResponse>;
}

export class FetchAdaptor implements IHttpAdaptor {
  async request(request: IHttpRequest): Promise<IHttpResponse> {
    const req = new Request(request.url, {
      method: 'GET',
      headers: request.headers,
      body: request.body,
    });

    return fetch(req);
  }

  async response() {}
}
