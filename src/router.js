/**
 * @file routes.js
 * @author maoquan(maoquan@htsc.com)
 */

import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  IndexRedirect,
} from 'dva/router';

import Frame from './layouts/Frame';

import KPIHome from './views/kpi/Home';


const routes = ({ history }) => (// eslint-disable-line
  <Router history={history}>
    <Route path="/" component={Frame}>
      <IndexRedirect to="/kpi" />
      <Route path="kpi">
        <IndexRoute component={KPIHome} />
        {/** <Route path="email" component={KPIHome} />*/}
      </Route>
    </Route>
  </Router>
);

export default routes;
