import React, {useState, useEffect, Fragment} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux"
import PuffLoader from "react-spinners/PuffLoader";

//modules
import WTable from "../../components/Table";
import { Span } from "../../components/Main";
import { showToast } from "../../PortalReducer";

const iconTag = {
    cursor : "pointer",
    color : "#333333"
}

const Select = styled.select`
    width : 10vw;
`

const AddArea = styled.div`
    display : flex;
    padding : 1rem;
    width : 80%;
    height : 5%;
    background-color : #F7F6F2;
`

const MarginSpan = styled(Span)`
    margin : 0px 10px 0px 10px;
`

let throttleSpell, throttleDesc;


function AddWrod({setHook}){

    const wordClass = [{
        description : "- - - -",
        spelling : null
    }].concat(useSelector( state=>state.wordClass)['word']);


    const [refresh, setRefresh] = useState(Math.random()); 
    
    const [ addWordData, setAddWordData ] =useState({
        spelling : "",
        description : "",
        wordClass : null
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

    const handleAddWordClass = (evt) => {
        setAddWordData(Object.assign({}, addWordData, {wordClass : evt.target.value}))
    }

    const handleUpload = () => {
        if(addWordData.wordClass == null ) return alert("품사를 선택해주세요.")
        // setHook( old => old.map(i=> i).concat(addWordData));
        setHook( old => [addWordData].concat(old.map(i=>i)) );
        setAddWordData(Object.assign({},addWordData,{
            spelling : "",
            description : "",
            wordClass : null
        }))
        setRefresh(Math.random());
    }

    return (
        <AddArea key={refresh}>
            <MarginSpan> 단어 </MarginSpan>
            <input onChange={handleAddWord.bind(this,"spelling")}/>
            <MarginSpan> 설명 </MarginSpan>
            <input onChange={handleAddWord.bind(this,"description")}/>
            <MarginSpan> 품사 </MarginSpan>
            <Select onChange={handleAddWordClass}>
                {
                    wordClass.map((c, idx) => (
                        <option key={idx} value={c.spelling}>{c.description}</option>
                    ))
                }
            </Select>
            <FontAwesomeIcon onClick={handleUpload} style={{"display": "block", "margin" : "auto", "cursor" : "pointer"}} icon={faPlusCircle} size={"lg"} pull="right"/>
        </AddArea>
    )
}

function WordTable(){

    let wordDataList = useSelector( (state)=> state.data)["word"];

    const [items, setItems] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=> {
        setItems(()=>[].concat(wordDataList));
    },[])

    if(items == null) {
        return (
            <PuffLoader color={"black"} loading={true} size={100} />
        )
    }

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

    const handleUpdate = () => {
        if(items == wordDataList){
            showToast({
                msg : "영단어가 똑같습니다.",
                position : "top-right"
            })
            return;
        }
        dispatch({type : "UPDATE", data : {
            wordList : items,
            toast : {
                msg : "업데이트하였습니다.",
                position : "bottom-center",
            }
        }, });
    }

    return (
        <Fragment>
            <h2 title="업로드" style={{width : "100%"}} >
                <FontAwesomeIcon style={iconTag} icon={faExternalLinkAlt} onClick={handleUpdate} size={"lg"} pull='right'/>
            </h2>
            <AddWrod setHook={setItems}/>
            <WTable setItemHook={setItems} items={items} updateMyData={updateMyData}/>
        </Fragment>
    )
}

export default WordTable;