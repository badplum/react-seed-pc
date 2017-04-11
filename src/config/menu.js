/**
 * @file config/menu.js
 *  侧边栏菜单配置
 * @author maoquan(maoquan@htsc.com)
 */

const menus = [
  {
    key: '',
    name: 'Home',
    icon: 'laptop',
  },
  {
    key: 'menu1',
    name: '菜单一',
    icon: 'user',
  },
  {
    key: 'menu2',
    name: '菜单二',
    icon: 'camera-o',
    clickable: false,
    child: [
      {
        key: 'menu21',
        name: '子菜单一',
        icon: 'heart-o',
      },
      {
        key: 'menu22',
        name: '子菜单二',
        icon: 'database',
      },
    ],
  },
];

export default menus;
