/**
 * @file test/List.js
 * @author maoquan(maoquan@htsc.com)
 */
import React, { PropTypes, PureComponent } from 'react';
import { Table } from 'antd';

import columns from './columns';
import './list.less';


export default class TestList extends PureComponent {

  static propTypes = {
    list: PropTypes.array.isRequired,
  }

  static defaultProps = {
  }

  render() {
    const { list } = this.props;
    return (
      <Table
        columns={columns}
        dataSource={list}
      />
    );
  }
}
