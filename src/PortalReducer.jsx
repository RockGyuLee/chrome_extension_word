import React, {useEffect, useState, Fragment} from 'react';
import styled from "styled-components";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PuffLoader from "react-spinners/PuffLoader";
import { doc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//modules
import { db } from "./firebase/firebase";
import { isUpdateDb } from "./firebase/crud";

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

    useEffect(()=>{
        onSnapshot(doc(db, "wordCollection", "wordList"), (doc) => {
            setData(doc.data());
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

    const reducer = (state = data , action) => {
        switch( action.type ){
            case 'UPDATE' :
                let { toast, wordList } = action.data;
                if(typeof wordList[0].spelling == 'undefined'){
                    toast = {
                        msg : "형식이 맞지않아 실패하였습니다.",
                        position : "bottom-center",
                    }
                    showToast(toast);
                    return state;
                }
                isUpdateDb(wordList);
                showToast(toast);
                return state
            case 'DELETE' :
                console.log("state",action)
                return state
        }

        return state;
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