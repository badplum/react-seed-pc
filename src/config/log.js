/**
 * @file config/log.js
 *  神策数据收集相关配置
 * @author maoquan(maoquan@htsc.com)
 */

const config = {
  url: process.env.NODE_ENV === 'development1'
    ? '/' : 'https://crm.htsc.com.cn:2443/abtest/pass/mc/sensors',
  interval: 2 * 60 * 1000,
  enable: true,
  blacklist: [
    '@@DVA_LOADING/HIDE',
    '@@DVA_LOADING/SHOW',
    '@@HT_LOADING/SHOW_ACTIVITY_INDICATOR',
    '@@HT_LOADING/HIDE_ACTIVITY_INDICATOR',
  ],
  whitelist: [],
  eventPropertyMap: {
    // 获取当前登录用户信息
    'global/getEmpInfoSuccess': {
      values: [
        'empInfo',
      ],
    },
    // 页面pv
    '@@router/LOCATION_CHANGE': {
      values: [
        'pathname',
        'query',
      ],
    },
    // 获取客户详情
    'customer/fetchCustDetailSuccess': {
      values: [
        'custSor',
        'response.resultData.custBaseInfo',
      ],
    },
    // 任务详情
    'mission/reportDetail': {
      values: [
        '*', // *表示payload所有第一层字段
      ],
    },
  },
};

export default config;
