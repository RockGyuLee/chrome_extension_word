import React, {useState} from "react";
import styled from "styled-components";
import {Text} from "./Main"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faCheck} from "@fortawesome/free-solid-svg-icons";

const bColor = {
    mainC : "#EBDBFA",
    succC : "#C6D57E",
    failC : "#FE8F8F"
}

export const Button = styled.button`
    border : 0mm solid ${({color,theme}) => color || theme.colors.main};
    cursor: pointer;
    width : ${({width})=> width || '10vw'};
    height : ${({height})=> height || '10vh'};
    border-radius : ${({radius,theme}) => radius || undefined};
    background-color : ${({bgc,theme}) => bgc || theme.colors.btn};
    &:hover {
        background-color : ${({color,theme}) => theme.colors.main};
        div {
            color : ${({color,theme}) => theme.colors.white};
        }
    }
`

const handleSuccessClick = (setHook, obj ,text) => {
    (obj.color == bColor.mainC)
        ? setHook({
            Text: <FontAwesomeIcon icon={faCheck}/>,
            color: bColor.succC
        })
        : setHook({
            Text: text,
            color: bColor.mainC
        })
}

const handleFailClick = (setHook, obj, text) => {
    (obj.color == bColor.mainC)
        ? setHook({
            Text: <FontAwesomeIcon icon={faTimes}/>,
            color: bColor.failC
        })
        : setHook({
            Text: text,
            color: bColor.mainC
        })
}

export function MButton( {word, isCheck, text, ...props }){

    const [btnObj, setBtnObj] = useState({
        Text : text,
        color : bColor.mainC
    })

    const handleClick = (w) => {
        return (word.description == w) ? handleSuccessClick(setBtnObj,btnObj,text)  : handleFailClick(setBtnObj,btnObj, text)
    }

    return (
        <Button
            radius="12px" bgc={btnObj.color}
            onClick={handleClick.bind(null,text)}
        >
            <Text size="lmd">{btnObj.Text}</Text>
        </Button>
    )
}

export function BButton( {text, width, size="xxxl",  height, ...props }){

    const handleClick = () => {
        props.onClick();
    }

    return (
        <Button
            css={{
                "margin" : "10px",
            }}
            // className = {word.description == spanText ? 'btn-success' : 'btn-fail'}
            width={width} height={height}
            radius="12px" bgc={bColor[2]}
            onClick={handleClick}
        >
            <Text size={size}>{text}</Text>
        </Button>
    )
}