import React from "react";
import styled, {css} from "styled-components";

const calcWidthComponent = size => {
    if(!size) return;

    console.log("size",size);

    const width = (size / 12) * 100;
    return width;
}

const calcHeightComponent = size => {
    if(!size) return;

    const height = (size / 12 ) * 100;
    console.log(height);
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

export const Text = styled.span`
    font-size : ${({theme, size})=> theme.fontSizes[size] || theme.deskTopFontSizes["md"]};
    font-family : 'Himelody';
`

export const Span = styled(Text)`
    color : ${({color, theme }) => theme.colors[color] };
`

// export const Atag = styled.a`
//     text-decoration : none;
//     color : ${({theme}) => theme.colors.black}
// `

// export const Line = styled.div`
//     border : dashed 1px;
//     color : ${({theme, color})=> theme.colors[color]};
// `

// export const RadiusImg = styled.img`
//     border-radius : 5%;
// `

// export const ClickInlineli = styled.li`
//     display : inline-block;
//     cursor: pointer;
//     -webkit-transition: all 0.2s ease-in-out;
//     -moz-transition: all 0.2s ease-in-out;
//     -o-transition: all 0.2s ease-in-out;
//     transition: all 0.2s ease-in-out;
//     position: relative;
//     border: 1px solid black;
    
//     &:hover {
//         border: 1px solid red;
//         margin-left : 1%;
//         box-shadow : 10px 5px 5px red;
//     }
// `

// export const ClickDiv = styled.div`
//     cursor: pointer;
//     -webkit-transition: all 0.2s ease-in-out;
//     -moz-transition: all 0.2s ease-in-out;
//     -o-transition: all 0.2s ease-in-out;
//     transition: all 0.2s ease-in-out;
//     position: relative;
//     border: 1px solid black;
    
//     &:hover {
//         border: 1px solid red;
//         margin-left : 1%;
//         box-shadow : 10px 5px 5px red;
//     }
// `

// export const Item = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 600px;
//   width: 500px;
//   color: #fff;
//   margin: 15px;
//   font-size: 4em;
//   flex-direction : column;
//   cursor: pointer;
//   position : relative;
// `;

// export const CarouselItem = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 600px;
//     width: 600px;
//     color : black;
//     margin: 15px;
//     font-size: 4em;
//     flex-direction : column;
//     position : relative;
// `

// export const DisplayOver = styled.div({
//     height: "100%",
//     left: "0",
//     position: "absolute",
//     top: "0",
//     width: "100%",
//     border: "solid",
//     zIndex: 2,
//     backgroundColor: "transparent",
//     padding: "20px 20px 0 20px",
//     boxSizing: "border-box",
//     opacity : 1,
//     display : "grid",
//     placeItems : "center",
// });

// export const TitleWord = styled.h2({
//   textTransform: "uppercase",
//   fontSize : "18px",
//   fontFamily: "Helvetica",
// });



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