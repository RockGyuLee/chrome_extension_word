import react, {useState, useLayoutEffect} from "react";
import styled from "styled-components";

//modules
import { Text } from "./Texts";

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

// 정답인 버튼 클릭.
let getTrueValue = (d, hook) => {
    hook((oldState)=>({
        ...oldState,
        btnColor : _btnColor.succ,
        textColor : _txtColor.succ
    }))
    return 1;
}

// 정답이 아닌 버튼 클릭.
let getFalseValue = (d, hook) => {

    hook((oldState)=>({
        ...oldState,
        btnColor : _btnColor.fail,
        textColor : _txtColor.fail
    }))

    setTimeout(()=>{
        hook((oldState)=>({
            ...oldState,
            btnColor : _btnColor.default,
            textColor : _txtColor.default
        }))
    }, 2 * 1000)

    return 0;
}

export function CheckBtn({corIdx, showWord, data, onClick}){

    let [ settingsValue, setValue ] = useState({
        btnColor : _btnColor.default,
        textColor : _txtColor.default,
        text : data.CONTANTS
    })

    useLayoutEffect(()=>{
        if( corIdx != 0) return;
        setValue((oldState)=>({
            ...oldState,
            btnColor : _btnColor.default,
            textColor : _txtColor.default,
        }))
    }, [corIdx])

    const handleClick = () => {
        let getValueHandler = showWord.CONTANTS == data.CONTANTS 
            ? getTrueValue
            : getFalseValue
        let check = getValueHandler(data, setValue)
        onClick(check)
    }

    return (
        <Button bgColor={settingsValue.btnColor} onClick={handleClick}>
            <Text color={settingsValue.textColor} size={"2rem"}>
                {settingsValue.text}
            </Text>
        </Button>
    )
}


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