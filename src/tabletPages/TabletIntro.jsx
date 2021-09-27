import React, {Fragment } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling, faQuestionCircle, faCode , faHandshake} from "@fortawesome/free-solid-svg-icons"

import {Container, Text, Line, Flex, Atag} from '../components/Main';
import {skills} from "../desktopPages/Hq";
import {year, rlay, blogText} from "../desktopPages/Intro";

const Span = styled(Text)`
    color : ${({color, theme }) => theme.colors['black'] || theme.colors.main};
`

const FontIconMainColor = styled(FontAwesomeIcon)`
    color :  ${({theme }) => theme.colors.main};
`

const AAtag = styled(Atag)`
    & : hover {
        color : gold;
    }
`

const CircleDiv = styled.div`
    display : grid;
    place-items : center;
    background-color : #F2F2F2;
    width : 100px;
    height : 100px;
    border-radius : 45px;
    margin:0 auto;
    font-size : ${({size, theme})=> theme.fontSizes[size]};
    vertical-align:middle;
`

const Ul = styled.ul`
    margin-block-end : 2%;
    margin-inline-start : 5%;
    margin-inline-end : 5%;
`

const Inlineli = styled.li`
    display : inline-block;
`

const Title = styled.h3`
    color : ${({theme }) => theme.colors.main};
`

const myInfo = [
    {
        Icon : <FontIconMainColor icon = {faSeedling} size={"3x"}/>,
        contents : '주니어\n개발자',
        msg : `사회에 나온지  ${year - 2019}년 밖에 안되는 새내기 개발자입니다. 
            내가 꿈꾸는 것을 실현시키는 직업의 매력에 빠져서 개발자의 길을 걷게되었습니다.`
    },
    {
        Icon : <FontIconMainColor icon = {faQuestionCircle} size={"3x"}/>,
        contents : '문제 해결 및\n과정',
        msg : `코딩뿐만이 아니라 사회를 살아가다보면 다양한 문제들을 마주하게 됩니다. 
            해당 문제에 최고의 해결방법을 찾으려고 노력합니다. 또한
            문제를 해결하는 방법에만 몰두하는게 아닌 해결에 도출되기까지의 과정도 중요시하게 생각합니다.`
    },
    {
        Icon : <FontIconMainColor icon = {faCode} size={"3x"}/>,
        contents : 'Dynamic한\n언어',
        msg : `Java로 처음 프로그래밍을 시작하여 객체 지향 프로그래밍에 대해서 알게되었습니다. 
            Java로 기본초석을 다지며 다양한 Toy프로젝트들을 진행했습니다. 
            현재는 JavaScript를 공부하고 있으며, 다양한 라이브러리 · FrontEnd에 관심을 많이 가지고 있습니다.`
    },
    {
        Icon : <FontIconMainColor icon = {faHandshake} size={"3x"}/>,
        contents : '서로의 신뢰와\n협업',
        msg : `무엇을 하던지 혼자서 하기란 지치고 매우 힘이 듭니다. 
            서로를 신뢰하고 믿어야 더 좋은 협업이 가능하고 그 결과는 좋은 제품이 나온다고 생각하고 있습니다.`
    }
]

// iconComp 아이콘, contents : 내용
function LiCircle({iconComp, contents}){
    return(
        <Inlineli css={{width : '25%'}}>
            <CircleDiv>
                {iconComp}
                <div>
                    {contents.split('\n').map((line, idx) => (
                        <Fragment key={idx}>
                            {line}<br/>
                        </Fragment>
                    ))}
                </div>
            </CircleDiv>
        </Inlineli>
    )
}

function Intro(props){
    return(
        <Container width="auto" height="auto" css={{
            margin : '2% 7%',
            display : 'flex',
            flexDirection : 'column'
        }}>
            <Span size="subTitleSize" css={{marginTop : '1%'}}> 
                다양한 경험을 하고 모든 일에 즐길 줄 아는 사람이 되기 위해서 노력하는<br/>
                개발자 이락규입니다.
            </Span>
            <Line css={{marginTop : '1.5%'}} color="backG"/>      
            <Span size="xxxl" css={{marginTop : '2%'}}>#나의 4가지 Point</Span>
            <Span size="xxl" css={{marginTop : '1%'}}>나를 표현할 수 있는 핵심 키워드 4가지에 대하여 이야기해봐요!</Span>
            <Container width="auto" height="20%" css={{
                position : 'relative',
                textAlign : 'center',
                marginTop : '3%'
            }}>
                <Ul>
                {
                    myInfo.map( (item, idx) => (
                        <LiCircle key={idx} iconComp={item.Icon} contents={item.contents} />
                    ))
                }
                </Ul>
            </Container>
            {
                myInfo.map((item, idx)=> (
                    <Container key={idx} width="100%" height="auto" css={{display : 'flex', marginTop : "3%"}}>
                        <Container width="15%" height="auto">
                            <Span size="xl">
                                {item.contents} :
                            </Span>
                        </Container>
                        <Container width="80%" height="auto">
                            <Span size="xl">
                                {item.msg}
                            </Span>
                        </Container>
                    </Container>
                ))
            }
            <Line css={{marginTop : '1.5%'}} color="backG"/>
            <Span size="xxxl" css={{marginTop : '2%'}}> 
                #기술 스택
            </Span>
            <Span size="xxl" css={{marginTop : '1%'}}>
                실무에서 사용하여 프로젝트를 진행한 기술들과 다양한 Toy프로젝트를 통해서 배워나간 기술들을 나열합니다.<br/>
                또한, 기술들의 설명을 제 느낌으로 간단하게 적었습니다.
            </Span>
            <Flex css={{flexDirection : 'column'}}>
                {
                    skills.map( (skill, idx)=> (
                        <Container key={idx} width="100%" height="auto" css={{display : 'flex', marginBottom : '3%'}}>
                            <Container width="30%" height="auto" css={{
                                display : 'grid',
                                placeItems: 'center'
                            }}>
                                <img src={skill.img} width={"200px"} height={"200px"}/>
                                <Title>{skill.name}</Title>
                            </Container>
                            <Ul css={{display : 'flex', flexWrap : 'wrap', width : "100%"}}>
                                {
                                    skill.intro.map( (item, iidx) => (
                                        <Inlineli key ={iidx} css={{display : 'flex', width : '50%', marginTop : '2%', marginRigth : '2%'}}>
                                            <div css={{display : 'grid', placeItems : 'center'}}>
                                                <img src={item.img}/>
                                            </div>
                                            <div css={{marginLeft : "5%", paddingRight : "5%"}}>
                                                <Span size="xxxl">{
                                                    item.name
                                                }</Span>
                                                <br/>
                                                <Span size="xl">{
                                                    item.text.split('\n').map( (line , iiidx) => (
                                                        <Fragment key={iiidx}>
                                                            {line}<br/>
                                                        </Fragment>
                                                    ))
                                                }</Span>
                                            </div>
                                        </Inlineli>
                                    ))
                                }
                            </Ul>
                        </Container>
                    ))
                }
            </Flex>
            <Line css={{marginTop : '1.5%'}} color="backG"/>
            <Span size="xxxl" css={{marginTop : '2%'}}>#그래서 Rlay 너 정체가 뭐야?</Span>
            <Span size="xxl" css={{marginTop : '1%'}}>
                <AAtag target="_blank" href="https://m.blog.naver.com/PostList.nhn?blogId=rmfoszld" title="클릭하면 블로그를 구경하실 수 있어요!">
                    - 기억보다는 기록을 남기려고 블로그에서도 놀고 있어요!
                </AAtag>
            </Span>
            <Span size="xl" css={{marginTop : '1%', paddingLeft : '1%'}}>
                {blogText}
            </Span>
            <Span size="xxl" css={{marginTop : '1%'}}>
                - 살다보면 저와 생각이 다른 분들도 많이 있죠. 저는 3가지를 중점으로 살아가고 있습니다.
            </Span>
            {
                rlay.map((item, idx)=> (
                    <Container key={idx} width="100%" height="auto" css={{display : 'flex', marginTop : "1%",  paddingLeft : '1%'}}>
                        <Container width="5%" height="auto">
                            <Span size="xl">
                                {item.title} :
                            </Span>
                        </Container>
                        <Container width="80%" height="auto">
                            <Span size="xl">
                                {item.text}
                            </Span>
                        </Container>
                    </Container>
                ))
            }
        </Container>
    )
}

export default Intro