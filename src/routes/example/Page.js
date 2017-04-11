/**
 * @file example/Page.js
 *  空白页面，测试侧栏导航用的
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { withRouter } from 'dva/router';

import './home.less';

@withRouter
export default class Page extends PureComponent {

  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  render() {
    const { location: { pathname } } = this.props;
    return (
      <div className="page-example-home content-inner">
        {`当前路径： ${pathname} `}
      </div>
    );
  }
}

