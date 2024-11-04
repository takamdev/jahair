import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "./config";

type type_params = {
    collection_name:string,
    id_doc:string,
    data:any
}

export const editDoc = async (refs:type_params)=>{
  const collection_name = refs.collection_name
  const id_doc = refs.id_doc
  const update = refs.data
  const refDocument = doc(db, collection_name, id_doc);
  return updateDoc(refDocument,update).then((res)=>{
    return {response:res,success:true}
  }).catch((error)=>{
    return {response:error,success:false}
  })
}