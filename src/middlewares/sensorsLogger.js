/**
 * @file middlewares/sensorsLogger.js
 *  神策数据收集
 * @author maoquan(maoquan@htsc.com)
 */

import _ from 'lodash';

import api from '../api';
import {
  enable as enableLog,
  eventPropertyMap,
  url,
  interval,
  whitelist,
  blacklist,
} from '../config/log';
import helper from '../utils/helper';

const envVars = {};

// 待发送日志队列
let QUEUE = [];

function isPass(action) {
  const { type } = action;
  if (!_.isEmpty(whitelist) && whitelist.indexOf(type) === -1) {
    return false;
  }
  if (blacklist.indexOf(type) !== -1) {
    return false;
  }
  return true;
}

function getEventType(action) {
  const { type } = action;
  const eventType = {
    type: 'track',
    event: type.replace(/\//g, '_').replace(/[^\w$]/g, ''),
  };
  if (/getEmpInfoSuccess$/.test(type)) {
    return { type: 'profile_set' };
  }
  return eventType;
}

function getExtraData(action) {
  const { type, payload } = action;
  const propertyMap = eventPropertyMap[type];
  let data = { ...payload };
  // 表示对这个action有特殊的配置
  if (propertyMap) {
    const { values } = propertyMap;
    if (!_.isEmpty(values)) {
      data = _.reduce(
        values,
        (mergedData, value) => {
          if (value === '*') {
            return { ...mergedData, ...payload };
          }
          const propertyValue = helper.getProperty(payload, value);
          if (_.isObject(propertyValue)) {
            return { ...mergedData, ...propertyValue };
          }
          return { ...mergedData, [value]: propertyValue };
        },
        data,
      );
    }
  }
  return _.omitBy(data, item => _.isObject(item) || _.isArray(item));
}

function getLogData(action) {
  const eventType = getEventType(action);
  const extraData = getExtraData(action);
  return {
    ...eventType,
    distinct_id: envVars.uuid, // eslint-disable-line
    time: new Date().getTime(),
    project: process.env.NODE_ENV === 'development'
      ? 'MCRM_Test' : 'MCRM_1_0',
    properties: {
      ...envVars,
      ...extraData,
    },
  };
}

const flushLog = _.throttle(
  () => {
    const data = [...QUEUE];
    if (enableLog) {
      api.sendLog(url, data).then(
        () => {
          QUEUE = [];
        },
      ).catch(
        e => (console.log(e)),
      );
    }
  },
  interval,
);

function sendLog(action) {
  if (!isPass(action)) {
    return;
  }
  const data = getLogData(action);
  QUEUE.push(data);
  flushLog();
}

export default function createSensorsLogger() {
  /* eslint-disable */
  return ({ getState }) => (next) => (action) => {
    sendLog(action);
    return next(action);
  };
  /* eslint-disable */
}
