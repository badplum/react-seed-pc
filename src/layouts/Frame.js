/**
 * @file layouts/Frame.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { TabBar, ActivityIndicator } from 'antd-mobile';
import { withRouter, routerRedux } from 'dva/router';
import { autobind } from 'core-decorators';

import TabPane from './TabPane';
import Icon from '../components/common/Icon';
import tabConfig from '../config/tabConfig';

import '../css/main.less';

// 存放每个tab页的对象，以便切换的时候保持状态
const QUERY_MAP = {};

const getMissionBadge = (state) => {
  const { missionCenter } = state.mission;
  return (missionCenter && missionCenter.totalCount) || 0;
};

const mapStateToProps = state => ({
  loading: state.activity.global,
  missionBadge: getMissionBadge(state),
});

const mapDispatchToProps = {
  push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
class Frame extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    push: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    missionBadge: PropTypes.number,
  }

  static defaultProps = {
    missionBadge: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onChange(item) {
    const { push, location: { pathname, query } } = this.props;
    if (pathname) {
      QUERY_MAP[pathname.slice(1)] = { ...query };
    }
    const { key } = item;
    const lastQuery = QUERY_MAP[key] || {};
    push({
      pathname: `/${key}`,
      query: {
        ...lastQuery,
      },
    });
  }

  renderIcon({ key, isSelected }) {
    const iconMap = {
      mission: isSelected ? 'renwu1' : 'renwu',
      product: isSelected ? 'chanp0101' : 'chanpin',
      customer: isSelected ? 'customer' : 'kehu1',
      profile: isSelected ? 'wo' : 'wode',
    };
    return (
      <Icon
        className={isSelected ? 'icon-active' : ''}
        type={iconMap[key]}
      />
    );
  }

  @autobind
  renderTabBarItem(item) {
    return (
      <TabBar.Item
        key={item.key}
        title={item.label}
        icon={this.renderIcon(item)}
        selectedIcon={this.renderIcon(item)}
        selected={item.isSelected}
        badge={item.key === 'mission' ? this.props.missionBadge : ''}
        onPress={() => {
          this.onChange(item);
        }}
      >
        { item.component }
      </TabBar.Item>
    );
  }

  render() {
    const { children, location, loading = false } = this.props;
    const { pathname } = location;
    const paths = pathname.split('/').filter(path => !!path);
    // 暂时先根据pathname长度决定是否隐藏tabbar,
    // 后续根据需求建立需要tabbar的白名单,如{ '/product': true, ... }
    const isTabBarHidden = paths.length > 1;

    // tabbar内渲染 or 独立页面
    let findTabItem = false;
    const tabs = tabConfig.map(
      (item) => {
        if (pathname.slice(1).indexOf(item.key) === 0) {
          findTabItem = true;
          return this.renderTabBarItem({ ...item, component: children, isSelected: true });
        }
        return this.renderTabBarItem({ ...item, component: TabPane });
      },
    );
    const main = findTabItem ? (
      <TabBar
        unselectedTintColor="#c5c4c7"
        tintColor="#ffffff"
        barTintColor="#2d3333"
        hidden={isTabBarHidden}
      >
        {tabs}
      </TabBar>
    ) : (
      <div className="page-wrapper">{children}</div>
    );
    return (
      <div className="page-wrapper">
        {main}
        <ActivityIndicator toast animating={loading} text="正在加载" />
      </div>
    );
  }
}

export default withRouter(Frame);
