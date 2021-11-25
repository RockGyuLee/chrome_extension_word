import React, { useState} from 'react';
import styled from "styled-components";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {useSelector, useDispatch} from "react-redux";

// modules
import {auth, signInWithEmailAndPW} from "../../../firebase/firebase";
import { ReactContainer, Flex } from "../../../components/Main";
import { BButton } from "../../../components/Button"

const Input = styled.input`
    margin : 10px;
    width : 5vw;
    height : 3vh;
`

let throttleId, throttlePw;

function signInWithFirebase(id, pw){
    return signInWithEmailAndPassword(auth, id, pw)
    
}

//회원일 경우 React Component
function UserInfo(){
    return (
        <>회원입니다.</>
    )
}

function Login(){
    
    const userInfo = useSelector( state => state.userInfo);

    // const [ isLogin , setIsLogin ] = useState(false);
    
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');


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
        signInWithEmailAndPW(id,pw)
        .then((userCredential)=>{
            dispatch({type : "LOGIN", data : userCredential.user})
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
            {
                userInfo.isLogin 
                    ?   <UserInfo />
                    :   <Flex css={{
                            "width" : "100%",
                            "height" : "100%",
                            "align-items" : "center",
                            "justifyContent" : "center",
                        }}>
                            이메일 :
                            <Input onChange={insertInfo4Id}/>
                            비밀번호 :
                            <Input onChange={insertInfo4Pw} type="password"/>
                            <BButton width={"6vw"} height={"5vh"} text={"login"} onClick={handleLogin}/>
                        </Flex>
            }
        </ReactContainer>
    )
}

export default Login;