import React from 'react';
import {useSelector ,useDispatch} from "react-redux";
import { signOut } from "firebase/auth"

//modules
import { auth } from "../../../firebase/firebase"

function MyPage(props){

    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();

    console.log(userInfo)

    const logoutHandle = () => {
        signOut(auth).then(
            dispatch({type : "LOGOUT"})
        )
        .catch(error=>{
            console.log("error",error);
        })
    }

    return (
        <>
            안녕하세요 회원님 반갑습니다.
            <button onClick={logoutHandle}>로그아웃</button>
        </>
    )
}

export default MyPage;