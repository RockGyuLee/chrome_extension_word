import react, {useState, useLayoutEffect} from "react";
import styled from "styled-components";

//modules
import { Text } from "./Texts";

export const Button = styled.button`
    background-color : ${(props)=> props.bgColor || "#fffff"};
    border : 0px;
    border-radius : .25rem;
    padding-left : 1rem;
    padding-right : 1rem;
    font-weight : 700;
    cursor : pointer;
    margin : 2rem;
`

const _btnColor = {
    default : "#EBDBFA",
    succ : "white",
    fail : "#FE8F8F"
}

const _txtColor = {
    default : "black",
    succ : "#a62efd",
    fail : "white"
}

export function CheckBtn({selIdx, idx, answerIdx, answerValue, data, onClick}){


    let [ settingsValue, setValue ] = useState({
        btnColor : _btnColor.default,
        textColor : _txtColor.default,
        text : data.CONTENTS
    })

    useLayoutEffect(()=>{

        if( (selIdx === answerIdx) && (selIdx == idx) ) {
            setValue({
                btnColor : _btnColor.succ,
                textColor : _txtColor.succ,
                text : data.CONTENTS
            })
        } 
        else if(selIdx == idx){
            setValue({
                btnColor : _btnColor.fail,
                textColor : _txtColor.fail,
                text : data.CONTENTS
            })
        } else {
            setValue({
                btnColor : _btnColor.default,
                textColor : _txtColor.default,
                text : data.CONTENTS
            })
        }
      
    }, [selIdx])

    const handleClick = () => {
       
        onClick(idx)
    }

    return (
        <Button bgColor={settingsValue.btnColor} onClick={handleClick}>
            <Text color={settingsValue.textColor} size={"2rem"}>
                {settingsValue.text}
            </Text>
        </Button>
    )
}

