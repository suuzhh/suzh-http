export class HttpClient {
  // 使用插件
  // 通过插件的形式对本体进行扩展
  use() {
    throw new Error('未实现');
  }

  // TODO: 四个基础请求类型的实现
  get() {}

  post() {}

  put() {}

  delete() {}

  // TODO： 所有请求类型的通用实现
  request() {}
}
