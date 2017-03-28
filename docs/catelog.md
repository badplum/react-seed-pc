## 文件目录结构

```bash
.
├── build                  # webpack配置，一般不需要改动
├── config                 # 项目配置文件，一般不需要改动
├── doc                    # 项目文档 
├── mockup                 # mockup目录，与后端接口定义
├── src                    # source目录，项目代码都放在这里
    ├── api                # 与后端接口定义在这里
    ├── components         # 组件
    ├── config             # 配置文件 
    ├── css                # 样式目录
    ├── layouts            # 布局组件，app整体框架组件，一般不随路由变动而变动
    ├── models             # dva models, 所有redux配置都在这里
    ├── theme              # 全局样式定义
    ├── views              # 页面文件, 也叫做路由文件
    └── utils              # Utils
    └── app.js             # 项目入口文件
    └── router.js          # 路径配置文件
├── static                 # 静态资源，图片、字体文件等
├── index.html             # 入口html
├── .eslintrc              # Eslint config
├── .gitignore             #
└── package.json           # 
└── postcss.config.js      # postcss配置
```
