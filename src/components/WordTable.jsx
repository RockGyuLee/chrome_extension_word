import React, {useState} from "react";

//modules
import { getEngWords } from "../firebase/selecDb";
import useAsync from "../util/useAsync";
function WordTable(){

    const [state, refetch] = useAsync(getEngWords);

    console.log("state",state);

    return (
        <></>
    )
}

export default WordTable;