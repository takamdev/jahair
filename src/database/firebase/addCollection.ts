import { promiseAddDocc } from "../../types/type_product";
import { db } from "./config";
import { addDoc ,collection} from "firebase/firestore/lite";

 export const addCollection = async(collection_name:string,data:any):promiseAddDocc=>{
   const collection_ref = collection(db,collection_name)

   try {
    return await addDoc(collection_ref,data)
   } catch (error:any) {
    return error
   }
 }