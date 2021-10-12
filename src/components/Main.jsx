import React from "react";
import styled, {css} from "styled-components";

export const calcWidthComponent = size => {
    if(!size) return;
    const width = (size / 12) * 100;
    return width;
}

const calcHeightComponent = size => {
    if(!size) return;

    const height = (size / 12 ) * 100;
    return height;
}

const EXTRA_SMALL_DEVICES = 600;
const SMALL_DEVICES = 600;
const MEDIUM_DEVICES = 768;
const LARGE_DEVICES = 992;
const EXTRA_LARGE_DEVICES = 1200;

export const ReactContainer = styled.div`
    width : ${({ lg })=> ( lg ? `${calcWidthComponent(lg)}%` : "100%")};
    height : ${({ height })=> ( height ? `${calcHeightComponent(height)}%` : "100%")};
    background-color : #FFFFFF;

    @media only screen and (max-width: ${EXTRA_SMALL_DEVICES}px){
        width : ${({ esm })=> esm && `${calcWidthComponent(esm)}%`};
    }

    @media only screen and (min-width: ${SMALL_DEVICES}px){
        width : ${({ sm })=> sm && `${calcWidthComponent(sm)}%`};
    }

    @media only screen and (min-width: ${MEDIUM_DEVICES}px){
        width : ${({ md })=> md && `${calcWidthComponent(md)}%`};
    }

    @media only screen and (min-width: ${LARGE_DEVICES}px){
        width : ${({ lg })=> lg && `${calcWidthComponent(lg)}%`};
    }

    @media only screen and (min-width: ${EXTRA_LARGE_DEVICES}px){
        width : ${({ elg })=> elg && `${calcWidthComponent(elg)}%`};
    }
`


export const Container = styled.div`
    width :  ${(props)=>props.width || "100vw"};
    height : ${(props)=> props.height || "100vh"};
`

export const TitleWord = styled.span`
    textTransform: "uppercase";
    font-size : ${({theme, size})=> theme.deskTopFontSizes[size]};
    font-family : ${({theme})=> theme.fontFamily["comic"]};
    text-decoration : underline;
`

export const Flex = styled.div`
    display : flex;
`

export const Text = styled.div`
    font-size : ${({theme, size})=> theme.fontSizes[size] || theme.deskTopFontSizes["md"]};
    font-family : 'Himelody';
`

export const Span = styled(Text)`
    color : ${({color, theme }) => theme.colors[color] };
`

export const Logo = styled.div`
    width : ${({ width })=> ( width ? `${calcWidthComponent(width)}%` : "100%")};
    height : ${({ height })=> ( height ? `${calcHeightComponent(height)}%` : "100%")};
    text-align : center;
    background-color : #E3FDFD;
    border-top-right-radius : 10px;
    border-bottom-right-radius: 10px;
    position : absolute;
    transition : 0.5s;

    @media only screen and (max-width: ${EXTRA_SMALL_DEVICES}px){
        margin-top : ${({ esm })=> esm && `${calcWidthComponent(esm)}%`};
    }

    @media only screen and (min-width: ${SMALL_DEVICES}px){
        margin-top : ${({ sm })=> sm && `${calcWidthComponent(sm)}%`};
    }

    @media only screen and (min-width: ${MEDIUM_DEVICES}px){
        margin-top : ${({ md })=> md && `${calcWidthComponent(md)}%`};
    }

    @media only screen and (min-width: ${LARGE_DEVICES}px){
        margin-top : ${({ lg })=> lg && `${calcWidthComponent(lg)}%`};
    }

    @media only screen and (min-width: ${EXTRA_LARGE_DEVICES}px){
        margin-top : ${({ elg })=> elg && `${calcWidthComponent(elg)}%`};
    }

    &:hover {
        width : ${({ width })=> ( width && `${calcHeightComponent( width + 0.05)}%`)};
    }

    
`

export const Icon = styled.div`
    margin : 5px;
    transition : 0.3s;
    cursor : pointer;

    ${Logo}:hover & {
        fill: rebeccapurple;
        margin-left : 10px;
    }
`

export const MButton = styled.button`
    border : 0mm solid ${({color,theme}) => color || theme.colors.main};
    cursor: pointer;
    width : 10vw;
    height : 8vh;
    border-radius : ${({radius,theme}) => radius || undefined};
    background-color : ${({bgc,theme}) => bgc || theme.colors.btn};
    &:hover {
        background-color : ${({color,theme}) => theme.colors.main};
        span {
            color : ${({color,theme}) => theme.colors.white};
        }
    }
`

export const TabBar = styled.div`
    position : absolute;
    height : 100%;
    border : 0.7mm solid #F6F6F6;
    transition : all 0.2s ease-in;
`