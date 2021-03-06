import React, {useState, useEffect, Fragment} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux"

//modules
import WTable from "../../components/Table";
import { Span } from "../../components/Main";
import { showToast } from "../../PortalReducer";
import { getDataInCollectionForDB } from "../../firebase/crud";
import adminUID from "../../admin";
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
        if(addWordData.wordClass == null ) return alert("????????? ??????????????????.")
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
            <MarginSpan> ?????? </MarginSpan>
            <input onChange={handleAddWord.bind(this,"spelling")}/>
            <MarginSpan> ?????? </MarginSpan>
            <input onChange={handleAddWord.bind(this,"description")}/>
            <MarginSpan> ?????? </MarginSpan>
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
    let userInfo = useSelector( (state)=> state.userInfo);

    console.log("info",userInfo);
    // getDataInCollectionForDB()

    const [items, setItems] = useState(null);
    const dispatch = useDispatch();
    console.log('uid',adminUID);
    useEffect(()=> {
        if(userInfo.info.uid == adminUID){
            getDataInCollectionForDB("wordCollection", 'wordList').then(res=>{
                setItems(()=> [].concat(res['word']));
            })
        }   
        else if(userInfo.isLogin){
            getDataInCollectionForDB("wordCollection", userInfo.info.uid).then(res=>{
                setItems(()=> [].concat(res['word']));
            })
        }
        else{
            getDataInCollectionForDB("wordCollection", ).then(res=>{
                setItems(()=> [].concat(res['word']));
            })
        }
        
    },[])

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
                msg : "???????????? ???????????????.",
                position : "top-right"
            })
            return;
        }
        dispatch({type : "UPDATE", data : {
            wordList : items,
            toast : {
                msg : "???????????????????????????.",
                position : "bottom-center",
            }
        }, });
    }

    return (
        <Fragment>
            <h2 title="?????????" style={{width : "100%"}} >
                <FontAwesomeIcon style={iconTag} icon={faExternalLinkAlt} onClick={handleUpdate} size={"lg"} pull='right'/>
            </h2>
            <AddWrod setHook={setItems}/>
            <WTable setItemHook={setItems} items={items} updateMyData={updateMyData}/>
        </Fragment>
    )
}

export default WordTable;