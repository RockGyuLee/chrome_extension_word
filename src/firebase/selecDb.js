import { collection, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
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

// export async function getEngWords2(){
//     const unsub = onSnapshot(doc(db, "wordCollection", "wordList"), (doc) => {
//         console.log("getEng",doc.data());
//         return doc.data();
//     });

//     console.log("EngWords2", unsub);
// }

// const doc = db.collection('cities').doc('SF');

// const observer = doc.onSnapshot(docSnapshot => {
//   console.log(`Received doc snapshot: ${docSnapshot}`);
//   // ...
// }, err => {
//   console.log(`Encountered error: ${err}`);
// });
