# useState

参考文章

[useState使用-以灯泡为例](https://segmentfault.com/a/1190000021010240###)

[源码解读](https://juejin.cn/post/7003489634994880520)

## 惰性初始化

使用场景：state的初值是由某一个函数的返回结果，直觉上可能会写成：

``` js
const [state, setState]=useState(init()) //请不要这样写
```

但是这样写会导致额外的开销：

- 函数式组件本质上是函数，在每一次重新渲染时，它的函数体就会全部重新执行一次，包括useState语句，那么本质上init就会多粗执行，如果其中涉及到开销很大的操作或是创建新对象的操作，就会造成资源大浪费

正确写法：

``` js
const [state, setState]=useState(init)
```

## state是一个快照

[React state快照详解](https://juejin.cn/post/7035501818989772836)

现象：

- setState之后打印state会发现打印出来的结果没改变