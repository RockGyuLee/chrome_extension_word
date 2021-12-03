import React, { useState} from 'react';
import styled from "styled-components";
import { setPersistence, 
    createUserWithEmailAndPassword,
    browserSessionPersistence,
    signOut
} from "firebase/auth";
import {useDispatch} from "react-redux";

// modules
import { auth, signInWithEmailAndPW } from "../../../firebase/firebase";
import { createDoc } from "../../../firebase/crud"
import { ReactContainer, Flex, Span } from "../../../components/Main";
import { BButton } from "../../../components/Button"
import Mypage from "./User";

const Input = styled.input`
    margin : 10px;
    width : auto;
    height : 3vh;
`
const MarginSpan = styled(Span)`
    margin : 10px;
    width : 25%;
    
`

const MarginFlex = styled(Flex)`
    margin : 0 18%;
`

const FFlex = styled(Flex)`
    width : 100%;
    height : 100%;
    justify-content : center;
    flex-direction : column;
`

let throttleId, throttlePw;

let throttleSignEmail, throttleSignPW, throttleSignCheckPW, throttleSignName;

function SignUp(){

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [checkPw, setCheckPW] = useState('');
    const [name , setName] = useState('');

    const insertEmail = (evt) => {
        clearTimeout(throttleSignEmail);
        throttleSignEmail = setTimeout(()=>{
            setEmail(evt.target.value)
        },400)
    }

    const insertPW = (evt) => {
        clearTimeout(throttleSignPW);
        throttleSignPW = setTimeout(()=>{
            setPassword(evt.target.value)
        },400)
    }

    const insertCheckPW = (evt) => {
        clearTimeout(throttleSignCheckPW);
        throttleSignCheckPW = setTimeout(()=>{
            setCheckPW(evt.target.value)
        },400)
    }

    const insertName = (evt) => {
        clearTimeout(throttleSignName);
        throttleSignName = setTimeout(()=>{
            setName(evt.target.value)
        },400)
    }


    setPersistence(auth, browserSessionPersistence)
        .then(()=>{
            return signInWithEmailAndPW(pId, pPw);
        }).then((userCredential)=>{
            dispatch({type : "LOGIN", data :userCredential.user});
        }).catch( (error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        })

    const insertMember = () => {
        setPersistence(auth, browserSessionPersistence)
        .then(()=>{
            return createUserWithEmailAndPassword(auth, email, password)
        })
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user",user);
            createDoc( user);
          })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
        
    }

    console.log("test", email, password, name);

    return (
        <FFlex>
            <MarginFlex>
                <MarginSpan css={{"width" : "100%"}} size="md">회원가입</MarginSpan>
            </MarginFlex>
            <MarginFlex>
                <MarginSpan size="md">이메일 :</MarginSpan>
                <Input onChange={insertEmail}/>
            </MarginFlex>
            <MarginFlex>
                <MarginSpan size="md">비밀번호 :</MarginSpan>
                <Input type="password" onChange={insertPW}/>
            </MarginFlex>
            <MarginFlex>
                <MarginSpan size="md">비밀번호 확인 :</MarginSpan>
                <Input type="password" onChange={insertCheckPW}/>
                {
                    password != checkPw && <MarginSpan css={{"width":"auto"}} size="smd" color="red">비밀번호를 확인해주세요.</MarginSpan>
                }
            </MarginFlex>
            <MarginFlex>
                <MarginSpan size="md">이름 :</MarginSpan>
                <Input onChange={insertName}/>
            </MarginFlex>
            <MarginFlex>
                <BButton size={"smd"} width={"6vw"} height={"5vh"} text={"회원가입"} onClick={insertMember}/>
            </MarginFlex>
        </FFlex>
    )
}

function Login(){

    //회원가입 유무
    const [ isSignUp, setIsSignUp] = useState(false);

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [isAutoLogin, setIsAutoLogin] = useState(false);

    const dispatch = useDispatch();

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
        // 세션 스토리지에 남아서 새로고침해도 세션에 정보 남아있음.
        setPersistence(auth, browserSessionPersistence)
        .then(()=>{
            return signInWithEmailAndPW(pId, pPw);
        }).then((userCredential)=>{
            dispatch({type : "LOGIN", data :userCredential.user});
        }).catch( (error)=>{
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
            dispatch({type : "AUTOLOGIN", data :userCredential.user});
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        })
    }

    const signUp = () => {
        setIsSignUp(!isSignUp)
    }

    return (
        <ReactContainer
        
            width={12} height={10}
            elg={12} lg={12} md={12} sm={12} esm={12}
        >
            {isSignUp && <SignUp/>}
            {!isSignUp && 
                <FFlex>
                    <MarginFlex>
                        <MarginSpan size="md">자동로그인 :</MarginSpan>
                        <Input type='checkbox' css={{"width" : "3%"}} onChange={()=>{setIsAutoLogin(!isAutoLogin)}}/>
                    </MarginFlex>
                    <MarginFlex>
                        <MarginSpan size="md">이메일 :</MarginSpan>
                        <Input onChange={insertInfo4Id}/>
                    </MarginFlex>
                    <MarginFlex>
                        <MarginSpan size="md">비밀번호 :</MarginSpan>
                        <Input onChange={insertInfo4Pw} type="password"/>
                    </MarginFlex>
                    <MarginFlex>
                        <BButton size={"md"} width={"6vw"} height={"5vh"} text={"로그인"} onClick={handleLogin}/>
                        <BButton size={"smd"} width={"6vw"} height={"5vh"} text={"회원가입"} onClick={signUp}/>
                    </MarginFlex>
                </FFlex>
            }
        </ReactContainer>
    )
}

export default Login;