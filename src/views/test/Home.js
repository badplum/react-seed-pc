/**
 * @file test/Home.js
 *  xx首页
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import List from '../../components/test/List';
import './home.less';

const mapStateToProps = state => ({
  list: state.test.list,
});

const mapDispatchToProps = {
  getList: query => ({
    type: 'test/getList',
    payload: query || {},
  }),
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Profile extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    getList: PropTypes.func.isRequired,
    list: PropTypes.array,
  }

  static defaultProps = {
    title: 'xx首页',
    list: [],
  }

  componentWillMount() {
    this.props.getList();
  }

  render() {
    const { list } = this.props;
    return (
      <div className="page-test-home">
        <List list={list} />
      </div>
    );
  }
}

