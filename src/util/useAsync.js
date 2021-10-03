import { useReducer, useEffect} from "react";

function reducer(state, action){
    console.log("action",action);
    switch(action.type){
        case 'LOADING' : 
            return {
                loading : true,
                data : null,
                error : false
            }
        case 'SUCCESS' : 
            return {
                loading : false,
                data : action.data,
                error : false
            }
        case 'ERROR' : 
            return {
                loading : false,
                data : null,
                error : action.error
            }
        default : 
            throw new Error(`Error 입니다.${action.type}`)
    }
}

function useAsync(callback, deps =[]){
    const [state, dispatch] = useReducer(reducer, {
        loading : false,
        data : null,
        error : false
    });

    const fetchData = async () => {
        dispatch({type : 'LOADING'});
        try{
            const data = await callback();
            dispatch({ type : 'SUCCESS', data});
        } catch(e){
            dispatch({ type : 'ERROR', error : e});
        }
    };

    useEffect(()=> {
        fetchData();
    }, deps);



    return [state, fetchData];
}

export default useAsync;