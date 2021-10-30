import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// export async function getEngWords() {
//     const wordCollection = collection(db, 'wordCollection');
//     const wordSnapshot = await getDocs(wordCollection);
//     const wordList = wordSnapshot.docs.map(doc => {
//         return doc.get("wordList");
//     });
//     return wordList
// }

export async function getEngWords() {
   
    const docRef = doc(db, "wordCollection", "wordList");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
       return null;
    }
}