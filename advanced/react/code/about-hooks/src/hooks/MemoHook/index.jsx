import React, { Fragment } from "react";
import LearnMemo from "./LearnMemo";
import LearnUseMemo from "./LearnUseMemo";
import LearnCallBack from "./LearnUseCallback";

export default function MemoHook(){
    return (
        <Fragment>
            <LearnMemo></LearnMemo>
            <LearnUseMemo></LearnUseMemo>
            <LearnCallBack></LearnCallBack>
            
        </Fragment>
    )
}