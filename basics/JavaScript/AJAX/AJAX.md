# AJAX介绍

Asynchronous JavaScript and XML 

JavaScript执行异步网络请求

在不重载整个网页的情况下，AJAX 通过后台加载数据，并在网页上进行显示

通过 AJAX 可以在浏览器中向服务器发送异步请求，最大的优势：**无刷新获取数据**

AJAX 的优点 

1) 可以**无需刷新**页面而与服务器端进行通信。 
2) 允许你根据用户事件来更新部分页面内容。 

AJAX 的缺点 

1) 没有浏览历史，不能回退 
2) 存在跨域问题(同源) 
3) SEO 不友好



小问题：

chrome查看HTTP请求报文和响应报文

1. F12 -> Network -> 选中Name中的一个链接 -> 会显示Headers Response

2. Headers 中列出了Response Headers 和 Request Headers

3. 可以点击view source查看原始报文，如果没有这个选项，[参考](https://www.cnblogs.com/FengZeng666/p/15607793.html)，在Headers那一栏右键显示Protocal，只右HTTP1.1的链接可以显示view source



# AJAX请求

## 原生AJAX

### 客户端

XMLHttpRequest对象

四步走

``` js
// 1. 创建对象
const xhr=new XMLHttpRequest()
// 2. 初始化，设置请求方法和url
xhr.open('GET','http://127.0.0.1:8000/server')
// 3. 发送
xhr.send()
// 4. 事件绑定，处理服务端返回的结果
xhr.onreadystatechange=function(){
    if(xhr.readyState===4){
        // 判断响应状态码
        if(xhr.status>=200 && xhr.status<300){
            // 处理结果
            res.innerHTML=xhr.response
        }
    }
}
```

### 服务器

服务器端插件：nodenom，可以在检测到服务器代码改变时自动重启服务器

使用express框架搭建服务器

``` js
// 1. 引用express
const { response } = require('express')
const { request } = require('express')
const express=require('express')

// 2. 创建express对象
const app=express()

// 3. 设置响应报文
// /server页面响应
app.get('/server',(request,response)=>{
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 设置响应体
    response.send('Hello AJAX GET!')
})

app.post('/server',(request,response)=>{
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 设置响应体
    response.send('Hello AJAX POST!')
})

// 4. 监听端口启动服务
app.listen(8000,()=>{
    console.log('service running at: http://127.0.0.1:8000');
})
```

## JQuery AJAX

引入JQuery依赖：可以在bootcdn上查找https://www.bootcdn.cn/jquery/

``` html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
```

文档：https://jquery.cuishifeng.cn/

## axios

文档：https://www.axios-http.cn/docs/intro

bootcdn上的比较快

``` html
<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.26.0/axios.min.js"></script>
```

### fetch

https://developer.mozilla.org/zh-CN/docs/Web/API/fetch#%E8%AF%AD%E6%B3%95

# 跨域

同源： 协议、域名、端口号 必须完全相同。 

违背同源策略就是跨域。

AJAX默认同源策略



## 解决跨域

### JSONP 

野路子

借助页面的script标签完成跨域

### CORS

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS

CORS（Cross-Origin Resource Sharing），跨域资源共享。CORS 是官方的跨域解决方 案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持 get 和 post 请求。跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些 源站通过浏览器有权限访问哪些资源 

 CORS 怎么工作的？ CORS 是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应 以后就会对响应放行

在服务器端的服务响应函数中：

``` js
app.all('/server',(request,response)=>{
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 允许所有自定义响应头
    response.setHeader('Access-Control-Allow-Headers','*')
    // 允许所有请求方法GET，POST...
    response.setHeader('Access-Control-Allow-Methods','*')
    // 设置响应体
    response.send('Hello AJAX ALL')
})
```

