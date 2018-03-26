# my-project-multipage

> A simple Vue.js Multipage project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

 多页面配置文件修改记录：

 原始，src下面添加一个html页面，在配置文件里面添加一个相关配置
 页面较多时，这样配置显的麻烦，可以写个循环添加 

 0. src目录中添加pages目录，在pages里面添加list等页面目录，每个目录下面新建一个html和一个入口js

 1. 修改webpack.base.conf.js。打开该文件，找到entry, 默认只有一个index的入口，在这里添加多个入口
```
  entry: {
     app: './src/main.js',
     list: './src/pages/list/list.js',
     form: './src/pages/form/form.js',
     show: './src/pages/show/show.js'
   },
```
 运行编译的时候，每个入口都会对应一个Chunk

 2. run dev开发环境，修改webpack.dev.conf.js。 打开该文件，在plugins下找到new HtmlWebpackPlugin，在其后面添加对应的多，并为每个页面添加Chunk配置
 Chunks: ['manifest', 'vender', 'app']中app对应的是webpack.base.conf.js中entry设置的入口js文件
```
 	new HtmlWebpackPlugin({
      filename: 'index.html',//生成文件名名称
      template: 'index.html',//template表示模板路径
      inject: true,//js插入位置
      chunks: ['manifest', 'vender', 'app']
    }),
 	new HtmlWebpackPlugin({
	  filename: 'list.html',
	  template: './src/pages/list/list.html',
	  inject: true,
	  chunks: ['manifest', 'vender', 'list']
	}),
	new HtmlWebpackPlugin({
	  filename: 'form.html',
	  template: './src/pages/form/form.html',
	  inject: true,
	  chunks: ['manifest', 'vender', 'form']
	}),
	new HtmlWebpackPlugin({
	  filename: 'show.html',
	  template: './src/pages/show/show.html',
	  inject: true,
	  chunks: ['manifest', 'vender', 'show']
	}),
```

 3. run build 编译，修改config下index.js，打开config下index.js,找到build下的 '../dist/index.html'，在其后添加多页。
```
    list: path.resolve(__dirname, '../dist/pages/list.html'),
    form: path.resolve(__dirname, '../dist/pages/form.html'),
    show: path.resolve(__dirname, '../dist/pages/show.html'),
```
	修改 webpack.prod.conf.js
	打开~\build\webpack.prod.conf.js，在plugins下找到new HtmlWebpackPlugin，在其后面添加对应的多页，并为每个页面添加Chunk配置
```
    new HtmlWebpackPlugin({
      filename: config.build.list,
      template: './src/pages/list/list.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: ['manifest','vendor','list']
    }),
```



页面较多时，这样配置显的麻烦，可以写个循环添加。修改部分：

1.build下的build.js添加var glob = require('glob'); 添加方法：
```
//获取多级的入口文件
exports.getMultiEntry = function (globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-4);
  
  var pathsrc = tmp[0]+'/'+tmp[1];
  if( tmp[0] == 'src' ){
    pathsrc = tmp[1];
  }
  //console.log(pathsrc)
    pathname = pathsrc + '/' + basename; // 正确输出js和html的路径
    entries[pathname] = entry;
    
    // console.log(pathname+'-----====------'+entry);
    
  });
  return entries;
  
}
```
2.config下的index.js添加moduleName:'pages',
3.webpack.base.conf.js添加下面代码，注释之前的多页面入口，entry设置为调用方法得到的entries变量
```
var entries =  utils.getMultiEntry('./src/'+config.moduleName+'/**/**/*.js'); // 获得入口js文件
entries['app'] = './src/main.js';
// entry: {
//   app: './src/main.js',
//   list: './src/pages/list/list.js',
//   form: './src/pages/form/form.js',
//   show: './src/pages/show/show.js'
// },
entry: entries,
```
4.webpack.dev.conf.js注释掉之前单个添加的HtmlWebpackPlugin，改为循环添加
```
//构建生成多页面的HtmlWebpackPlugin配置，主要是循环生成
var pages =  utils.getMultiEntry('./src/'+config.moduleName+'/**/**/*.html');
for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname], // 模板路径
    chunks: [pathname, 'vendors', 'manifest'], // 每个html引用的js模块
    inject: true              // js插入位置
  };
  // console.log('conf', conf);
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}
```

5.webpack.prod.conf.js注释掉之前单个添加的HtmlWebpackPlugin，改为循环添加
```
//构建生成多页面的HtmlWebpackPlugin配置，主要是循环生成
var pages =  utils.getMultiEntry('./src/'+config.moduleName+'/**/**/*.html');
for (var pathname in pages) {

  var conf = {
    filename: pathname + '.html',
    template: pages[pathname], // 模板路径
    chunks: ['manifest','vendor', pathname], // 每个html引用的js模块
    inject: true,              // js插入位置
  hash:true
  };
 
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}
```