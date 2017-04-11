import React, { PropTypes } from 'react';
import { Icon, Switch } from 'antd';

import { constants } from '../config';
import Menus from './Menu';
import styles from './main.less';

function Sider({
  siderFold,
  location,
  navOpenKeys,
  changeOpenKeys,
  changeTheme,
  darkTheme,
}) {
  const menusProps = {
    siderFold,
    location,
    navOpenKeys,
    changeOpenKeys,
    darkTheme,
  };
  return (
    <div>
      <div className={styles.logo}>
        <img alt={'logo'} src={constants.logoSrc} />
        {siderFold ? '' : <span>{constants.logoText}</span>}
      </div>
      <Menus {...menusProps} />
      {!siderFold ? <div className={styles.switchtheme}>
        <span><Icon type="bulb" />切换主题</span>
        <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="黑" unCheckedChildren="白" />
      </div> : ''}
    </div>
  );
}

Sider.propTypes = {
  siderFold: PropTypes.bool,
  location: PropTypes.object,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
};

export default Sider;
