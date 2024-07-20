export interface IHttpClient {
  get(): Promise<Response>;
  post(): Promise<Response>;
  put(): Promise<Response>;
  delete(): Promise<Response>;

  // TODO： 所有请求类型的通用实现
  request(): Promise<Response>;
}

export const createHttpClient = (): IHttpClient => {
  // 实现IHttpClient

  return {
    get: () => {},
    post: () => {},
    put: () => {},
    delete: () => {},

    request: () => {},
  };
};
