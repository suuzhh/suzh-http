export interface IPlugin {
  resolveRequest: (request: Request) => Promise<Request>;
  resolveResponse: (response: Response) => Promise<Response>;
}
