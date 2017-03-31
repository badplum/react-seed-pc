# 开发指南

## 环境

  1. npm install 安装所有依赖
  2. npm run dev 恩，就可以开发了

## 以开发一个简单列表页面为例

### 1. 接口 && mockup文件

首先前后端定好接口, 并添加到[接口文档](./api.md)中:

    * URL: /api/test/list
    * METHOD: GET
    * PARAMS:
        > categoryId
        > token
    * RESPONSE: 

  ```
{
    "status": 0,
    "message": {
        "global": "获取xx列表失败"
    },
    "data": [
        {
            "id": "1",
            "title": "名称",
            "description": "描述",
            ...
        },
        ...
    ]
}
  ```

根据接口url在mock中新建目录mockup/test,并新建文件list.js,根据接口创建一些假数据，供本地开发使用:

参考[mockup/test/list.js](../mockup/test/list.js)

mockup文件建好后，即可通过 http://localhost:8080/api/test/list 访问到该文件

同时将该接口添加到[src/api/index.js](../src/api/index.js)中

```
import apiCreator from '../utils/apiCreator';

const api = apiCreator();

export default {
  /**
   * 获取产品列表
   */
  getList: () => api.get('/test/list'),
};
```

### 2. 添加view组件 

一个view组件对应一个页面入口，因产品列表是产品tab上的首页，在../src/views/test/ 下新建一个Home的view文件，主要代码：

```
import React, { PureComponent } from 'react';

export default class ProductHome extends PureComponent {
  render() {
    return (
      <div>
        <h1>测试页面</h1>
      </div>
    );
  }
}
```

这样一个简单的react页面我们已经完成了，只是还没有加上路由配置以及连接redux。

将view组件添加到路由配置中(src/router.js)：

```
import TestHome from '../views/test/Home';

  <Router
    history={history}
    ...
  >
    <Route path="/" component={Frame}>
      ...,
      <Route path="test" components={TestHome} />
      ...
    </Route>
  </Router>

```

### 3. 添加子组件

* 通过需求分析，我们定义List组件，用于展示xx列表页面；
* 子组件全部放在`src/components/`下，并根据view名称建立子文件夹；
* 子组件路径：`src/components/test/List.js`;

test/List关键代码片段(先忽略具体逻辑，只要知道是一个标准的组件写法):

```
/**
 * @file test/List.js
 */
import React, { PropTypes, PureComponent } from 'react';
import { Table } from 'antd';

import columns from './columns'; // 这个是table每列的定义，细节不用关注
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

```

这里主要注意以下几点：
  1. PropTypes必须要声明，这个可以增强代码可读性以及可维护性；
  2. props全部从父组件中获取；
  3. 样式文件（list.less）直接在js中引入，webpack中的css-loader会自动处理;

### 创建model文件(该文件包含action、reducer、saga等所有相关配置, 可参看[基于 redux、redux-saga 和 react-router@2.x 的轻量级前端框架: dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md))

```
export default {
  namespace: 'test',
  state: {},
  reducers: {},
  effects: {},
  subscriptions: {},
};
```

并将该文件添加到启动文件`src/app.js`中

```
// 其他代码...
app.model(require('./models/test'));
// 其他代码...

```

下面是重点，编辑model文件，使用redux的方式将数据从服务器端取回，并塞到组件里:

回到上面创建的model文件中

```
export default {
  namespace: 'test', // 对应redux reducer中的名称，可在组件中使用state.test访问到
  state: {}, // 初始状态
  reducers: {}, // reducer, 响应action并更改store数据
  effects: {}, // redux-saga配置，响应action并发起异步请求，（ajax均在此发起 ）
  subscriptions: {}, // 这个主要是启动时被调用，数据请求的action可在这里发起，并由上面的saga响应
};
```

下面贴出`model/test.js`中请求xx列表的代码

```
/**
 * @file models/test.js
 * @author maoquan(maoquan@htsc.com)
 */

import { routerRedux } from 'dva/router';

import api from '../api';

export default {
  namespace: 'test',
  state: {
    home: {
      page: {},
      list: [],
    },
  },
  reducers: {
    getListSuccess(state, action) {
      const { payload: { response } } = action;
      const { list } = response.data;
      return {
        ...state,
        list,
      };
    },
  },
  effects: {
    * getList({ payload: { type = '1' } }, { call, put }) {
      const response = yield call(api.getList, { type });
      yield put({
        type: 'getListSuccess',
        payload: { response, type },
      });
    },
  },
  subscriptions: {},
};

```

### 在view组件中绑定数据

最后，我们要在顶层页面连接redux,并将从redux取到的数据通过props传递给页面中的组件

```
/**
 * @file test/Home.js
 *  xx首页
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
    // 页面开始加载时请求数据
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


```

OK，搞定
