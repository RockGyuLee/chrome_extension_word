import React, { useState} from 'react';
import styled from "styled-components";
import { setPersistence, 
    browserLocalPersistence, 
    onAuthStateChanged } from "firebase/auth";
import {useSelector, useDispatch} from "react-redux";

// modules
import { auth, signInWithEmailAndPW } from "../../../firebase/firebase";
import { ReactContainer, Flex, Span } from "../../../components/Main";
import { BButton } from "../../../components/Button"
import Mypage from "./User";

const Input = styled.input`
    margin : 10px;
    width : 5vw;
    height : 3vh;
`
const MarginSpan = styled(Span)`
    margin : 10px
`

let throttleId, throttlePw;


function Login(){
    
    const userInfo = useSelector( state => state.userInfo);
    const seesionId = localStorage.getItem('firebase');

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [isAutoLogin, setIsAutoLogin] = useState(false);

    if( userInfo.isLogin ){
        return (
            <Mypage />
        )
    }

    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         console.log("user1",user)
    //         const uid = user.uid;
    //         dispatch({type : 'LOGIN', data : uid})
    //     } else {

    //         console.log("user",user);

    //         return;
    //     }
    // });

    const dispatch = useDispatch();

    // seesionId && onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         console.log("user1",user)
    //         dispatch({type : 'LOGIN', data : user})
    //     } else {

    //         return;
    //     }
    // });

    const insertInfo4Id = (evt) => {
        clearTimeout(throttleId);
        throttleId = setTimeout(()=>{
            setId(evt.target.value)
        }, 400)
    }

    const insertInfo4Pw = (evt) => {
        clearTimeout(throttlePw);
        throttlePw = setTimeout(()=>{
            setPw(evt.target.value)
        },400)
    }

    const handleLogin = () => {
        if(isAutoLogin){
            return autoLoginHandler(id,pw);
        } else {
            return notAutoLoginHandler(id,pw);
        }
    }

    const notAutoLoginHandler = (pId, pPw) => {
        signInWithEmailAndPW(pId, pPw)
        .then((userCredential)=>{
            dispatch({type : "LOGIN", data : userCredential.user})
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        })
    }

    const autoLoginHandler = (pId, pPw) => {
        signInWithEmailAndPW(pId, pPw)
        .then((userCredential)=>{
            console.log( userCredential.user)
            localStorage.setItem('firebase', JSON.stringify(userCredential.user));
            dispatch({type : "LOGIN", data :userCredential.user});
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        })
    }

    return (
        <ReactContainer
            width={12} height={10}
            elg={12} lg={12} md={12} sm={12} esm={12}
        >
            
            <Flex css={{
                "width" : "100%",
                "height" : "100%",
                "align-items" : "center",
                "justifyContent" : "center",
                "flex-direction" : 'column',
            }}>
                <Flex>
                    <MarginSpan size="md">자동로그인</MarginSpan>
                    <Input type='checkbox' onChange={()=>{setIsAutoLogin(!isAutoLogin)}}/>
                </Flex>
                <Flex>
                    <MarginSpan size="md">이메일 :</MarginSpan>
                    <Input onChange={insertInfo4Id}/>
                    <MarginSpan size="md">비밀번호 :</MarginSpan>
                    <Input onChange={insertInfo4Pw} type="password"/>
                </Flex>
                <Flex css={{
                    "margin" : "5px",
                }}>
                    <BButton width={"6vw"} height={"5vh"} text={"로그인"} onClick={handleLogin}/>
                </Flex>
            </Flex>
        </ReactContainer>
    )
}

export default Login;