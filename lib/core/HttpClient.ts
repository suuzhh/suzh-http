import { FetchAdaptor } from '@lib/adaptor';
import { IRequestHandler, IRequestInit } from '@lib/adaptor/Adaptor';

export interface IHttpClient {
  get(url: string | URL, initRequest?: IRequestInit): IRequestHandler;
  post(url: string | URL, body: any, initRequest?: IRequestInit): IRequestHandler;
}

function transformUrl(url: string | URL, query: IRequestInit['query']): string {
  if (!(url instanceof URL)) {
    // https://github.com/axios/axios/blob/v1.x/lib/core/buildFullPath.js
    try {
      url = new URL(url);
    } catch {
      // 在node环境下，不支持location
      url = new URL(url, location?.toString?.());
    }
  }

  if (query) {
    if (query instanceof URLSearchParams) {
      query.forEach((v, k) => url.searchParams.append(k, v));
    } else {
      const search = url.searchParams;
      Object.keys(query).forEach((k) => search.append(k, query[k] + ''));
    }
  }

  return url.toString();
}

export const createHttpClient = (): IHttpClient => {
  // 实现IHttpClient
  const adaptor = new FetchAdaptor();

  return {
    get: (url: string | URL, initRequest?: IRequestInit) => {
      return adaptor.request(transformUrl(url, initRequest?.query), {
        ...initRequest,
        method: 'GET',
      });
    },

    post: (url: string | URL, body: any, initRequest?: IRequestInit) => {
      return adaptor.request(transformUrl(url, initRequest?.query), {
        ...initRequest,
        method: 'POST',
      });
    },
  };
};
