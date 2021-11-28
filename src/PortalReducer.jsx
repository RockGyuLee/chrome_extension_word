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
        // auto login이 되면 해당 유저의 uid를 redux state에 저장하여 데이터를 확인해야 한다.
        // 해당 유저들의 wordList를 파악해야한다.
        let session = localStorage.getItem('firebase');
        if(session){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUserInfo(Object.assign({},userInfo, {
                        info : user,
                        isLogin : true
                    }))
                    onSnapshot(doc(db, "wordCollection", user.uid), (doc) => {
                        //로그인한 유저의 데이터 정보.
                        let dataSize = doc.data()['word'].length;
                        //데이터의 개수가 기본적으로 세팅되어야하는 값보다 작으면 기본으로 제공되는 데이터가 표시되어야한다.
                        if( dataSize < 4 ){
                            getDataInCollectionForDB("wordCollection",'wordList').then(res=>{
                                console.log("res",res);
                                setData(res)
                            })
                            alert(
                                "입력한 데이터의 개수가 "+ dataSize + "개여서 기본으로 제공되는 단어목록이 표시됩니다.\n"
                                + "최소한의 데이터 개수는 4개이상이여야 합니다."
                            );
                            return ;
                        } else {
                            setData(doc.data());
                        }
                    });
                    getDataInCollectionForDB("wordCollection",'wordClass').then(res=>{
                        setWordClass(res);
                    });
                }
            });
        } else {
            onSnapshot(doc(db, "wordCollection", "wordList"), (doc) => {
                setData(doc.data());
            });
            getDataInCollectionForDB("wordCollection",'wordClass').then(res=>{
                setWordClass(res);
            });
        }
        
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
                isUpdateDb(wordList,userInfo);
                showToast(toast);
                return Object.assign({},state,{
                    data : wordArr
                });
            case 'LOGIN':
                let obj = {
                    info : action.data,
                    isLogin : true
                }
                location.reload();
                return Object.assign({},state, {
                    userInfo : obj
                });
            case 'LOGOUT' :
                localStorage.removeItem('firebase');
                location.reload();
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