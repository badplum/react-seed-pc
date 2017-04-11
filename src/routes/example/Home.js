/**
 * @file example/Home.js
 *  xx首页
 * @author maoquan(maoquan@htsc.com)
 */

import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import List from '../../components/example/List';
import './home.less';

const mapStateToProps = state => ({
  list: state.example.list,
});

const mapDispatchToProps = {
  getList: query => ({
    type: 'example/getList',
    payload: query || {},
  }),
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Profile extends PureComponent {

  static propTypes = {
    getList: PropTypes.func.isRequired,
    list: PropTypes.array,
  }

  static defaultProps = {
    list: [],
  }

  componentWillMount() {
    this.props.getList();
  }

  render() {
    const { list } = this.props;
    return (
      <div className="page-example-home content-inner">
        <List list={list} />
      </div>
    );
  }
}

