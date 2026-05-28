
import { supabase } from "./supabaseConfig"
export const deleteFile = async (fileURL:string[])=>{

// parcourt des urls
  fileURL.forEach( async element => {
   const urlParts = element.split(`/storage/v1/object/public/images/`)
  
  if (urlParts.length < 2) {
    throw new Error("URL invalide ou bucket incorrect")
  }

  const filePath = decodeURIComponent(urlParts[1])

  const { error } = await supabase.storage
    .from("images")
    .remove([filePath])

  if (error) throw new Error(`Suppression échouée : ${error.message}`)
      
        
    });

    
}


