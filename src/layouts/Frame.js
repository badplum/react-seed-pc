/**
 * @file layouts/Frame.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { Component, PropTypes } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { withRouter, Link } from 'dva/router';

import '../css/main.less';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

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
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">头部导航 1</Menu.Item>
            <Menu.Item key="2">头部导航 2</Menu.Item>
            <Menu.Item key="3">头部导航 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['11']}
              defaultOpenKeys={['1']}
              style={{ height: '100%' }}
            >
              <SubMenu key="1" title={<span><Icon type="user" />菜单一</span>}>
                <Menu.Item key="11"><Link to="/test">子菜单一</Link></Menu.Item>
                <Menu.Item key="12"><Link to="/test1">子菜单二</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="2" title={<span><Icon type="laptop" />菜单二</span>}>
                <Menu.Item key="21">子菜单一</Menu.Item>
                <Menu.Item key="22">子菜单二</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              {children}
            </Content>
          </Layout>
        </Layout>
        {/* <ActivityIndicator toast animating={loading} text="正在加载" />*/}
      </Layout>
    );
  }
}
