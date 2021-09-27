import React, {useState, Fragment} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

import {CarouselItem, Span, DisplayOver, BigTitle, MButton} from "./Main";

const LinkTag = styled(Link)`
    text-decoration : none;
    color : ${({theme}) => theme.colors.main}
`

function CItem({data, opacity}){
    return(
        <Fragment>
            <img src={data.img} height="70%" style={{opacity : opacity}}/>
            <Span size="smd" css={{paddingTop : '10%', opacity : opacity}}>제목 : {data.name}</Span>
            <Span size="smd" css={{marginTop : '1%', opacity : opacity}}> 날짜 : {data.date}</Span>
            <Span size="smd" css={{paddingBottom : '5%', opacity : opacity}}> 스킬 : {data.skill}</Span>
        </Fragment>
    )
}

function Overlay({data, display}){

    const handlePageSwitch = () => {
        window.location.href = '/project'
    }

    return (
        <DisplayOver css={{display : display}}>
            <BigTitle>
                {
                    data.contents.split('\n').map(( line , idx) => (
                        <Fragment key = {idx}>
                            {
                                line == "<b>more</b>" 
                                ? <MButton>
                                    <LinkTag to={'/project'}>
                                        <Span size="sm">더보기..</Span>
                                    </LinkTag>
                                    </MButton>  
                                : <Fragment>
                                    { line }<br/>
                                  </Fragment>
                            }
                        </Fragment>
                    ))
                }
            </BigTitle>
        </DisplayOver> 
    )
}

function CarouselBody({data}){

    const [mouseIn, setMouseIn] = useState(false);

    const changeMouseInTrue = () => {
        setMouseIn(true);
    };

    const changeMouseInFalse = () => {
        setMouseIn(false);
    };

    return (
        <CarouselItem onMouseEnter={changeMouseInTrue} onMouseLeave={changeMouseInFalse}>
            <CItem data={data} opacity={ mouseIn ? 0.3 : 1 }/>
            <Overlay data={data} display={ mouseIn ? "grid" : "none" }/>
        </CarouselItem>
    )
}

export default CarouselBody;