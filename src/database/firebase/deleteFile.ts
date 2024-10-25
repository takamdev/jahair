import { deleteObject, getMetadata, ref } from "firebase/storage";
import { storage } from "./config";

export const deleteFile = async (fileURL:string[])=>{

// parcourt des urls
  fileURL.forEach( async element => {
    // reference vers le storage a partie de l'url
      const storageRef = ref(storage, element);
      
   
         try {
          // recuperation du nom du fichier grace a storageRef
          const res = await  getMetadata(storageRef)
          const name = res.name
          
          // reference vers le fichier a partie de du nom
          
          const refStorage = ref(storage,`fichiers/${name}`);
          
          // supression du fichier
          deleteObject(refStorage).then(() => {

           return {success:true}

          }).catch((error) => {
            console.error('Erreur lors de la suppression du fichier:', error);
            return {success:false}


          });
         } catch (error) {
           console.log(error);
           return {success:false}
           
         }
      
        
    });

    
}


