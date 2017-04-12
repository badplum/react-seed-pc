import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

import { menu } from '../config';

const topMenus = menu.map(item => item.key);
function getMenus(menuArray, siderFold, parentPath = '/') {
  return menuArray.map((item) => {
    const linkTo = parentPath + item.key;
    if (item.child) {
      return (
        <Menu.SubMenu
          key={linkTo}
          title={
            <span>
              {item.icon ? <Icon type={item.icon} /> : ''}
              {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
            </span>
          }
        >
          {getMenus(item.child, siderFold, `${linkTo}/`)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={linkTo}>
        <Link to={linkTo}>
          {item.icon ? <Icon type={item.icon} /> : ''}
          {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
        </Link>
      </Menu.Item>
    );
  });
}

function Menus({
  siderFold,
  location,
  handleClickNavMenu,
  navOpenKeys = [],
  changeOpenKeys,
  darkTheme,
}) {
  const menuItems = getMenus(menu, siderFold);

  const getAncestorKeys = (key) => {
    const map = {
      '/navigation/navigation2': ['/navigation'],
    };
    return map[key] || [];
  };

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !(navOpenKeys.indexOf(key) > -1));
    const latestCloseKey = navOpenKeys.find(key => !(openKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  };

  const menuProps = !siderFold ? {
    onOpenChange,
    openKeys: navOpenKeys,
  } : {};

  return (
    <Menu
      {...menuProps}
      mode={siderFold ? 'vertical' : 'inline'}
      theme={darkTheme ? 'dark' : 'light'}
      onClick={handleClickNavMenu}
      defaultSelectedKeys={[location.pathname !== '/' ? location.pathname : '/home']}
    >
      {menuItems}
    </Menu>
  );
}

Menus.propTypes = {
  siderFold: PropTypes.bool.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  handleClickNavMenu: PropTypes.func.isRequired,
  navOpenKeys: PropTypes.array.isRequired,
  changeOpenKeys: PropTypes.func.isRequired,
};

export default Menus;
