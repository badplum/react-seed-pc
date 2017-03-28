/**
 * @file Home.js
 *  绩效首页
 * @author maoquan(maoquan@htsc.com)
 */

/**
 * @file profile/index.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { routerRedux } from 'dva/router';
import { autobind } from 'core-decorators';

import './home.less';

const getDataFunction = loading => query => ({
  type: 'profile/getMineAchievement',
  payload: query || {},
  loading,
});

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = {
  getInfo: getDataFunction(true),
  refresh: getDataFunction(false),
  push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Profile extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {
    title: '绩效首页',
  }

  @autobind
  handleClick() {
  }

  render() {
    return (
      <div className="page-profile" onClick={this.handleClick}>
        {this.props.title}
      </div>
    );
  }
}

