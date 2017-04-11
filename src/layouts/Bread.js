import React, { PropTypes } from 'react';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'dva/router';
import _ from 'lodash';

import { menu } from '../config';
import styles from './bread.less';

const pathSet = [];
function getPathSet(menuArray, parentPath = '/') {
  menuArray.forEach((item) => {
    let key = (parentPath + item.key).replace(/\//g, '-');
    key = _.camelCase(key);
    pathSet[key] = {
      path: parentPath + item.key,
      name: item.name,
      icon: item.icon || '',
      clickable: item.clickable === undefined,
    };
    if (item.child) {
      getPathSet(item.child, `${parentPath}${item.key}/`);
    }
  });
}
getPathSet(menu);

function Bread({ location }) {
  const pathNames = [];
  location.pathname.slice(1).split('/').forEach((item, key) => {
    if (key > 0) {
      pathNames.push(_.camelCase(`${pathNames[key - 1]}-${item}`));
    } else {
      pathNames.push(_.kebabCase(`-${item}`));
    }
  });

  const breadsArray = pathNames.filter(item => (item in pathSet));
  const breads = breadsArray.map((item, key) => {
    const content = (
      <span>{pathSet[item].icon
          ? <Icon type={pathSet[item].icon} style={{ marginRight: 4 }} />
          : ''}{pathSet[item].name}</span>
    );
    return (
      <Breadcrumb.Item key={key}>
        {((breadsArray.length - 1) !== key && pathSet[item].clickable)
          ? <Link to={pathSet[item].path}>
            {content}
          </Link>
          : content}
      </Breadcrumb.Item>
    );
  });

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        <Breadcrumb.Item >
          <Link to="/">
            <Icon type="home" />
            <span>Home</span>
          </Link>
        </Breadcrumb.Item>
        {breads}
      </Breadcrumb>
    </div>
  );
}

Bread.propTypes = {
  location: PropTypes.object,
};

export default Bread;
