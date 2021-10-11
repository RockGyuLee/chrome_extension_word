import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSignInAlt, faPen } from "@fortawesome/free-solid-svg-icons";

//module imports
import { Flex, TabBar, calcWidthComponent} from "../components/Main";

const headerActive = {
    opacity : 1,
    width : `${calcWidthComponent(1.3)}%`,
    backgroundColor : "#A2D2FF",
    transition: "opacity 0.3s",
}

const headerHidden = {
    opacity : 0,
    visibility: "hidden",
    position: "absolute",
    transition: "opacity 0.3s , visibility 0.3s esay out",
}

const TagList = [
    {
        Comp : <FontAwesomeIcon icon={faSignInAlt} size={"lg"} />,
        desc : "로그인"
    },
    {
        Comp :  <FontAwesomeIcon icon={faPen} size={"lg"} />,
        desc : "단어 추가"
    }
    
   
]

const OptionTag = styled.div`
    display : flex;
    margin-top : 15%;
    margin-bottom : 15%;
    z-index : 999;
`

function HeaderTab( {isShow} ){

    return (
        <TabBar style={isShow ? headerActive : headerHidden}>
                {
                    TagList.map( item => 
                        <OptionTag>
                            <div style={{width : "30%", marginLeft : "5%"}}>
                                {item.Comp}
                            </div>
                            <div style={{width : "70%"}}>
                                {item.desc}
                            </div>
                        </OptionTag>
                    )
                }
        </TabBar>
    )
}

export default HeaderTab;