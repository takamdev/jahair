import { db } from "./config";
import { collection,getDocs,doc ,getDoc} from "firebase/firestore/lite";

//recuperer une collection entiere
export const getAllCollection=async (collection_name:string)=>{
    const collection_ref = collection(db,collection_name)
    try {
        return await getDocs(collection_ref)
    } catch (error) {
        return error
    }
}

//recuperer une collection specifique
export const getDocument = async (collection_name: string, document_id: string) => {
  const documentRef = doc(db, collection_name, document_id);
  try {
    const documentSnapshot = await getDoc(documentRef);
    if (documentSnapshot.exists()) {
      return documentSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};