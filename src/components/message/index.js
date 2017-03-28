/**
 * @file components/message/index.js
 *  无相关结果 / 加载展示组件
 * @author wangjunjun
 */
import React, { PropTypes } from 'react';
import _ from 'lodash';

import './index.less';

const TYPE_NOTFOUND = 'notfound';
const TYPE_LOADING = 'loading';
const TYPE_COMPLETE = 'complete';
const TYPE_NETWORK = 'network';

const CONFIG = {
  [TYPE_NOTFOUND]: {
    text: '没有相关的结果',
    imgSrc: '/static/img/messageNotfound.png',
  },
  [TYPE_LOADING]: {
    text: '努力加载中...',
    imgSrc: '/static/img/messageLoading.png',
  },
  [TYPE_COMPLETE]: {
    text: '赞，您已完成所有待办MOT任务',
    imgSrc: '/static/img/messageComplete.png',
  },
  [TYPE_NETWORK]: {
    text: '网络异常，请下拉刷新',
    imgSrc: '/static/img/networkError.png',
  },
};

function Message(props) {
  const { type, text: propText } = props;
  let { height = '100%' } = props;
  if (_.isNumber(height)) {
    height = `${height}px`;
  }
  const { imgSrc, text } = CONFIG[type];
  return (
    <div className="message-wrapper" style={{ height }}>
      <div className="message-container">
        <img src={imgSrc} alt="" />
        <p>{propText || text}</p>
      </div>
    </div>
  );
}

Message.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  height: PropTypes.number.isRequired,
};

Message.defaultProps = {
  text: '',
};

export default Message;
