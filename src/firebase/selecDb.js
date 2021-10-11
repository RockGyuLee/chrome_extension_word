import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getEngWords() {
    const wordCollection = collection(db, 'wordCollection');
    const wordSnapshot = await getDocs(wordCollection);
    const wordList = wordSnapshot.docs.map(doc => {
        return doc.data()
    });
    return wordList;
}

export async function getEngWords2() {
    const wordCollection = collection(db, 'wordCollection');
    const wordSnapshot = await getDocs(wordCollection);
    const wordList = wordSnapshot.docs.map(doc => {
        return doc.get("word");
    });
    return wordList
}