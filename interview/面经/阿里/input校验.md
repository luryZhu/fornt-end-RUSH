有多个 input 输入框，需要通过 JavaScript 实现错误检测逻辑，实时监控 input 的输入，当出现错误时输出错误提示。
需要检测如下 3 种错误信息：

1. 输入内容为空，输出错误信息 empty
2. 输入内容和其他输入框内容重复，所有重复的输入框都输出错误信息 duplicate
3. 输入内容长度超过 10，输出错误信息 overlength



``` js
const eleInputs=document.getElementsByTagName('input')
const eleSpans=document.getElementsByTagName('span')
let len=eleInputs.length
let arrVal=new Array(len).fill("")

function checkInput(i, val){
    if (val===""){
        eleSpans[i].innerText="empty"
        return
    }
    if (val.length>10){
        eleSpans[i].innerText="overlength"
        return
    }
    let count=0
    arrVal.forEach((value,index)=>{
        if (index!==i && value===val){
            console.log("duplicates",i,index);
            eleSpans[index].innerText="duplicated"
            count++
        }
    })
    if (count>0) {
        eleSpans[i].innerText="duplicated"
        arrVal[i]=val
        return
    }
    arrVal[i]=val
    console.log(arrVal);
    eleSpans[i].innerText=""
}

for (let i=0;i<eleInputs.length;i++){
    eleInputs[i].onblur=function(e){
        let val=e.target.value
        checkInput(i,val)
    }
}
```

