import React, { Fragment, memo, useState } from "react";

function ColorCube({color, name}){
    console.log("rerender",name);
    return (
        <div style={{margin: 10, width:100, height:100, backgroundColor: color}}></div>
    )
}

const MemoedColorCube=memo(ColorCube)

export default function LearnMemo(){
    const [renderCount,setRenderCount]=useState(0)
    const [color, setColor]=useState("red")

    console.log("component render time: ",renderCount);

    function setAndRender(color){
        setColor(color)
        setRenderCount(renderCount+1)
    }

    return (
        <Fragment>
            <p>memo的作用：和纯函数类似，包裹一个函数式组件，返回一个新组件</p>
            <p>保存上一次渲染结果，将这一次的输入和上一次作比较，改变则重新渲染，不变则保持</p>
            <p>记忆化：记忆化是一种主要用来提升计算机程序速度的优化技术方案。它将开销较大的函数调用的返回结果存储起来，当同样的输入再次发生时，则返回缓存好的数据，以此提升运算效率。</p>
            <p>渲染2次：React的刻意为之，并发模式下在dev 时render-phase会执行两次</p>
            <button onClick={()=>setAndRender("red")}>to red</button>
            <button onClick={()=>setAndRender("blue")}>to blue</button>
            {/* <ColorCube /> */}
            <ColorCube color={color} name="normal"></ColorCube>
            <MemoedColorCube color={color} name="memoed"></MemoedColorCube>
        </Fragment>
    )
}
