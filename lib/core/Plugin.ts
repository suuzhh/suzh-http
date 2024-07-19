export function install() {

}

interface IPluginLifecycle {
  resolveRequest: (request: Request) => Promise<Request>;
  resolveResponse: (response: Response) => Promise<Response>;
}