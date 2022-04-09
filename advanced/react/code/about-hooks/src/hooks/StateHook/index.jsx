import React, { Fragment, useState, useRef, useEffect } from 'react'

/**
 * 理解useState，函数体里定义的值和state有什么区别
 * @returns 
 */
const StateHook=()=>{
    const [count, setCount]=useState(0)
    const countRef=useRef()
    const domRef=useRef()
    let myName="重新渲染"

    useEffect(()=>{
        countRef.current=count
        // console.log("countRef: ",countRef.current);
    },[count])

    function addCountHandler(){
        // setCount(count++)
        setCount(count+1)
        // 虽然在这里先setCount了，但是读到的count还是上一次的值
        // console.log("count: ",count);
        
        // 目前还没有触发重新渲染，使用myName还是原来的值
        console.log(myName)
    }

    function changeMyName(e){
        myName=e.target.value
        console.log(myName);
    }

    function showHandler(){
        
        setTimeout(()=>{
            console.log(domRef.current.value);
            console.log("count: ",count);
            console.log("countRef: ",countRef.current);
        },3000)
    }

    return (
        <Fragment>
            <p>每一次重新渲染组件，都会重新执行整个函数式组件，useState内部把state变成了一个const值，不能直接修改</p>
            <p>直接修改会报错：index.jsx:8 Uncaught TypeError: Assignment to constant variable.</p>
            <h1>count:{count}</h1>
            <h1>name:{myName}</h1>
            <button onClick={addCountHandler}>addCount</button>
            <button onClick={showHandler}>show</button>
            <input ref={domRef} type="text" name="myName" id="myName" onBlur={changeMyName}/>
        </Fragment>
    )
}

export default StateHook