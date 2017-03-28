/**
 * @file utils/sagaEffects.js
 * @author maoquan(maoquan@htsc.com)
 */

export default {};

/**
 * 延迟指定时间后resolve,主要用在yield语句中
 *
 * 如：
 *  yield ajax.get('/api/xxx');
 *  yield delay(1000); // 模拟网络延迟
 */
export const delay = ms => new Promise(resolve => setTimeout(() => resolve(true), ms));
