腾讯 csig 智慧出行 20220425 二面

# 项目

这部分15分钟就结束了，没讲什么

项目难点，重点，最能说的是什么

- 下拉加载技术选型 防抖->布尔值
- 细说防抖
- 细说内存泄漏

# 知识

这部分也15分钟就结束了，没讲什么

## url输入到渲染页面的过程

## 渲染html文档的优化方案

script标签 link标签放哪。。。

减少http请求次数

参考：

[HTML页面优化](https://www.cnblogs.com/xy-milu/p/6091234.html)

[理解web性能概念以及常用分析工具](https://juejin.cn/post/6946010967247421470)

- [web性能分析工具 PageSpeed Insights 和 Lighthouse 使用教程](https://juejin.cn/post/6945749072938532895)

[web性能-白屏时间详解以及优化](https://juejin.cn/post/6949054641413816328)

- [web性能-HTML和CSS优化](https://juejin.cn/post/6948597905049518093)
- [web性能-图片优化](https://juejin.cn/post/6948598374748815396)
- [web性能-字体优化](https://juejin.cn/post/6948611659720032263)
- [web性能-js优化](https://juejin.cn/post/6949042507397365796)
- [web性能-优化dom操作（重排 重绘）](https://juejin.cn/post/6948970752985169934)
- [TCP传输基本原理简述及优化](https://juejin.cn/post/6948304677432197134)

- [web性能-CDN架构介绍和优化](https://juejin.cn/post/6950825799406600199)
  - [webpack工程项目中配置第三方库的CDN，并做CDN容错](https://juejin.cn/post/6950825799406600199)

[真实用户的前端性能监控](https://juejin.cn/post/6950824230653001758)

## 做移动端和pc端界面有什么区别

- 布局适配
- 像素精度不一样，什么三倍屏 没讲清楚 *
- rem，rem是什么，和vh vw的区别？ *
- 移动端对图片大小要求不高，可以传小图……

参考：

[移动端适配及PC端适配心得总结体会(一) (可能比较全](https://juejin.cn/post/6884042902587047943)

[移动端适配及PC端适配心得总结体会(二) (可能比较全](https://juejin.cn/post/6885721051360133133)

## DOM中的图层

- 有什么图层
- 为什么有图层，没有会有什么问题

参考：

[什么 css 会新建图层？别猜了，Devtools 都写了](https://juejin.cn/post/7051926604666109988)

会导致图层创建的原因：

- 根元素
- 有 z-index 是负值的子元素
- 有 3D 转换
- position：fixed
- 与其他元素可能重叠
- will-change 样式的值为 opacity、transform、transform-style、perspective、filter、backdrop-filter 这 6 个之一

# 手写

```
"I am a dog."
->
"dog a am I."
```

要求：原地算法修改

思路：先全部反转再按单词反转

注：js的字符串是只读的，允许转换为数组原地修改

``` js
// 如需使用参数输入，请直接去掉下面注释
// const readline = require('readline');
//
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// console.log('Hello World!');

function reverse(arr, l, r){
    // console.log(l,r)
    if (r-l===0) return
    while(l<r){
        if (arr[l]!==arr[r]){
            let temp=arr[l]
            arr[l]=arr[r]
            arr[r]=temp
        }
        l++
        r--
    }
}

function sentenceReverse(str){
    if (str==="") return str
    // 获取数组
    const arr=str.split('')
    let len=arr.length
    // 判断句号
    if (arr[len-1]==='.'){
        // 有句号，不处理句号
        len--
        if (len===0){
            // 句子只有一个句号
            return str
        }
    }
    // 第一次遍历，反转所有字符
    let l=0, r=len-1
    reverse(arr, l, r)
    // console.log(arr)
    // 第二次遍历，反转每个单词
    l=0
    r=1
    while(r<len){
        // 找到第一个空格
        while(arr[r]!==" " && r<len) r++
        // god r指向god后的空格
        reverse(arr, l, r-1)
        // console.log(l,r,arr)
        l=r+1
        r=l+1
    }
    // console.log(arr)
    return (arr.join(''))
}

cases=[
    "",
    ".",
    "a",
    "a a a a a.",
    "I am a dog.",
    "I am a dog",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "hello world"
    // "         sakdhka     adhsa   .....     "
]
// let reversed=sentenceReverse("I am a dog.")
// console.log(reversed)
for (let c of cases){
    console.log(sentenceReverse(c))
}

.
a
a a a a a.
dog a am I.
dog a am I
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

