/**
 * @file app.js
 * @author maoquan(maoquan@htsc.com)
 */

import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';

import createSensorsLogger from './middlewares/sensorsLogger';
import createActivityIndicator from './middlewares/createActivityIndicator';
import routerConfig from './router';
import persistConfig from './config/persist';

const extraEnhancers = [];
if (persistConfig.active) {
  extraEnhancers.push(autoRehydrate());
}

// 错误处理
const onError = (e) => {
  const { message } = e;
  if (message === 'MAG0010') {
    // Toast.fail(
    //   '登录超时，请重新登录！',
    //   1,
    // );
  } else {
    // Toast.fail(getMessage(message), 1);
  }
};

// 1. Initialize
const app = dva({
  history: browserHistory,
  onAction: [createLogger(), createSensorsLogger()],
  extraEnhancers,
  onError,
});

// 2. Plugins
app.use(createLoading({ effects: true }));
app.use(createActivityIndicator());

// 3. Model
app.model(require('./models/kpi'));

// 4. Router
app.router(routerConfig);

// 5. Start
app.start('#app');

// 6. redux-persist
if (persistConfig.active) {
  persistStore(app._store, persistConfig); // eslint-disable-line
}
