import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSpellCheck, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

//module imports
import { TabBar, calcWidthComponent, hover, H1UnLine} from "../../components/Main";
import CustomModal from "../../components/Modal";
import WordTable from "./WordTable";

const headerActive = {
    width : `${calcWidthComponent(1.3)}%`,
    backgroundColor : "#E3FDFD",
    left : "0px",
    transition: "0.5s ",
}

const headerHidden = {
    position: "absolute",
    overflow: "hidden",
    left : "-200px",
    transition: "0.5s",
}

const TagList = [
    {
        Comp : <FontAwesomeIcon icon={faSignInAlt} size={"lg"} />,
        desc : "로그인"
    },
    {
        Comp :  <FontAwesomeIcon icon={faSpellCheck} size={"lg"} />,
        desc : "단어 목록"
    }
]

const OptionTag = styled.div`
    display : flex;
    margin-top : 20%;
    margin-bottom : 20%;
    z-index : 1;
    cursor : pointer;
`

let updateTimeId;

function HeaderTab( {isShow} ){

   const [modalState, setModalState ] = useState({
        isOpen : false,
        data : {}
   });

   const openModal = (idx) => {
       setModalState(Object.assign({}, {
            isOpen : true,
            data : {
                hText : TagList[idx].desc
            }
       }));
   }

   const closeModal = () => {
       setModalState(Object.assign({}, {
            isOpen : false,
            data : {}
       }));
   }

    return (
        <TabBar style={isShow ? headerActive : headerHidden}>
                {
                    TagList.map( (item, index) => 
                        <OptionTag key={index} onClick={openModal.bind(null, index)}>
                            <div style={{width : "30%", marginLeft : "5%", color : "#222831"}}>
                                {item.Comp}
                            </div>
                            <div style={{width : "70%", color : "#222831"}}>
                                {item.desc}
                            </div>
                        </OptionTag>
                    )
                }
                <CustomModal isOpen={modalState.isOpen} headerText={modalState.data.hText} closeModal={closeModal}>
                    {
                        modalState.data.hText == "단어 목록" ? <WordTable/> : <>Test</>
                    }
                </CustomModal>
        </TabBar>
    )
}

export default HeaderTab;