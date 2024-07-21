import { createHttpClient } from './core';

/**
 * 创建http客户端
 */
export function create() {
  return createHttpClient();
}

/**
 * 供第三方拓展http功能(暂不开放)
 * 
 * 包括但不限于
 * - format and validate response
 * - format and validate request
 * - 拓展请求类型
 **/
// export function _extend(plugin: IPlugin | () => IPlugin) {
//   return create();
// }
