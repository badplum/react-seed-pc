/**
 * @file test/List.js
 * @author maoquan(maoquan@htsc.com)
 */

import React from 'react';
import { Link } from 'dva/router';

const columns = [
  {
    title: '姓名',
    dataIndex: 'id',
    key: 'id',
    render: (id, item) => (
      <Link to={`/test/detail/${id}`}>{item.name}</Link>
    ),
  },
  {
    title: '账户余额',
    dataIndex: 'money',
    key: 'money',
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '操作',
    key: 'action',
    render: id => (
      <Link to={`/test/detail/${id}`}>修改</Link>
    ),
  },
];

export default columns;
