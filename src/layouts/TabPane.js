/**
 * @file app/TabPane.js
 *  作为tabbar对应的页面入口，封装tabbar中页面切换的过场动画等功能
 * @author maoquan(maoquan@htsc.com)
 */

import { PropTypes } from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default function TabPane(props) {
  // const { location, children } = props;
  // const { action, pathname } = location;
  return props.children;
    // <ReactCSSTransitionGroup
    //   component="section"
    //   transitionName={action === 'POP' ? 'page-reverse' : 'page'}
    //   transitionEnterTimeout={200}
    //   transitionLeaveTimeout={200}
    // >
    //   {React.cloneElement(children, {
    //     key: pathname,
    //   })}
    // </ReactCSSTransitionGroup>
}

TabPane.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

TabPane.defaultProps = {
};
