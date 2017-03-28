/**
 * @file layouts/Frame.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { Component, PropTypes } from 'react';
import { withRouter } from 'dva/router';

import '../css/main.less';

@withRouter
export default class Frame extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    // loading: PropTypes.bool.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { children/** , location, loading = false*/ } = this.props;
    return (
      <div className="page-wrapper">
        {children}
        {/* <ActivityIndicator toast animating={loading} text="正在加载" />*/}
      </div>
    );
  }
}
