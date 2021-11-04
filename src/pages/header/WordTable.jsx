import React, {useState, useEffect, Fragment} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faPlusCircle} from "@fortawesome/free-solid-svg-icons";

//modules
import { getEngWords } from "../../firebase/selecDb";
import useAsync from "../../util/useAsync";
import WTable from "../../components/Table";
import { isUpdateDb } from "../../firebase/crud";
import { Span } from "../../components/Main"

const iconTag = {
    cursor : "pointer",
    color : "#333333"
}

const AddArea = styled.div`
    display : flex;
    padding : 1rem;
    width : 70%;
    height : 5%;
    background-color : #F7F6F2;
`

const MarginSpan = styled(Span)`
    margin : 0px 10px 0px 10px;
`

let throttleSpell, throttleDesc;


function AddWrod({setHook}){


    const [ addWordData, setAddWordData ] =useState({
        spelling : "",
        description : ""
    });

    const handleAddWord = (type,evt) => {
        switch(type){
            case "spelling" :
                clearTimeout(throttleSpell);
                throttleSpell = setTimeout(()=> {
                    setAddWordData(Object.assign({}, addWordData, {spelling : evt.target.value}))
                }, 400);
                break;
            case "description" :
                clearTimeout(throttleDesc);
                throttleDesc = setTimeout(()=> {
                    setAddWordData(Object.assign({}, addWordData, {description : evt.target.value}))
                }, 400);
                break;
        }
        
    }

    const handleUpload = () => {
        setHook( old => old.map(i=> i).concat(addWordData))
    }

    return (
        <AddArea>
            <MarginSpan> 단어 </MarginSpan>
            <input onChange={handleAddWord.bind(this,"spelling")}/>
            <MarginSpan> 설명 </MarginSpan>
            <input onChange={handleAddWord.bind(this,"description")}/>
            <FontAwesomeIcon onClick={handleUpload} style={{"display": "block", "margin" : "auto", "cursor" : "pointer"}} icon={faPlusCircle} size={"lg"} pull="right"/>
        </AddArea>
    )
}

function WordTable( {setUpdateHook} ){

    const [state] = useAsync(getEngWords);
    const { loading, data = null, error } = state;
    const [items, setItems] = useState([]);

    useEffect(()=> {
        if(data === null) return;
        let list = data["word"];
        setItems(list);
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
        if(items == data["word"]){
            alert("영단어가 똑같습니다.");
            return;
        }
        isUpdateDb(items);
        setUpdateHook(true);
    }

    return (
        <Fragment>
            <h2 title="업로드" style={{width : "100%"}} >
                <FontAwesomeIcon style={iconTag} icon={faExternalLinkAlt} onClick={handleUpdateDb} size={"lg"} pull='right'/>
            </h2>
            <AddWrod setHook={setItems}/>
            <WTable items={items} updateMyData={updateMyData}/>
        </Fragment>
    )
}

export default WordTable;