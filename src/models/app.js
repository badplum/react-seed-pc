/**
 * @file models/app.js
 *  全局模型管理
 * @author maoquan(maoquan@htsc.com)
 */

export default {
  namespace: 'app',
  state: {
    // 屏幕较小时侧栏以popover形式展现
    useMenuPopover: document.body.clientWidth < 769,
    // 屏幕较小时侧栏以popover形式展现，menuPopoverVisible控制popover是否显示
    menuPopoverVisible: false,
    // 侧栏是否显示
    siderFold: localStorage.getItem('htSiderFold') === 'true',
    // 深色 / 浅色主题切换
    darkTheme: localStorage.getItem('htDarkTheme') !== 'false',
    // 当前已展开侧栏菜单
    navOpenKeys: [],
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'queryUser' });
      window.addEventListener(
        'resize',
        () => {
          dispatch({ type: 'changeNavbar' });
        },
      );
    },
  },
  effects: {
    * switchSider({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchSider',
      });
    },
    * changeTheme({
      payload,
    }, { put }) {
      yield put({
        type: 'handleChangeTheme',
      });
    },
    * changeNavbar({
      payload,
    }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' });
      } else {
        yield put({ type: 'hideNavbar' });
      }
    },
    * switchMenuPopover({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchMenuPopver',
      });
    },
  },
  reducers: {
    handleSwitchSider(state) {
      localStorage.setItem('htSiderFold', !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold,
      };
    },
    handleChangeTheme(state) {
      localStorage.setItem('htDarkTheme', !state.darkTheme);
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    },
    showNavbar(state) {
      return {
        ...state,
        useMenuPopover: true,
      };
    },
    hideNavbar(state) {
      return {
        ...state,
        useMenuPopover: false,
      };
    },
    handleSwitchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      };
    },
    changeOpenKeys(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
