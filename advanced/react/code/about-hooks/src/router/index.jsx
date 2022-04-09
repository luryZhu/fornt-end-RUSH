import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StateHook from "../hooks/StateHook";
import MemoHook from "../hooks/MemoHook";

const AppRouter=()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <StateHook /> }></Route>
                <Route path="/memo" element={ <MemoHook /> }></Route>
            </Routes>
            
        </BrowserRouter>
    )
}

export default AppRouter