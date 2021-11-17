import { deleteField, getDoc,
    doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function isUpdateDb(datas){
    await setDoc(doc(db, 'wordCollection', "wordList"), {
       word : datas
    })

    return true;
}

export async function isDeleteDB(){
    const cityRef = doc(db, "cities", "LA");
    await updateDoc(cityRef, {
        capital : deleteField()
    });
}

export async function getDataInCollectionForDB(collection, document) {
   
    const docRef = doc(db, collection, document);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
       return null;
    }
}
