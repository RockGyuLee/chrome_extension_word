import React, {useEffect, useState, Fragment} from 'react';
import styled from "styled-components";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PuffLoader from "react-spinners/PuffLoader";
import {onAuthStateChanged} from "firebase/auth"
import { doc, onSnapshot, } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//modules
import { db, auth} from "./firebase/firebase";
import { isUpdateDb, getDataInCollectionForDB } from "./firebase/crud";

const Loading = styled.div`
    display : flex;
    width : 100vw;
    height : 100vh;
    justify-content : center;
    align-items : center;
`

export const showToast = (t) => {
    
    // let {
    //     msg = "Text가 비어있습니다.",
    //     position = "top-right",
    //  } = t;

    toast(t.msg, {
        position: t.position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}


function Reducer(props){

    const [data ,setData] =useState(null);
    const [wordClass , setWordClass] = useState(null);
    const [userInfo, setUserInfo] = useState({
        info : '',
        isLogin : false
    });

    useEffect(()=>{
        onSnapshot(doc(db, "wordCollection", "wordList"), (doc) => {
            setData(doc.data());
        });
        getDataInCollectionForDB("wordCollection",'wordClass').then(res=>{
            setWordClass(res);
        });

        // auto login이 되면 해당 유저의 uid를 redux state에 저장하여 데이터를 확인해야 한다.
        // 해당 유저들의 wordList를 파악해야한다.
        localStorage.getItem('firebase') && onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserInfo(Object.assign({},userInfo, {
                    info : user,
                    isLogin : true
                }))
            }
        });
    },[]);

    //데이터가 없다면 loading bar 표시.
    if(data == null){
        return(
            <Loading> 
                <PuffLoader color={"black"} loading={true} size={100} />
            </Loading>
        )
    }

    function reducer(state = {data,wordClass,userInfo} , action){
        switch (action.type) {
            case 'UPDATE':
                let { toast, wordList } = action.data;
                if(typeof wordList[0].spelling == 'undefined'){
                    toast = {
                        msg : "형식이 맞지않아 실패하였습니다.",
                        position : "bottom-center",
                    }
                    showToast(toast);
                    return state;
                }
                let wordArr = {
                    word : wordList
                }
                isUpdateDb(wordList);
                showToast(toast);
                return Object.assign({},state,{
                    data : wordArr
                });
            case 'LOGIN':
                let obj = {
                    info : action.data,
                    isLogin : true
                }
                return Object.assign({},state, {
                    userInfo : obj
                });
            case 'LOGOUT' :
                localStorage.removeItem('firebase');
                return Object.assign({},state, {
                    userInfo : {
                        info : '',
                        isLogin : false
                    }
                });
            case 'ERROR' :
                return state;
            default:
                return state;
        }
    }

    let store =  createStore(reducer);

    return (
        <Provider store={store}>
            <ToastContainer 
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme={"dark"}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Fragment key={Math.random()}>
                {props.children}
            </Fragment>
            
        </Provider>
    )
}

export default Reducer;