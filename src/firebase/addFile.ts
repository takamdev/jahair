import { storage } from "./config";
import { getDownloadURL, ref ,uploadBytes } from "firebase/storage";
interface jsonFile{
    name:string
    url:string
}
const CreateFile = async (jsonFile:jsonFile):Promise<File>=>{
      // cree un objet file a partit du chemin vers le fichier
      const cheminFichier = jsonFile.url;

      const file = new File([
        await fetch(cheminFichier).then(response => response.arrayBuffer())
      ], jsonFile.name, {
        type: 'image/webp',
      });
return file
}

export const addFile =async (jsonFile:jsonFile):Promise<string>=>{
    const fichier = await CreateFile(jsonFile)
    const storageRef = ref(storage, `fichiers/${jsonFile.name}`);
    try {
       return await uploadBytes(storageRef, fichier).then( async()=>{
           return await getDownloadURL(storageRef)
        })

    } catch (error:any) {
        return error
    }
    
}