# 开发指南

## 环境

  1. npm install 安装所有依赖
  2. npm run dev 恩，就可以开发了

## 以开发一个理财产品列表页面为例

### 1. 接口 && mockup文件

首先前后端定好接口, 并添加到[接口文档](./api.md)中:

    * URL: /api/product/list
    * METHOD: GET
    * PARAMS:
        > categoryId // 产品分类
        > token
    * RESPONSE: 

  ```
{
    "status": 0,
    "message": {
        "global": "获取产品列表失败"
    },
    "data": [
        {
            "id": "1",
            "title": "产品名称",
            "description": "产品描述",
            ...
        },
        ...
    ]
}
  ```

根据接口url在mock中新建目录mockup/product,并新建文件list.js,根据接口创建一些假数据，供本地开发使用:

参考[mockup/product/list.js](../mockup/product/list.js)

mockup文件建好后，即可通过 http://localhost:8080/api/product/list 访问到该文件

同时将该接口添加到[src/api/index.js](../src/api/index.js)中

```
import apiCreator from '../utils/apiCreator';

const api = apiCreator();

export default {
  /**
   * 获取产品列表
   */
  getProductList: () => api.get('/product/list'),
};
```

### 2. 添加view组件 

一个view组件对应一个页面入口，因产品列表是产品tab上的首页，在../src/views/product/ 下新建一个Home的view文件，主要代码：

```
import React, { PureComponent } from 'react';
import ProductList from '../../components/product/List';

export default class ProductHome extends PureComponent {
  render() {
    return (
      <div>
        <h1>产品首页</h1>
        <ProductList {...this.props} />
      </div>
    );
  }
}
```

从上面代码，我们看到view组件是一个容器组件，主要用于组织其他子组件（ProductList等）,view组件还要一个重要任务是连接redux，向子组件传递所有必要的属性(props),这个后面讲到。

别忘了将view组件添加到路由配置中(src/router.js)：

```
import ProductHome from '../views/product/Home';

  <Router
    history={history}
    ...
  >
    <Route path="/" component={Frame}>
      ...,
      <Route path="product" components={ProductHome} />
      ...
    </Route>
  </Router>

```

### 3. 添加子组件

* 通过需求分析，我们定义ProductList组件，用于展示产品列表页面；
* 子组件全部放在`src/components/`下，并根据view名称建立子文件夹；
* 子组件路径：`src/components/product/List.js`;

ProductList关键代码片段(先忽略具体逻辑，只要知道是一个标准的组件写法):

```
import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { ListView } from 'antd-mobile';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { prepareDataSource } from '../../utils/listView';
import ListItem from './ListItem';
import './list.less';

export default class ProductList extends PureComponent {

  static propTypes = {
    list: ImmutablePropTypes.list.isRequired,
    getList: PropTypes.func.isRequired,
    categoryId: PropTypes.string.isRequired,
    push: PropTypes.func,
  }

  static defaultProps = {
    push: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getList();
  }

  componentWillReceiveProps(nextProps) {
    const { list } = nextProps;
    if (list !== this.props.list) {
      this.setState({
        dataSource: prepareDataSource(list),
        isLoading: false,
      });
    }
  }

  @autobind
  onEndReached() {
    const { isLoading } = this.state;
    if (!isLoading) {
      this.setState({ isLoading: true }, this.getList);
    }
  }

  /**
   * 根据产品分类id获取产品列表
   */
  @autobind
  getList() {
    const { categoryId, getList } = this.props;
    getList(categoryId);
  }

  renderHeader() {
    return (
      <span>Header</span>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <ListItem
        key={`${sectionID}-${rowID}`}
        {...rowData}
      />
    );
  }

  renderSeparator(sectionID, rowID) {
    return (
      <div
        key={`${sectionID}-${rowID}`}
        className="list-separator"
      />
    );
  }

  @autobind
  renderFooter() {
    const { isLoading } = this.state;
    return (
      <div>
        { isLoading ? '加载中...' : '加载完毕' }
      </div>
    );
  }

  render() {
    const { dataSource } = this.state;
    if (!dataSource) {
      return null;
    }
    return (
      <ListView
        className="list-over-tabbar product-list"
        dataSource={dataSource}
        renderHeader={this.renderHeader}
        renderFooter={this.renderFooter}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        useBodyScroll
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}
```

这里主要注意以下几点：
  1. 组件尽可能拆分成较细粒度，这里我们将List每一行的渲染单独拆成一个ListItem的组件，ListItem的代码不贴了，可参考[这里](../src/components/product/ListItem.js)；
  2. PropTypes必须要声明，这个可以增强代码可读性以及可维护性；
  3. props全部从父组件中获取；
  4. 样式文件（list.less）直接在js中引入，webpack中的css-loader会自动处理;

### 创建model文件(该文件包含action、reducer、saga等所有相关配置, 可参看[基于 redux、redux-saga 和 react-router@2.x 的轻量级前端框架: dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md))

```
export default {
  namespace: 'product',
  state: {},
  reducers: {},
  effects: {},
  subscriptions: {},
};
```

并将该文件添加到启动文件`src/app.js`中

```
// 其他代码...
app.model(require('./models/product'));
// 其他代码...

```

下面是重点，编辑model文件，使用redux的方式将数据从服务器端取回，并塞到组件里:

回到上面创建的model文件中

```
export default {
  namespace: 'product', // 对应redux reducer中的名称，可在组件中使用state.product访问到
  state: {}, // 初始状态
  reducers: {}, // reducer, 响应action并更改store数据
  effects: {}, // redux-saga配置，响应action并发起异步请求，（ajax均在此发起 ）
  subscriptions: {}, // 这个主要是启动时被调用，数据请求的action可在这里发起，并由上面的saga响应
};
```

下面贴出`model/product.js`的示例

```
import { fromJS } from 'immutable';

import api from '../api';
import { delay } from '../utils/sagaEffects';

export default {
  namespace: 'product',
  state: fromJS({
    list: [], // 初始列表数据
  }),
  reducers: {
    // saga 异步请求成功后，发起`saveList`action,然后通过reducer来更改数据
    saveList(state, action) {
      const { payload: { response } } = action;
      return state.update('list', list => list.concat(response.data));
    },
  },
  effects: {
    // 响应名称为`fetch`的响应，并发起异步请求
    * fetch({ payload: { categoryId = 1 } }, { call, put }) {
      const response = yield call(api.getProductList, { categoryId });
      // 模拟网络延迟
      yield delay(1000);
      yield put({
        type: 'saveList',
        payload: {
          response,
          categoryId,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // 监听路由，只要符合某种特定模式，如本例中pathname === '/product', 就进行特定动作
      // 这里表示已进入`/product`页面，就发起`fetch`请求,取后端数据
      return history.listen(({ pathname, query }) => {
        if (pathname === '/product') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
```

### 在view组件中绑定数据

```
// 其他代码略

/////////// 绑定数据代码
const mapStateToProps = state => ({
  // 对应model中的namespace / state字段
  list: state.product.get('list'),
});

const mapDispatchToProps = {
  // 这里是为了滑动列表时持续获取数据,
  // 初始加载并不需要在组件中定义
  getList: categoryId => ({
    type: 'product/fetch',
    payload: { categoryId },
  }),
  push: routerRedux.push,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ProductHome extends PureComponent {

  // 其他代码略

  render() {
    return (
      <div className="page-product-home">
        <SearchBar placeholder="搜索" />
        { // 将props中的数据传递给组件 }
        <ProductList
          categoryId={'c12'}
          {...this.props}
        />
      </div>
    );
  }
}
```

OK，搞定
