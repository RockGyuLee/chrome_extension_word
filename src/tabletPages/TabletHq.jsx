import React, { Fragment } from 'react';
import styled from "styled-components";
import Typed from "react-typed";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Carousel from "react-elastic-carousel";
import {faBuilding, faGamepad} from "@fortawesome/free-solid-svg-icons"

import { Container, Text, Flex } from "../components/Main";
import {strArray, skills, project} from "../desktopPages/Hq";
import CarouselBody from '../components/Carousel';

const Span = styled(Text)`
    margin-top : 5%;
    color : ${({theme }) => theme.colors.black};
`
const Inlineli = styled.li`
    display : flex;
`

const FontIconMainColor = styled(FontAwesomeIcon)`
    color :  ${({theme }) => theme.colors.main};
`

const ClickDiv = styled.div`
    cursor: pointer;
`

const Flexx = styled(Flex)`
    margin : 10%;
    flex-direction : column;
`

const Ptag = styled.p`
    font-size : ${({size, theme}) => theme.deskTopFontSizes[size]};
    color : ${({color, theme}) => theme.colors[color] || theme.colors['black']};
    margin : 5% auto;
`

function HqIntro(props){

    return(
        <Container width="auto" height="auto" css={{
            position : 'relative',
            textAlign : 'center',
            margin : '0 auto'
        }}>
            <div style={{marginTop : "5%"}}>
                <Span size="lmd"> - Skills -</Span>
                <Ptag size="smd">
                    개발 파트별로 정리한 기술 스택입니다.<br></br>
                    분야별 기술에 대하여 더 자세한 내용은 소개 페이지에서 확인이 가능합니다.
                </Ptag>
                <ul>
                    {
                        skills.map( (s,idx) => (
                            <Inlineli key={idx} css={{width : '100%'}}>
                                <div style={{display : 'block'}}>
                                    <img src={s.img} width={"200px"} height={"200px"}/>
                                    <Ptag size="md">{s.name}</Ptag>
                                </div>
                                <div style={{display : 'flex', alignItems : 'center', justifyContent : 'center', width : '100%'}}>
                                    <Ptag size="md">
                                    {
                                        s.contents.split('\n').map( (line, iidx) => (
                                            <Fragment key={iidx}>
                                            {line}<br/>
                                            </Fragment>
                                        ))
                                    }
                                    </Ptag>
                                </div>
                                
                            </Inlineli>
                        ))
                    }
                </ul>
            </div>
        </Container>
    )
}

function HqProject(props){
    return (
        <Container width="auto" height="auto" css={{
            position : 'relative',
            margin : '0 auto',
            textAlign : 'center',
            backgroundColor : '#F2F2F2'
        }}>
            <Flexx>
                <div style={{paddingTop : "1.5%"}}>
                    <Span size="lg"> - Project -</Span>
                </div>
                
                <div style={{paddingTop : "1.5%"}}>
                    <Span size="smd"> 프로젝트 별 맡은 역할과 
                    쓰인 기술과 느낀 경험들을 나열합니다.
                    </Span>
                </div>
                <Flex css={{
                    flexDirection : 'column',
                    justifyContent : "center",
                    alignItems : "center"
                }}>
                    
                    {
                        project.map( (p, idx)=> (
                            <Fragment key={idx}>
                                <Span size="lmd" css={{
                                    color : '#0f0f0f',
                                    fontWeight : 'bold'
                                }}>{p.projectTitle}
                                </Span>
                                <Container width="70vw" height="30%" 
                                    css={{display : 'flex', marginTop : '5%', marginBottom : '3%', justifyContent : "center",
                                        alignItems : "center"}}
                                >
                                    <Flex css={{
                                        flexDirection : 'column',
                                    }}>
                                        {
                                            p.items.map( (item, iidx)=> (
                                                <CarouselBody key={iidx} data={item} />
                                            ))
                                        }
                                    </Flex>
                                </Container>
                            </Fragment>
                        ))
                    }
                </Flex>
            </Flexx>
        </Container>
    )
}

function TabletHq(props){
    return(
        <div>
            <div style={{
                position : 'relative', width : "100%", height:"350px", backgroundColor : "black",
            }}>
                <div style={{float : 'right', margin : '5%', width : '50%'}}>
                    <Ptag size="xl" color="white">
                        Rlay라는 단어는 “락규가 즐거워한다.”를 <br/>
                        영어이름 + 영단어의 조합 Rock + Play 를 합친 단어입니다.<br/>
                        <br/>
                        <Typed 
                            strings = {strArray}
                            startDelay = {500}
                            typeSpeed = {100}
                            backSpeed = {50}
                            loop
                            
                        />
                    </Ptag>
                </div>
                <img style={{position : 'absolute', width : '40%'}} src='./imgs/r.png'/>
            </div>
            <HqIntro/>
            <HqProject/>
        </div>
    )
}

export default TabletHq