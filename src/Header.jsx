import React, {useState, Fragment} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {Text, Container, Flex} from "./components/Main";

const categoryList = [
    {
        displayName : "소개",
        path : '/intro',
    },{
        displayName : "프로젝트",
        path : '/project',
    },{
        displayName : "블로그",
        path : '/blog',
    },{
        
        displayName : "깃허브",
        path : '/github',
    }
]

const MobileContainer = styled(Container)`
    display : flex;
    align-items: center; 
`

const LinkTag = styled(Link)`
    text-decoration : none;
    color : ${({theme}) => theme.colors.main}
`

const Dropdown = styled.div`
    position: relative;
`

const DropdownList = styled.div`
    display : inline-block;
    right : 0px;
    position: absolute;
    border : 3px solid black;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    margin-right : 5%;
    margin-top : 10px;
    padding: 10px 5px;
    z-index: 99;
`

const HyperText = styled(Text)`
    cursor: pointer;
    &:hover {
        color : gold;
    }
`

function HeaderList({datas}){

    const moveToGithub = () => {
        window.open("https://github.com/RockGyuLee")
    }

    return(
        <div style={{    display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            {
                datas.map((item, idx) => {
                   return(
                    <LinkTag key={idx} to={item.path}>
                        {
                            item.displayName == '깃허브'
                            ? 
                            <HyperText size="md" onClick={moveToGithub}
                            css={{marginRight : "60px"}}
                            >
                                {item.displayName}
                            </HyperText>
                            :
                            <HyperText size="md"
                            css={{marginRight : "60px"}}
                            >
                                {item.displayName}
                            </HyperText>
                            
                        }
                    </LinkTag>
                   ) 
                })
            }
        </div>
    )
}

function HeaderTableOrMobileList({datas}){
    const [isPagelistShow, setIsPagelistShow] = useState(false);
    console.log("is",isPagelistShow);

    const moveToGithub = () => {
        //https://github.com/RockGyuLee
        window.open("https://github.com/RockGyuLee")
    }

    return (
        <Dropdown style={{display : 'inline-block',  width : "80%"}}>
            <Flex css={{justifyContent : 'flex-end' , marginRight : '5%'}} onClick={()=> setIsPagelistShow(!isPagelistShow)}>
                { isPagelistShow ?  <FontAwesomeIcon icon={faTimes} size={"lg"}/> : <FontAwesomeIcon icon={faBars} size={"lg"}/> }
            </Flex>
                {
                    isPagelistShow && 
                    <DropdownList>
                        {
                            datas.map((item, idx) => {
                            return(
                                <Fragment key={idx}>
                                    {
                                        item.displayName == '깃허브'
                                        ? <Container width="100%" height="100%" css={{borderBottom : "solid 2px", marginBottom : "10px", paddingBottom : "2px"}}>
                                                    <HyperText size="md"
                                                        onClick={moveToGithub}
                                                        css={{marginRight : "5px"}}
                                                    >
                                                        {item.displayName}
                                                    </HyperText>
                                          </Container>
                                        : <Container width="100%" height="100%" css={{borderBottom : "solid 2px", marginBottom : "10px", paddingBottom : "2px"}}>
                                            <LinkTag key={idx} to={item.path}>
                                                <HyperText size="md"
                                                    css={{marginRight : "5px"}}
                                                >
                                                    {item.displayName}
                                                </HyperText>
                                            </LinkTag>
                                        </Container>
                                    }
                                </Fragment>
                                
                            ) 
                            })
                        }
                    </DropdownList>
                }
        </Dropdown>
        
    )
}

function Header(props){
    return(
        <Container height={props.height} css={{position : "fixed", backgroundColor : 'white', top : 0, zIndex : 99,  margin : "0 auto", borderBottom : "solid 1px #eee"}}>
            <Flex css={{position : "absolute", top : "50%", transform : "translateY(-50%)"}}>
                <LinkTag to={"/"} css={{width : "10vw"}}>
                    <HyperText size={"hd"} css={{margin : "0px 0px 0px 10px"}}>Rlay</HyperText>
                </LinkTag>
                <HeaderList datas={categoryList} />
            </Flex>
        </Container>
    )
}

export function HeaderTableOrMobile(props){
    return (
        <MobileContainer height={props.height} css={{position : "relative", margin : "0 auto", borderBottom : "solid 1px #eee"}}>
            <div style={{width : "20%"}}>
                <LinkTag to={"/"} >
                    <HyperText size={"hd"} css={{margin : "0px 0px 0px 10px"}}>Rlay</HyperText>
                </LinkTag>
            </div>
            <HeaderTableOrMobileList datas={categoryList}/>
        </MobileContainer>
    )
}

export default Header