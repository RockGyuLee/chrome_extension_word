import React, {useState, useEffect} from "react";

//modules
import { getEngWords } from "../../firebase/selecDb";
import useAsync from "../../util/useAsync";
import WTable from "../../components/Table";

function WordTable(){

    const [state, refetch] = useAsync(getEngWords);
    const { loading, data = null, error } = state;
    const [items, setItems] = useState([]);


    useEffect(()=> {
        if(data === null) return;
        let list = data[0];
        setItems(list)
    },[state])


    return (
        <WTable items={items}/>
    )
}

export default WordTable;