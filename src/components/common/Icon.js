/**
 * Icon.js 图标组件，antd-mobile提供的Icon样式不方便覆盖，这里重写一个
 * @author maoquan(maoquan@htsc.com)
 */
import React, { PropTypes } from 'react';

export default function Icon(props) {
  const { type, className } = props;
  return <i {...props} className={`${className} iconfont icon-${type}`.trim()} />;
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  className: '',
  title: '',
  onClick: () => undefined,
};
