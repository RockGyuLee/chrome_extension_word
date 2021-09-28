import React, {useState} from 'react';
import { ThemeProvider } from "styled-components";
import theme from "./theme.js";
import {auth, db} from "./firebase/firebase.js";
import useAsync from './util/useAsync.js'; "./util/useAsync";
import EngWordsPage from "./pages/WordPage";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// 로그인 함수.
// signInWithEmailAndPassword(auth, "test@test.com", "tester")
// .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     console.log("user",user)
//     // ...
// })
// .catch((error) => {
//     console.log("error",error)
// });

// async function getEngWords() {
//     const wordCollection = collection(db, 'test');
//     const wordSnapshot = await getDocs(wordCollection);
//     const wordList = wordSnapshot.docs.map(doc => doc.data());
//     return wordList;
// }

export default function App(){

    return(
        <ThemeProvider theme={theme}>
            <EngWordsPage/>
        </ThemeProvider>
    )
}