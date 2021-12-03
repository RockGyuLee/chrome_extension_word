import { deleteField, getDoc,
    doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import adminUID from "../admin";

export async function isUpdateDb(datas, userInfo){

    console.log("update",datas,userInfo)
    // await setDoc(doc(db, 'wordCollection', "wordList"), {
    //    word : datas
    // })
    if(userInfo.info['uid'] == adminUID){
        await setDoc(doc(db, 'wordCollection', "wordList"), {
            word : datas
        })
    } 
    else if(userInfo.isLogin){
        await setDoc(doc(db, 'wordCollection', userInfo.info['uid']), {
            word : datas
        })
    }
    // else{
    //     await setDoc(doc(db, 'wordCollection', "wordList"), {
    //         word : datas
    //     })
    // }
    return true;
}

export async function createDoc( userInfo){

    await setDoc(doc(db, 'wordCollection', userInfo['uid']), {
       word : []
    })

    

    return true;
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