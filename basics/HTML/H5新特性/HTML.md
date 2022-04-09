参考

http://interview.poetries.top/

https://juejin.cn/post/6905294475539513352

# H5新特性

w3cschool.cn/html5/html5-new-element.html

https://juejin.cn/post/6988039257587712008

https://www.cnblogs.com/jane-panyiyun/p/13092297.html

什么是H5：

- 2014年5月万维网联盟（W3C）指定的HTML的最顶修订版本，目的是为了在移动设备上支持多媒体

`HTML5` 现在已经不是 `SGML` 的子集，主要是关于图像，位置，存储，多任务等功能的增加

**移除的元素有：**

- 纯表现的元素：basefont，big，center，font, s，strike，tt，u;
- 对可用性产生负面影响的元素：frame，frameset，noframes；

## 新增特性

| 类型                   | 具体内容                                                     | 作用                                           |
| ---------------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| 1 **语义化标签**       | `<header> <footer> <nav> <aside> <article> <section>` …      | 使开发者更方便清晰构建页面的布局               |
| 2 表单控件             | `color date time email url search` …                         | 新增input输入控件，改善输入控制和验证          |
| 3 音频 视频            | `<audio> <video>`                                            | 在文档中嵌入音频、视频内容                     |
| 4 **拖放 API**         | `Drag  Drop  `                                               | 拖放元素                                       |
| 5 **画布 API**         | `Canvas`                                                     | 通过JavaScript 和 HTML的<canvas>元素来绘制图形 |
| 6 **SVG**              |                                                              | 可缩放矢量图形，使用XML描述2D图形              |
| 7 地理 API             | `Geolocation`                                                | 获取设备地理位置                               |
| 8 历史 API             | `History`，新增     `history.pushState()  ` `history.replaceState()` | 允许添加和修改历史记录条目                     |
| 9 离线存储             | `manifest`                                                   |                                                |
| 10 Web Storage         | `localStorage` `sessionStorage`                              | 本地离线存储                                   |
| 11 **Web  Worker** API |                                                              | 在独立于主线程的后台线程中，运行一个脚本操作   |
| 12 **WebSocket** API   |                                                              | 单个TCP连接上进行全双工通讯的协议              |

## H5 的优缺点

优势：

- 提高可用性和可维护性，改进了用户体验。
- 新增语义化标签，有助于开发人员定义清晰的结构。
- 可以播放视频音频，增加多媒体元素。
- 利用动画，友好地替代了flash和silverlight。
- 爬虫抓取网站的时候，对于SEO很友好。
- H5被大量应用于移动应用和游戏开发。
- 可移植性好。

缺点：

现在大多数高版本浏览器都支持html5，但是少部分的低版本浏览器目前不支持html5，因新标签的引入，各浏览器之间将缺少一种统一的数据描述格式，造成用户体验不佳。

# 事件

见17章笔记

# HTML语义化

**语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化）**。通俗来讲就是用正确的标签做正确的事情。

## 为什么要语义化

- **代码结构:** 使页面没有css的情况下，也能够呈现出很好的内容结构
- **有利于SEO:** 爬虫依赖标签来确定关键字的权重，因此可以和搜索引擎建立良好的沟通，帮助爬虫抓取更多的有效信息
- **提升用户体验:**例如title、alt可以用于解释名称或者解释图片信息，以及label标签的灵活运用。
- **便于团队开发和维护:** 语义化使得代码更具有可读性，让其他开发人员更加理解你的html结构，减少差异化。
- **方便其他设备解析:** 如屏幕阅读器、盲人阅读器、移动设备等，以有意义的方式来渲染网页。

# H5语义化标签

![](https://pic3.zhimg.com/80/v2-f0dfe064d5c3a5bc1154f6888c411b36_720w.jpg)



# Drag Drop 拖放API

被拖放元素标签:设置draggable属性来实现元素的拖放，img和a标签默认是可以拖放的

相关事件：

在拖动目标上触发，在**被拖动的元素**上生效：

- ondragstart 拖动开始时
  - 需要记录被拖拽元素的id
- ondrag    拖动元素时
- ondragend  拖动结束时

释放目标时触发，在**作容器的元素**上生效：

- ondragenter 被拖放元素进入容器范围时
- ondragover  被拖放元素在容器范围内拖动时
  - 这里需要preventDefault()，阻止元素发生默认行为，因为默认无法放入元素
- ondragleave 被拖放元素离开容器范围时
- ondrop    拖动过程中释放鼠标时
  - 这里需要根据id把被拖拽的元素作为子节点插入

[代码](demo\DragAPI 事件监听.html)

# HTML元素

## iframe缺点

内联框架元素 (`<iframe>`) ，能够将另一个 HTML 页面嵌入到当前页面中。

**优点**

1. 可以**跨域**请求其他网站，并将网站完整展示出来
2. 典型系统结构可以提高代码的**复用性**
3. 创建一个全新的独立的宿主环境，可以隔离或者访问原生接口及对象
4. **模块分离**，若多个页面引用同一个`iframe`，则便于修改操作
5. 若需要刷新`iframe`则**只需要刷新框架内**，不需要刷新整个页面

**缺点** 前3个比较重要

1. `iframes`**阻塞页面加载onload事件**，`iframe`加载完毕后才会触发`window.onload`事件，影响网页加载速度，动态设置`src`可解决这个问题。
2. **不利于`SEO`**，搜索引擎的爬虫无法解读`iframe`的页面。
3. `iframe`与主页面是**共享链接池**的，若`iframe`加载时用光了链接池，则会造成主页面加载阻塞。
4. 加载了新页面，增加了`css`与`js`文件的请求，即额外增加了`HTTP`请求，增加了**服务器负担**。
5. 有时`iframe`由于页面挤占空间的原因出现滚动条，造成**布局混乱**。
6. 有些小型的移动设备如手机等无法完全显示框架，**兼容性较差**。

## script 标签中 defer 和 async 的区别？

- `script` ：会阻碍 HTML 解析，只有下载好并执行完脚本才会继续解析 HTML。
- `async script` ：解析 HTML 过程中进行脚本的异步下载，下载成功立马执行，有可能会阻断 HTML 的解析。
- `defer script`：完全不会阻碍 HTML 的解析，解析完成之后再按照顺序执行脚本。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ea091aed8364b88a653a13c4845a824~tplv-k3u1fbpfcp-watermark.awebp)

需要补充：

- 浏览器渲染过程
- 回流与重绘
- 参考https://juejin.cn/post/6844904040346681358

## href和src的区别

src和href都是**用来引用外部的资源**，它们的区别如下：

- **src：** 表示对**资源**的引用，它指向的内容会嵌入到当前标签所在的位置。src会将其指向的资源下载并应⽤到⽂档内，如请求js脚本。当浏览器解析到该元素时，会**暂停其他资源的下载和处理**，直到将该资源加载、编译、执⾏完毕，所以⼀般js脚本会放在页面底部。
- **href：** 表示**超文本**引用，它指向一些**网络资源**，建立和当前元素或本文档的链接关系。当浏览器识别到它他指向的⽂件时，就会并⾏下载资源，**不会停⽌对当前⽂档的处理**。 常用在a、link等标签上。

## DOCTYPE(文档类型) 的作用

DOCTYPE是HTML5中一种标准通用标记语言的文档类型声明，它的目的是**告诉浏览器（解析器）应该以什么样（html或xhtml）的文档类型定义来解析文档**，不同的渲染模式会影响浏览器对 CSS 代码甚⾄ JavaScript 脚本的解析。它必须声明在HTML⽂档的第⼀⾏。

浏览器渲染页面的两种模式（可通过document.compatMode获取，比如，语雀官网的文档类型是**CSS1Compat**）：

- **CSS1Compat：标准模式（Strick mode）**，默认模式，浏览器使用W3C的标准解析渲染页面。在标准模式中，浏览器以其支持的最高标准呈现页面。
- **BackCompat：怪异模式(混杂模式)(Quick mode)**，浏览器使用自己的怪异模式解析渲染页面。在怪异模式中，页面以一种比较宽松的向后兼容的方式显示。

## 常用的meta标签

`meta` 标签由 `name` 和 `content` 属性定义，**用来描述网页文档的属性**，比如网页的作者，网页描述，关键词等，除了HTTP标准固定了一些`name`作为大家使用的共识，开发者还可以自定义name。

常用的meta标签： 

（1）`charset`，用来描述HTML文档的编码类型：

```html
<meta charset="UTF-8" >
```

（2） `keywords`，页面关键词：

```html
<meta name="keywords" content="关键词" />
```

（3）`description`，页面描述：

```html
<meta name="description" content="页面描述内容" />
```

（4）`refresh`，页面重定向和刷新：

```html
<meta http-equiv="refresh" content="0;url=" />
```

（5）`viewport`，适配移动端，可以控制视口的大小和比例：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

（6）搜索引擎索引方式：

```html
<meta name="robots" content="index,follow" />
复制代码
```

其中，`content` 参数有以下几种：

- `all`：文件将被检索，且页面上的链接可以被查询；
- `none`：文件将不被检索，且页面上的链接不可以被查询；
- `index`：文件将被检索；
- `follow`：页面上的链接可以被查询；
- `noindex`：文件将不被检索；
- `nofollow`：页面上的链接不可以被查询。

### **介绍下 viewport**

`viewport`，适配移动端，可以控制视口的大小和比例：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

其中，`content` 参数有以下几种：

- `width viewport` ：宽度(数值/device-width)
- `height viewport` ：高度(数值/device-height)
- `initial-scale` ：初始缩放比例
- `maximum-scale` ：最大缩放比例
- `minimum-scale` ：最小缩放比例
- `user-scalable` ：是否允许用户缩放(yes/no）

## a标签css属性排列顺序

改变a标签css属性的排列顺序

只需要记住`LoVe HAte`原则就可以了(**爱恨原则**)：

```text
link→visited→hover→active
```

注意⚠️各个阶段的含义：

- `a:link`：未访问时的样式，一般省略成a
- `a:visited`：已经访问后的样式
- `a:hover`：鼠标移上去时的样式
- `a:active`：鼠标按下时的样式

## 网页制作会用到的图片格式有哪些

> ```
> png-8`，`png-24`，`jpeg`，`gif`，`svg
> ```

但是上面的那些都不是面试官想要的最后答案。面试官希望听到是Webp。（是否有关注新技术，新鲜事物）

> 科普一下Webp：WebP格式，谷歌（google）开发的一种旨在加快图片加载速度的图片格式。图片压缩体积大约只有JPEG的2/3，并能节省大量的服务器带宽资源和数据空间。Facebook Ebay等知名网站已经开始测试并使用WebP格式。

在质量相同的情况下，`WebP`格式图像的体积要比JPEG格式图像小`40%`

# Canvas

## Canvas和SVG不同点

**SVG：** SVG可缩放矢量图形（Scalable Vector Graphics）是基于可扩展标记语言XML描述的2D图形的语言，SVG基于XML就意味着SVG DOM中的每个元素都是可用的，可以为某个元素附加Javascript事件处理器。在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

其特点如下：

- 不依赖分辨率
- 支持事件处理器
- 最适合带有大型渲染区域的应用程序（比如谷歌地图）
- 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
- 不适合游戏应用

**（2）Canvas：** Canvas是画布，通过Javascript来绘制2D图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制。

其特点如下：

- 依赖分辨率
- 不支持事件处理器
- 弱的文本渲染能力
- 能够以 .png 或 .jpg 格式保存结果图像
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

## 用Canvas画一个三角形

[代码](demo\Canvas画三角形.html)

``` js
var cvs = document.querySelector('#cvs').getContext('2d');
cvs.beginPath();
cvs.moveTo(100, 100);
cvs.lineTo(400, 100);
cvs.lineTo(250, 400);
cvs.closePath();
cvs.stroke();
cvs.fillStyle = 'pink';
cvs.fill();
```

# Web Worker

在 HTML 页面中，如果在**执行脚本时**，页面的状态是**不可响应**的，直到**脚本执行完成**后，页面才变成**可响应**。

**web worker 是运行在后台的 js，独立于其他脚本，不会影响页面的性能**。 并且通过 postMessage 将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程了。

如何创建 web worker：

1. 检测浏览器对于 web worker 的支持性
2. 创建 web worker 文件（js，回传函数等）
3. 创建 web worker 对象

# Websocket

如何实现浏览器内多个标签页通信

## 什么是WebSocket

参考https://juejin.cn/post/7020964728386093093

![](https://atts.w3cschool.cn/attachments/day_211012/202110121402413550.png)

HTML5新增协议，在**单个TCP连接**上进行**全双工通信**的协议

解决了HTTP的问题：服务器能够主动向客户端推送消息

特点：

（1）建立在 **TCP** 协议之上，服务器端的实现比较容易。

（2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且**握手阶段采用 HTTP 协议**，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

（3）数据格式比较轻量，性能开销小，通信高效。

（4）可以发送文本，也可以发送二进制数据。

（5）没有同源限制，客户端可以与任意服务器通信。

（6）协议标识符是`ws`（如果加密，则为`wss`），服务器网址就是 URL。

# Web存储

HTML5 提供了两种在客户端存储数据的新方法：

- localStorage - **没有时间限制**的数据存储
- sessionStorage - 针对一个 session 的数据存储

## cookie localStorage sessionStorage区别

- `cookie`是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）
- cookie数据始终在同源的http请求中携带（即使不需要），记会**在浏览器和服务器间来回传递**
- `sessionStorage`和`localStorage`不会自动把数据发给服务器，**仅在本地保存**
- 存储大小：
  - `cookie`数据大小不能超过4k
  - `sessionStorage`和`localStorage`虽然也有存储大小的限制，但比`cookie`大得多，可以达到5M或更大
- 有期时间：
  - `localStorage` 存储**持久数据**，浏览器关闭后数据不丢失除非主动删除数据
  - `sessionStorage` 数据在当前**浏览器窗口关闭后自动删除**
  - `cookie` 设置的`cookie`**过期时间之前**一直有效，即使窗口或浏览器关闭

# 离线存储

离线存储指的是：在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

**原理：**HTML5的离线存储是基于一个新建的 `.appcache` 文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示

## HTML5的离线存储如何使用

**使用方法：** （1）创建一个和 html 同名的 manifest 文件，然后在页面头部加入 manifest 属性：

```html
<html lang="en" manifest="index.manifest">
```

（2）在 `cache.manifest` 文件中编写需要离线存储的资源：

```html
CACHE MANIFEST
    #v0.11
    CACHE:
    js/app.js
    css/style.css
    NETWORK:
    resourse/logo.png
    FALLBACK:
    / /offline.html
```

- **CACHE**: 表示需要离线存储的资源列表，由于包含 manifest 文件的页面将被自动离线存储，所以不需要把页面自身也列出来。
- **NETWORK**: 表示在它下面列出来的资源只有在在线的情况下才能访问，他们不会被离线存储，所以在离线情况下无法使用这些资源。不过，如果在 CACHE 和 NETWORK 中有一个相同的资源，那么这个资源还是会被离线存储，也就是说 CACHE 的优先级更高。
- **FALLBACK**: 表示如果访问第一个资源失败，那么就使用第二个资源来替换他，比如上面这个文件表示的就是如果访问根目录下任何一个资源失败了，那么就去访问 offline.html 。

（3）在离线状态时，操作 `window.applicationCache` 进行离线缓存的操作。

**如何更新缓存：**

（1）更新 manifest 文件

（2）通过 javascript 操作

（3）清除浏览器缓存

**注意事项：**

（1）浏览器对缓存数据的容量限制可能不太一样（某些浏览器设置的限制是每个站点 5MB）。

（2）如果 manifest 文件，或者内部列举的某一个文件不能正常下载，整个更新过程都将失败，浏览器继续全部使用老的缓存。

（3）引用 manifest 的 html 必须与 manifest 文件同源，在同一个域下。

（4）FALLBACK 中的资源必须和 manifest 文件同源。

（5）当一个资源被缓存后，该浏览器直接请求这个绝对路径也会访问缓存中的资源。

（6）站点中的其他页面即使没有设置 manifest 属性，请求的资源如果在缓存中也从缓存中访问。

（7）当 manifest 文件发生改变时，资源请求本身也会触发更新。

## 浏览器是如何对 HTML5 的离线储存资源进行管理和加载？

- **在线的情况下**，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问页面 ，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。如果已经访问过页面并且资源已经进行离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，就会重新下载文件中的资源并进行离线存储。
- **离线的情况下**，浏览器会直接使用离线存储的资源。

