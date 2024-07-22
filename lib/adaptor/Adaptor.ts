export interface ISendResult {
  response?: Response;
  error?: Error;
}

export interface IRequestInit {
  headers?: HeadersInit;
  /** 超时时间 默认60s */
  timeout?: number;
  /** 查询参数，最终会转换为url的一部分 */
  query?: Record<string, string | number> | URLSearchParams;
}
export interface IHttpAdaptor {
  /** 创建请求 */
  request: (url: string, request: IRequestInit) => IRequestHandler;

  /** 处理响应 */
  response<R>(response: Response): Promise<ISendResult>;
}

export interface IRequestHandler {
  send: () => Promise<ISendResult>;
  abort: () => void;


}
