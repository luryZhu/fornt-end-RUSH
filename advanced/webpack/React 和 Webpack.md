参考课程：

尚硅谷 webpack 入门到精通：https://www.bilibili.com/video/BV1cv411C74F

尚硅谷 webpack+React：https://www.bilibili.com/video/BV1J5411h7vN

# 概念：前端工程化

**src**，源代码：程序员写的没有经过加工的代码

**dist**，加工后的代码：通常是经过加工的代码

**构建**：将源代码经过编译 压缩 语法检查 兼容性处理，生成浏览器可以高效稳定运行的代码

**构建工具**：grunt，gulp，**webpack**（最新最好）

webpack：模块打包器/ 构建工具

# Webpack

webpack：模块打包器/ 构建工具

**基本功能**：

- 代码转换：TypeScript 编译成 JavaScript、SASS 编译成 CSS 等等
- 文件优化：压缩 JavaScript、CSS、html 代码，压缩合并图片等
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载
- 模块合并：在采用模块化的项目有很多模块和文件，需要构建功能把模块分类合并成一个文件
- 自动刷新：监听本地源代码的变化，自动构建，刷新浏览器
- 代码校验：在代码被提交到仓库前需要检测代码是否符合规范，以及单元测试是否通过
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

## 入口(entry)

**入口起点(entry point)**指示 webpack 应该使用哪个模块，来作为构建其内部*依赖图*的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

每个依赖项随即被处理，最后输出到称之为 *bundles* 的文件中，我们将在下一章节详细讨论这个过程。

可以通过在 [webpack 配置](https://www.webpackjs.com/configuration)中配置 `entry` 属性，来指定一个入口起点（或多个入口起点）。默认值为 `./src`。

接下来我们看一个 `entry` 配置的最简单例子：

**webpack.config.js**

```js
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

> 根据应用程序的特定需求，可以以多种方式配置 `entry` 属性。从[入口起点](https://www.webpackjs.com/concepts/entry-points)章节可以了解更多信息。

## 出口(output)

**output** 属性告诉 webpack 在哪里输出它所创建的 *bundles*，以及如何命名这些文件，默认值为 `./dist`。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 `output` 字段，来配置这些处理过程：

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

在上面的示例中，我们通过 `output.filename` 和 `output.path` 属性，来告诉 webpack bundle 的名称，以及我们想要 bundle 生成(emit)到哪里。可能你想要了解在代码最上面导入的 path 模块是什么，它是一个 [Node.js 核心模块](https://nodejs.org/api/modules.html)，用于操作文件路径。

> 你可能会发现术语**生成(emitted 或 emit)**贯穿了我们整个文档和[插件 API](https://www.webpackjs.com/api/plugins)。它是“生产(produced)”或“释放(discharged)”的特殊术语。

> `output` 属性还有[更多可配置的特性](https://www.webpackjs.com/configuration/output)，如果你想要了解更多关于 `output` 属性的概念，你可以通过[阅读概念章节](https://www.webpackjs.com/concepts/output)来了解更多。

## loader

*loader* 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效[模块](https://www.webpackjs.com/concepts/modules)，然后你就可以利用 webpack 的打包能力，对它们进行处理。

本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

> 注意，loader 能够 `import` 导入任何类型的模块（例如 `.css` 文件），这是 webpack 特有的功能，其他打包程序或任务执行器的可能并不支持。我们认为这种语言扩展是有很必要的，因为这可以使开发人员创建出更准确的依赖关系图。

在更高层面，在 webpack 的配置中 **loader** 有两个目标：

1. `test` 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
2. `use` 属性，表示进行转换时，应该使用哪个 loader。

**webpack.config.js**

```javascript
const path = require('path');

const config = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;
```

以上配置中，对一个单独的 module 对象定义了 `rules` 属性，里面包含两个必须属性：`test` 和 `use`。这告诉 webpack 编译器(compiler) 如下信息：

> “嘿，webpack 编译器，当你碰到「在 `require()`/`import` 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先**使用** `raw-loader` 转换一下。”

> 重要的是要记得，**在 webpack 配置中定义 loader 时，要定义在 `module.rules` 中，而不是 `rules`**。然而，在定义错误时 webpack 会给出严重的警告。为了使你受益于此，如果没有按照正确方式去做，webpack 会“给出严重的警告”

loader 还有更多我们尚未提到的具体配置属性。

[了解更多！](https://www.webpackjs.com/concepts/loaders)

## 插件(plugins)

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从**打包优化和压缩**，一直到重新定义环境中的变量。[插件接口](https://www.webpackjs.com/api/plugins)功能极其强大，可以用来处理各种各样的任务。

想要使用一个插件，你只需要 `require()` 它，然后把它添加到 `plugins` 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 `new` 操作符来创建它的一个实例。

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

webpack 提供许多开箱可用的插件！查阅我们的[插件列表](https://www.webpackjs.com/plugins)获取更多信息。

在 webpack 配置中使用插件是简单直接的，然而也有很多值得我们进一步探讨的用例。

[了解更多！](https://www.webpackjs.com/concepts/plugins)

## 模式

通过选择 `development` 或 `production` 之中的一个，来设置 `mode` 参数，你可以启用相应模式下的 webpack 内置的优化

```javascript
module.exports = {
  mode: 'production'
};
```

# React脚手架与Webpack

https://juejin.cn/post/6909719159773331463/

通过 npm run eject**将配置文件暴露出来**

eject的目的：手动修改webpack等配置文件

eject后会新增两个目录：

- config：可以修改的配置文件
- scripts：原来的start run build存在这里

## config

> │  env.js
> │  getHttpsConfig.js
> │  modules.js
> │  paths.js
> │  webpack.config.js
> │  webpackDevServer.config.js
> │
> ├─jest
> │      babelTransform.js
> │      cssTransform.js
> │      fileTransform.js
> │
> └─webpack
>     └─persistentCache
>             createEnvironmentHash.js

1. config-->paths.js（向外暴露出路径）
2. scripts-->start.js（开发环境对应的文件）
3. webpack.config.js（主要内容为对loader和plugin的配置，将来自己修改的时候可以直接在这个文件夹里面进行loader和plugin的修改）（核心）
4. scripts-->build.js（生产环境对应的文件，与开发环境对应的文件差不多）

