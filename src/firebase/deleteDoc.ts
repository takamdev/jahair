import { deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "./config";

type type_params ={
    collection_name:string,
    id_doc:string
}

export const deleteDocById =async (refs:type_params)=>{
    const collection_name=refs.collection_name
    const id_doc = refs.id_doc
    const refDocument = doc(db, collection_name, id_doc);
   return deleteDoc(refDocument).then(res=>{
       return {response:res,success:true}
    }).catch(err=>{
         return {response:err,success:false}
    })
}