import { FetchAdaptor } from '@lib/adaptor';
import { IRequestHandler, IRequestInit } from '@lib/adaptor/Adaptor';

export interface IHttpClient {
  get(url: string | URL, initRequest?: IRequestInit): IRequestHandler;
}

function transformUrl(url: string | URL, query: IRequestInit['query']): string {
  if (!(url instanceof URL)) {
    url = new URL(url);
  }

  if (query) {
    if (query instanceof URLSearchParams) {
      query.forEach((v, k) => url.searchParams.append(k, v));
    } else {
      const search = url.searchParams;
      Object.keys(query).forEach((k) => search.append(k, query[k] + ''));
    }
  }

  return new URL(url).toString();
}

export const createHttpClient = (): IHttpClient => {
  // 实现IHttpClient
  const adaptor = new FetchAdaptor();

  return {
    get: (url: string | URL, initRequest?: IRequestInit) => {
      return adaptor.request(
        transformUrl(url, initRequest?.query),
        initRequest
      );
    },
  };
};
