## 线上部署

### 1.项目打包

在项目目录下运行：

```
npm run build
```

执行完成后在`${projectHome}/dist`下生成最终线上产物:

```bash
.
├── index.html              # 项目入口文件, 在单页项目中，这是唯一个html文件
├── static                  # 所有静态资源，包括样式、脚本、图片等
    ├── css                 # 样式
        ├── app.${md5}.css
        ├── ...
    ├── js                  # 脚本
        ├── app.${md5}.js
        ├── ...
    ├── img                 # 图片 
    ├── font                # 字体
```

### 2.项目发布

项目发布即将打包产物复制到服务器的nginx或者apache等静态服务器上，同时对服务器做一些必要的设置，以nginx为例：

```
  ...
  
  # 将所有`/api`开头的请求转发给后端服务器处理
  location ^~ /api/ {
    proxy_pass http://192.168.71.xx/api/;
  }

  # 因为静态资源文件都是带md5命名的，因此可以对静态目录添加永久缓存,以提高缓存利用率
  location ^~ /static/ {
      alias /app/www/mcrm_web/static/;
      try_files $uri $uri/ /index.html;
      add_header Cache-Control max-age=946080000;
      autoindex_exact_size off;
      autoindex_localtime on;
  }

  # 入口文件
  location ~ / {
    root /app/www/mcrm_web/;
    try_files $uri $uri/ /index.html;
    autoindex_exact_size off;
    autoindex_localtime on;
  }

  ...

```