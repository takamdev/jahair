import { CreateFile } from "../helper/createfile";
import { supabase } from "./supabaseConfig"





export const addFile =async (url_name:string,type:string):Promise<string>=>{
    const file = await CreateFile(url_name,type)
    const fileName = `img_${Date.now()}_${file.name}`
    
    const { error: uploadError } = await supabase.storage
    .from("images")
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type
    })

  if (uploadError) throw new Error(`Upload échoué : ${uploadError.message}`)

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(fileName)

  return data.publicUrl
    
}