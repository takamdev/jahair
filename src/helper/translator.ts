
import axios from "axios";


const translator = async (text:string|{[key:string]:string}, targetLanguage:string) => {
 
  try {
    const res = await  axios.post(`${process.env.baseURL}/api/translator`,{text:text,target:targetLanguage})
    return res.data.translation
  } catch (error) {
   console.log(error);
  }

};

export default translator