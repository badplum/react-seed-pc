import React, { PropTypes } from 'react';
import { Menu, Icon, Popover } from 'antd';

import Menus from './Menu';
import styles from './header.less';

const SubMenu = Menu.SubMenu;

function Header({
  user = { name: '测试用户' },
  logout,
  switchSider,
  siderFold,
  useMenuPopover,
  menuPopoverVisible,
  location,
  switchMenuPopover,
  navOpenKeys,
  changeOpenKeys,
}) {
  const handleClickMenu = e => e.key === 'logout' && logout();
  const menusProps = {
    siderFold: false,
    darkTheme: false,
    useMenuPopover,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  };
  return (
    <div className={styles.header}>
      {useMenuPopover
        ? <Popover
          placement="bottomLeft"
          onVisibleChange={switchMenuPopover}
          visible={menuPopoverVisible}
          overlayClassName={styles.popovermenu}
          trigger="click"
          content={<Menus {...menusProps} />}
        >
          <div className={styles.button}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div className={styles.button} onClick={switchSider}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}
      <div className={styles.rightWarpper}>
        <div className={styles.button}>
          <Icon type="mail" />
        </div>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{
              float: 'right',
            }}
            title={
              <span>
                <Icon type="user" />
                {user.name}
              </span>
            }
          >
            <Menu.Item key="logout">
              <a>注销</a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  switchSider: PropTypes.func.isRequired,
  siderFold: PropTypes.bool.isRequired,
  useMenuPopover: PropTypes.bool.isRequired,
  menuPopoverVisible: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  switchMenuPopover: PropTypes.func.isRequired,
  navOpenKeys: PropTypes.array.isRequired,
  changeOpenKeys: PropTypes.func.isRequired,
};

export default Header;
