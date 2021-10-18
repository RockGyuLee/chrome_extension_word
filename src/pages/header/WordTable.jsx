import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSpellCheck, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

//modules
import { hover } from "../../components/Main"
import { getEngWords } from "../../firebase/selecDb";
import useAsync from "../../util/useAsync";
import WTable from "../../components/Table";
import { isUpdateDb } from "../../firebase/crud";

function WordTable(){

    const [state] = useAsync(getEngWords);
    const { loading, data = null, error } = state;
    const [items, setItems] = useState([]);

    useEffect(()=> {
        if(data === null) return;
        let list = data["word"];
        setItems(list)
    },[state])

    const updateMyData = (rowIndex, columnId, value) => {
        setItems(old => 
            old.map( (row, index)=> {
                if(index == rowIndex){
                    return {
                        ...old[rowIndex],
                        [columnId] : value,
                    }
                }
                return row
            })
        )
    }

    const handleUpdateDb = () => {
        isUpdateDb(items);
    }

    return (
        <>
            <h2 style={{width : "100%"}}>
                <FontAwesomeIcon style={hover} icon={faCartArrowDown} onClick={handleUpdateDb} size={"lg"} pull='right'/>
            </h2>
            <WTable items={items} updateMyData={updateMyData}/>
        </>
    )
}

export default WordTable;