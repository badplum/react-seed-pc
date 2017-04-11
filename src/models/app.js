/**
 * @file models/app.js
 *  全局模型管理
 * @author maoquan(maoquan@htsc.com)
 */

export default {
  namespace: 'app',
  state: {
    user: {
      name: '吴彦祖',
    },
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('htSiderFold') === 'true',
    darkTheme: localStorage.getItem('htDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
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
    *switchSider({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchSider',
      });
    },
    *changeTheme({
      payload,
    }, { put }) {
      yield put({
        type: 'handleChangeTheme',
      });
    },
    *changeNavbar({
      payload,
    }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' });
      } else {
        yield put({ type: 'hideNavbar' });
      }
    },
    *switchMenuPopver({
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
        isNavbar: true,
      };
    },
    hideNavbar(state) {
      return {
        ...state,
        isNavbar: false,
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
