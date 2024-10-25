import { storage } from "./config";
import { getDownloadURL, ref ,uploadBytes } from "firebase/storage";
import { CreateFile } from "../../helper/createfile";


export const addFile =async (url_name:string,type:string):Promise<string>=>{
    const fichier = await CreateFile(url_name,type)
    const storageRef = ref(storage, `fichiers/${url_name.split(' ')[1]}`);
    try {
       return await uploadBytes(storageRef, fichier).then( async()=>{
           return await getDownloadURL(storageRef)
        })

    } catch (error:any) {
        return error
    }
    
}