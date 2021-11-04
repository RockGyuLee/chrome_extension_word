import React, {useEffect, useState, Fragment} from 'react';
import styled from "styled-components";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PuffLoader from "react-spinners/PuffLoader";


import { getEngWords } from "./firebase/selecDb";
import useAsync from "./util/useAsync";

const Loading = styled.div`
    display : flex;
    width : 100vw;
    height : 100vh;
    justify-content : center;
    align-items : center;

`


function Reducer(props){

    const [state, fetch] = useAsync(getEngWords);
    const { loading, data = null, error } = state;


    if(state.data == null){
        return(
            <Loading> 
                <PuffLoader color={"black"} loading={loading} size={100} />
            </Loading>
        )
    }

    console.log("Reducer", data)

    const reducer = (state = data , action) => {
        return state;
    }

    let store =  createStore(reducer);

    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )      
}

export default Reducer;