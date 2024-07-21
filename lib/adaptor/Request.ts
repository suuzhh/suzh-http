export interface IHttpRequest {
  url: URL;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'; 
  // 请求头暂时与fetch.Headers保持一致
  headers?: HeadersInit;
  // 请求体暂时与fetch.body保持一致
  body?: BodyInit;
}
