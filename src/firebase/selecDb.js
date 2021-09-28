import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getEngWords() {
    const wordCollection = collection(db, 'test');
    const wordSnapshot = await getDocs(wordCollection);
    const wordList = wordSnapshot.docs.map(doc => doc.data());
    return wordList;
}