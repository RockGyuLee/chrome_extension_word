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
import { getDataInCollectionForDB } from "../../firebase/crud";

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

    const wordClass = useSelector( state=>state.wordClass);

    console.log("word",wordClass);
    
    const [ addWordData, setAddWordData ] =useState({
        spelling : "",
        description : "",
        wordClass : ""
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
        setHook( old => old.map(i=> i).concat(addWordData));
        setAddWordData(Object.assign({},{
            spelling : "",
            description : "",
            wordClass : ""
        }))
    }

    return (
        <AddArea>
            <MarginSpan> 단어 </MarginSpan>
            <input onChange={handleAddWord.bind(this,"spelling")}/>
            <MarginSpan> 설명 </MarginSpan>
            <input onChange={handleAddWord.bind(this,"description")}/>
            <MarginSpan> 품사 </MarginSpan>
            {/* <select>
                {
                    wordClass.map(c=> (
                        <option>{c.}</option>
                    ))
                }
            </select> */}
            <FontAwesomeIcon onClick={handleUpload} style={{"display": "block", "margin" : "auto", "cursor" : "pointer"}} icon={faPlusCircle} size={"lg"} pull="right"/>
        </AddArea>
    )
}

function WordTable( {setUpdateHook} ){

    let wordDataList = useSelector( (state)=> state.data)["word"];
    
    const [items, setItems] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=> {
        setItems(wordDataList)
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
            // alert("영단어가 똑같습니다.");
            showToast({
                msg : "영단어가 똑같습니다.",
                position : "top-right"
            })
            return;
        }
        // setUpdateHook(true);
        setUpdateHook(true);
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