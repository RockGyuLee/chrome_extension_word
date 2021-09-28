import React from 'react';
import useAsync from "../util/useAsync";
import { getEngWords } from "../firebase/selecDb";

function EngWordsPage(){

    const [state, refetch] = useAsync(getEngWords);

    const { loading, data, error } = state;

    console.log("loading, data, error",loading, data, error);

    return (
        <>test</>
    )
}

export default EngWordsPage