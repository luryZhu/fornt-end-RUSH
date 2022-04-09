// 1. 使用node启动
// 输入指令： node myserver.js
// 2. 使用nodemon启动，检测到更新之后会自动重启
// 输入指令： nodemon [路径]myserver.js


// 引用express
const { response } = require('express')
const { request } = require('express')
const express=require('express')

// 创建express对象
const app=express()

// 设置响应报文
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

// 可以接收任意类型的请求
// POST请求中定义了自定义header，客户端会自动发送一个OPTIONS请求
// 如果服务器不响应这个请求，就不会有后续的响应，所以在这里加上
app.all('/server',(request,response)=>{
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 允许所有自定义响应头
    response.setHeader('Access-Control-Allow-Headers','*')
    // 设置响应体
    response.send('Hello AJAX ALL')
})


// json-server页面响应
app.get('/json-server',(request,response)=>{
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 设置响应体
    // 响应一个数据，返回对象
    const data={
        name: "myjson"
    }
    // send只能接收字符串或者buffer
    // 对对象进行字符串转换
    let str=JSON.stringify(data)
    response.send(data)
})

// /ie-server页面响应
app.get('/ie-server',(request,response)=>{
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 设置响应体
    // IE会从缓存里加载，修改send不能加载新内容！需要特殊处理
    response.send('Hello AJAX GET IE5!')
})

// /delay页面响应
app.get('/delay',(request,response)=>{
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 设置响应体
    // 延迟3s响应
    setTimeout(()=>{
        response.send('Hello AJAX DELAY!')
    },3000)
    
})

// /jquery-server页面响应
app.all('/jquery-server',(request,response)=>{
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 允许所有自定义响应头
    response.setHeader('Access-Control-Allow-Headers','*')
    // 设置响应体
    let data={name: "jquery"}
    response.send(JSON.stringify(data))
    
})

// /axios-server页面响应
app.all('/axios-server',(request,response)=>{
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 允许所有自定义响应头
    response.setHeader('Access-Control-Allow-Headers','*')
    // 设置响应体
    let data={name: "axios"}
    response.send(JSON.stringify(data))
    
})

// /fetch-server页面响应
app.all('/fetch-server',(request,response)=>{
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 允许所有自定义响应头
    response.setHeader('Access-Control-Allow-Headers','*')
    // 设置响应体
    let data={name: "fetch"}
    response.send(JSON.stringify(data))
    
})

// /jsonp-server页面响应
app.all('/jsonp-server',(request,response)=>{
    // script跨域
    // 1. 不能直接返回数据，因为客户端无法解析
    // response.send('hello')
    // 2. 返回一段js代码
    // 客户端会直接执行这个代码
    // response.send('console.log("hello!")')
    // 3. 返回函数(参数)的形式，就是一个函数的调用
    // 函数本身需要在客户端定义，而参数由服务器发出
    let data={name: "jsonp"}
    let str=JSON.stringify(data)
    response.send(`handler(${str})`)
    
})

// /username-server页面响应
app.all('/username-server',(request,response)=>{
    // 检测用户名是否存在
    let data={
        exsist: 1,
        msg: "username alrady exist!"
    }
    let str=JSON.stringify(data)
    response.send(`handler(${str})`)
    
})

// /jquery-jsonp-server页面响应
app.all('/jquery-jsonp-server',(request,response)=>{
    
    let data={
        name:"lury"
    }
    let str=JSON.stringify(data)
    // 接收callback参数
    let cb=request.query.callback
    response.send(`${cb}(${str})`)
    
})

// /cors-server页面响应
app.all('/cors-server',(request,response)=>{
    
    // 设置响应头
    response.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:5500")
    response.send("hello")
    
})

// 监听端口启动服务
app.listen(8000,()=>{
    console.log('service running at: http://127.0.0.1:8000');
})