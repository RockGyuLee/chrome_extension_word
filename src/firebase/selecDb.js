import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getEngWords() {
   
    const docRef = doc(db, "wordCollection", "wordList");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
       return null;
    }
}