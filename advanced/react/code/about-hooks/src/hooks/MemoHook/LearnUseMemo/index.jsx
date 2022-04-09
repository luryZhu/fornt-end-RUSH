import React, { Fragment, memo, useMemo, useState } from "react";

function ColorCube({params}){
    console.log("rerender",params.name);
    return (
        <div style={{margin: 10, width:100, height:100, backgroundColor: params.color}}></div>
    )
}

// 法1：直接memo，每次传入的其实是新对象，引用值变了，所以每次都会重新渲染
const MemoedColorCube=memo(ColorCube)
// 法2：memo第二个参数，比较输入的变化
const MemoedColorCubeWithCallback=memo(ColorCube, (prev,next)=>{
    return prev.params.color===next.params.color
})

export default function LearnUseMemo(){
    const [renderCount,setRenderCount]=useState(0)
    const [color, setColor]=useState("red")
    // 法3：useMemo，监听state变化，state变了才改变参数的值
    // 维护了引用
    const params=useMemo(()=>{return {color, name: "useMemo"}}, [color])

    console.log("component render time: ",renderCount);

    function setAndRender(color){
        setColor(color)
        setRenderCount(renderCount+1)
    }

    return (
        <Fragment>
            <p>useMemo的作用：可以解决memo无法比较引用数据类型值的问题</p>
            <p>区别在于：第二个参数传入依赖项</p>

            <button onClick={()=>setAndRender("red")}>to red</button>
            <button onClick={()=>setAndRender("blue")}>to blue</button>
            {/* <MemoedColorCube params={{color, name:"memoed"}}></MemoedColorCube> */}
            {/* <MemoedColorCubeWithCallback params={{color, name:"memo with callback"}}></MemoedColorCubeWithCallback> */}
            <MemoedColorCube params={params}></MemoedColorCube>
        </Fragment>
    )
}
