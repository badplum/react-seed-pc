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

import Test from './views/test/Home';
import TestDetail from './views/test/Detail';


const routes = ({ history }) => (// eslint-disable-line
  <Router history={history}>
    <Route path="/" component={Frame}>
      <IndexRedirect to="/test" />
      <Route path="test">
        <IndexRoute component={Test} />
        <Route path="detail/:id" component={TestDetail} />
      </Route>
    </Route>
  </Router>
);

export default routes;
