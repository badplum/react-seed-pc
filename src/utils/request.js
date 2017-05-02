/**
 * @file utils/request
 * @author maoquan(maoquan@htsc.com)
 */

import 'whatwg-fetch';

import config from '../config/request';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json().then(
    (res) => {
      // 神策的响应是succeed: true
      const { code, msg, succeed } = res;
      if (code !== '0' && !succeed) {
        let error;
        if (code === 'MAG0010') {
          // 这里使用code作为message，以便对登录错误做特殊处理
          error = new Error(code);
        } else {
          error = new Error(msg);
        }
        throw error;
      }
      return res;
    },
  );
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  console.log(error);
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return Promise.race([
    fetch(url, { credentials: 'include', ...options })
      .then(checkStatus)
      .then(parseJSON),
    new Promise(
      (rosolve, reject) => {// eslint-disable-line
        setTimeout(
          () => reject('请求超时'),
          config.timeout,
        );
      },
    ),
  ]);
}
