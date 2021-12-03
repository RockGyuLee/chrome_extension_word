import React, {Fragment, useEffect, useState} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSpellCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import {useSelector ,useDispatch} from "react-redux";


//module imports
import { TabBar, calcWidthComponent, hover, H1UnLine} from "../../components/Main";
import CustomModal from "../../components/Modal";
import WordTable from "./WordTable";
import Login from "./login/Login";
import MyPage from "./login/User";

const OptionTag = styled.div`
    display : flex;
    margin-top : 20%;
    margin-bottom : 20%;
    z-index : 1;
    cursor : pointer;
`

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
        IconComp : <FontAwesomeIcon icon={faSignInAlt} size={"lg"} />,
        DetailComp : Login,
        desc : "로그인"
    },
    // {
    //     IconComp :  <FontAwesomeIcon icon={faSpellCheck} size={"lg"} />,
    //     DetailComp : WordTable,
    //     desc : "단어목록"
    // }
]

const UserTagList = [
    {
        IconComp : <FontAwesomeIcon icon={faUser} size={"lg"} />,
        DetailComp : MyPage,
        desc : "회원정보"
    },
    {
        IconComp :  <FontAwesomeIcon icon={faSpellCheck} size={"lg"} />,
        DetailComp : WordTable ,
        desc : "단어목록"
    }
]




function VisitTag( {openModal} ){
    return (
        TagList.map( (item, index) => 
            <OptionTag key={index} onClick={openModal.bind(null, TagList[index])}>
                <div style={{width : "30%", marginLeft : "5%", color : "#222831"}}>
                    {item.IconComp}
                </div>
                <div style={{width : "70%", color : "#222831"}}>
                    {item.desc}
                </div>
            </OptionTag>
        )
    )
}

function UserTag( {openModal} ){
    return (
        UserTagList.map( (item, index) => 
            <OptionTag key={index} onClick={openModal.bind(null, UserTagList[index])}>
                <div style={{width : "30%", marginLeft : "5%", color : "#222831"}}>
                    {item.IconComp}
                </div>
                <div style={{width : "70%", color : "#222831"}}>
                    {item.desc}
                </div>
            </OptionTag>
        )
    )
}

function ClickModalComp({state}){
    const Component = state.data.Comp
    console.log(Component)
    return(
        <Component/>
    )
}


function HeaderTab( {isShow} ){

    const userInfo = useSelector(state => state.userInfo);

   const [modalState, setModalState ] = useState({
        isOpen : false,
        data : {}
   });

   const openModal = (comp) => {
        console.log(comp);
       setModalState(Object.assign({}, {
            isOpen : true,
            data : {
                hText : comp.desc,
                Comp : comp.DetailComp
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
                    userInfo.isLogin 
                        ?   <UserTag openModal={openModal}/>
                        :   <VisitTag openModal={openModal}/>
                }
                {
                    modalState.isOpen 
                    &&  <CustomModal isOpen={modalState.isOpen} headerText={modalState.data.hText} closeModal={closeModal}>
                            <ClickModalComp state={modalState}/>
                        </CustomModal>
                }
                
        </TabBar>
    )
}

export default HeaderTab;