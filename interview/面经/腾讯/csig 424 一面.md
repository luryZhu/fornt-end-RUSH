csig 前端一面 20220424

- 面试官很注重基础知识的掌握，一直在问在学校有没有系统地学过xxx知识
- 考察：
  - 语言理解（c++ java js都问）
  - 数据结构（排序）
  - 操作系统（进程、线程通信同步）
  - 计网（tcp拥塞流量控制，http缓存）
  - 项目，看简历问（安卓：MVVM，python：说了NLP，问了CV，前端：设计模式，技术选型）


# 环境

![image-20220424165206520](.\csig\image-20220424165206520.png)

![image-20220424183801391](.\csig\image-20220424183801391.png)



没有自我介绍

学校里系统学过什么语言

- c++ python js，挖坑手写

# 手写

挖坑出了3个手写


题目(共3题)

## 反转单向链表

```
给定一个单链表，请返回反转后的链表。
如 1->2->3->4->5，反转后得到的链表为：5->4->3->2->1。
```

样例1:
> [输入]
> [1, 2, 3, 4, 5]
> [输出]
> [5, 4, 3, 2, 1]

``` js
function ListNode(val, next){
    this.val=val
    this.next=next
}

function ArrayToList(listArr){
    // 构造链表
    let head= new ListNode()
    let cur=head
    for (let i=0; i<listArr.length-1; i++){
        cur.val=listArr[i]
        cur.next=new ListNode()
        cur=cur.next
    }
    cur.val=listArr[listArr.length-1]
    cur.next=null
    return head
}

function reverseList(head){
    // 反转链表，返回反转的链表表头
    if (!head.next) return head
    let pre=head
    let cur=head.next
    pre.next=null
    let temp=null
    // a -> b ==> a <- b
    // a.next=pre
    // b.next=a
    while(cur.next){
        temp=cur.next
        cur.next=pre
        pre=cur
        cur=temp    
    }
    cur.next=pre

    return cur
}

function ListToArray(head){
    // 链表转换为数组
    let ret=[]
    while(head){
        ret.push(head.val)
        head=head.next
    }
    console.log(ret)
    // return ret
}

function showResult(arr){
    let list=ArrayToList(arr)
    // console.log(list)
    // ListToArray(list)
    let reversedList=reverseList(list)
    console.log(reversedList)
    ListToArray(reversedList)
}

showResult([1,2,3,4,5])
```

## 深度比较两个对象是否相等

编写一个 compare 方法遍历对象所有字段以比较两者是否相等，包括嵌套字段。

示例：

```javascript
const obj1 = {
  name: "John",
  address: {
    street: "Main",
    number: 123,
  },
};

const obj2 = {
  name: "John",
  address: {
    street: "Main",
    number: 123,
  },
};

const obj3 = {
  name: "John",
  address: {
    street: "main",
    number: 123,
  },
};

console.log(compare(obj1, obj2)); // true
console.log(compare(obj1, obj3)); // false
```

实现

``` js
function deepCompare(obj1, obj2){
    // 考虑null
    // 两个都为null
    if (!obj1 && !obj2) return true
    // 其中一个为null
    if (!obj1 || !obj2) return false
    // 都不为null，按key逐个比较
    for (let key in obj1){
        // console.log(key, obj1[key], obj2[key])
        if (obj1.hasOwnProperty(key)){
            if (typeof obj1[key]!=='object' || typeof obj2[key]!=='object'){
                // 其中之一为非引用类型，直接比较
                if (obj1[key]!==obj2[key]) return false
            } else {
                // 都为引用类型，递归比较
                return deepCompare(obj1[key], obj2[key])
            }
        }
    }
    return true
}

const obj1 = {
    name: "John",
    address: {
      street: "Main",
      number: 123,
    },
  };
  
const obj2 = {
name: "John",
address: {
    street: "Main",
    number: 123,
},
};

const obj3 = {
name: "John",
address: {
    street: "main",
    number: 123,
},
};
  
console.log(deepCompare(obj1, obj2)); // true
console.log(deepCompare(obj1, obj3)); // false
```

## 实现智能指针

```
在C++中经常使用智能指针来进行内存管理，请编码完成智能指针的实现。
```

不会c++写不出

问我知不知道java的引用计数

- 背书
- 要求用c++写，还是不会，寄

# 数据结构

说一下知道的排序

- 冒泡、选择、插入、快排
- 大概讲一下算法思路，讲不清就举例

# 操作系统

- 什么是线程同步 *
- 什么是进程通信，进程通信和线程通信有什么区别 *

# 计算机网络

- tcp udp区别
  - 详细说拥塞控制、流量控制 *
- http缓存
  - 背书，举例子描述协商缓存实际场景 *

# 项目

## 安卓

写了安卓项目

- 介绍实现功能，用的什么技术栈
- MVVM是自己写的吗，不是
- 安卓四个基本元素用了吗 *

## 深度学习

说下深度学习做的什么

- 介绍了NLP，情感分析
- cv，图像识别了解吗 * 
  - transformer 翻译 -> 图像

## React

说下react项目

- 需求哪来的？找的原型系统还原
- 说下实现过程中印象最深刻的内容
  - 说的下拉加载优化：技术选型的修改
    - 防抖 -> 布尔值 -> 节流优化滚动
    - 经验：根据实际场景思考技术选型

# 设计模式

知道什么设计模式：

- 发布订阅模式
- 工厂模式
- 腾讯经典设计模式，见腾讯著作：**JavaScript 设计模式与开发实践 (曾探) **

# 反问

学习建议？

- 基础知识必须掌握，要看源码

react源码怎么看，看到什么程度？

- 至少会debug，问题驱动，看源码是为了解决问题

