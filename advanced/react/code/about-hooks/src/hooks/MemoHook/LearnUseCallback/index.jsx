import React, { Fragment, memo, useCallback, useState } from "react";

function ColorCube({color, name}){
    console.log("rerender",name);
    return (
        <div style={{margin: 10, width:100, height:100, backgroundColor: color}}></div>
    )
}

// memo!!
const MemoedColorCube=memo(ColorCube)

export default function LearnCallBack(){
    const [renderCount,setRenderCount]=useState(0)
    const [color, setColor]=useState("red")
    // callback
    const onClickHandle=useCallback(()=>{},[])

    console.log("component render time: ",renderCount);

    function setAndRender(color){
        setColor(color)
        setRenderCount(renderCount+1)
    }

    function fun1(){}

    return (
        <Fragment>
            <p>useCallback的作用：维护一个对函数的引用</p>
            <p>主要解决传入回调函数时，每次创建一个新函数造成重新渲染的问题</p>

            <button onClick={()=>setAndRender("red")}>to red</button>
            <button onClick={()=>setAndRender("blue")}>to blue</button>
            {/* <MemoedColorCube color={color} name="new fun" onClick={fun1}></MemoedColorCube> */}
            <MemoedColorCube color={color} name="usecallback" onClick={onClickHandle}></MemoedColorCube>
        </Fragment>
    )
}
