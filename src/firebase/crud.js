import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function isUpdateDb(datas){
    await setDoc(doc(db, 'wordCollection', "wordList"), {
       word : datas
    })

    return true;
}

