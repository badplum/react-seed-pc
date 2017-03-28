/**
* @file utils/apiCreator
* @author maoquan(maoquan@htsc.com)
*/

import request from './request';

import { queryToString } from './helper';

/**
 * api生成器
 *
 * @param {Object} options api配置
 *
 * @return {Fucntion}
 */
export default function createApi(options = {}) {
  const { prefix = '/mcrm/api/v1' } = options;

  // 如果没有前缀，自动补上
  const padPrefix = (url) => {
    if (url.indexOf(prefix) === -1) {
      return prefix + url;
    }
    return url;
  };

  return {

    /**
     * @param {string} url API url
     * @param {Object} query 请求参数
     *
     * @return {Promise}
     */
    get(url, query) {
      const finalUrl = padPrefix(url);
      const queryString = queryToString(query);
      return request(
        `${finalUrl}?${queryString}`,
        {
          method: 'GET',
        },
      );
    },

    /**
     * @param {string} url API url
     * @param {Object} query 请求参数
     *
     * @return {Promise}
     */
    post(url, query) {
      const finalUrl = padPrefix(url);
      return request(
        finalUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(query),
        },
      );
    },

    /**
     * @param {string} url 神策日志接收服务器url
     * @param {Object} query 日志参数
     *
     * @return {Promise}
     */
    sendLog(url, query) {
      return request(
        url,
        {
          method: 'POST',
          body: JSON.stringify(query),
        },
      );
    },
  };
}
