import { AiOutlineArrowDown } from "react-icons/ai"; 
import { useRef, useState } from "react"
import { type_setting } from "../../types/type_setting"
//import useStore from "../../store"
import { toast } from "sonner"


function Dashboad() {
  //const settings = useStore((state)=>state.setting)
  //const [setting,setSetting]=useState<type_setting>(settings)
  const refInputPicture = useRef<HTMLInputElement>(null)  
  const refInputLogo = useRef<HTMLInputElement>(null)
  const AboutDoc = useRef<HTMLInputElement>(null)  
  const privacy_policyDoc = useRef<HTMLInputElement>(null)
  const terms_conditionsDoc = useRef<HTMLInputElement>(null)  
  const faqDoc = useRef<HTMLInputElement>(null)

  const [CurrentSetting,setCurrentSetting]=useState<type_setting>({
    symbole_devise: "",
    profile_admis: "",
    admin_name: "",
    faq: "",
    privacy_policy: "",
    terms_conditions: "",
    about_us: "",
    logo: "",
  })

console.log(CurrentSetting);

  // fonction de modification d'une proprieté de l'objet de type type_setting
  const editePropertie = (key:string,value:string)=>{
    setCurrentSetting((v:type_setting)=>{
      return {...v,[key]:value}
      })
  }


// transformer les fichiers en liste de url vers ces fichiers
const getURLFile = (files:FileList | null,field:string)=>{
       //application/pdf
       if(files){
        const file = files[0]
          if(file?.type==="image/webp"||file?.type==="application/pdf"){
            // contruire un chaine contenant l'url et le nom du fichier
            const url_name = URL.createObjectURL(file) + " "+file.name 
            editePropertie(field,url_name)
          }else{
            // type de document
           
            toast.success("seul les formats webp et pdf sont accepter respestivement (image et document)",{
              className:"text-green-500"
            })
          
          }
       }
     
      
    
}
// focus sur un input de type file
const focusInput = (ref:React.RefObject<HTMLInputElement>)=>{
  ref.current?.click()
}


  return (
    <div className='bg-white  mx-auto h-full mt-6'>
  
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <p className="text-center text-2xl font-semibold my-3">Réglage</p>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-6 py-4">
                          <input ref={refInputPicture} onChange={(e)=>{getURLFile(e.target.files,"profile_admis")}} type="file" accept="image/webp"/>
                          <div id='img' onClick={()=>{focusInput(refInputPicture)}} className={` cursor-pointer  flex items-center  rounded-sm h-8 ${CurrentSetting.profile_admis.length===0?"":"text-green-400"}`}>
                            photo admin<AiOutlineArrowDown />
                          </div>
                      </td>
                      <td className="px-6 py-4">
                          <input onChange={(e)=>{getURLFile(e.target.files,"logo")}} ref={refInputLogo}  type="file" accept="image/webp"/>
                          <div onClick={()=>{focusInput(refInputLogo)}} id='img' className={` cursor-pointer  flex items-center    rounded-sm h-8 ${CurrentSetting.logo.length===0?"":"text-green-400"}`}>
                            logo<AiOutlineArrowDown />
                          </div>
                      </td>

                      <td className="px-6 py-4">
                          <input onChange={(e)=>{getURLFile(e.target.files,"about_us")}} ref={AboutDoc}  type="file" accept="application/pdf"/>
                          <div onClick={()=>{focusInput(AboutDoc)}} id='img' className={` cursor-pointer  flex items-center    rounded-sm h-8 ${CurrentSetting.about_us.length===0?"":"text-green-400"}`}>
                            a propos<AiOutlineArrowDown />
                          </div>
                      </td>

                      <td className="px-6 py-4">
                          <input onChange={(e)=>{getURLFile(e.target.files,"privacy_policy")}} ref={privacy_policyDoc}  type="file" accept="application/pdf"/>
                          <div onClick={()=>{focusInput(privacy_policyDoc)}} id='img' className={` cursor-pointer  flex items-center    rounded-sm h-8 ${CurrentSetting.privacy_policy.length===0?"":"text-green-400"}`}>
                          Politique de confidentialité<AiOutlineArrowDown />
                          </div>
                      </td>
                      <td className="px-6 py-4">
                          <input onChange={(e)=>{getURLFile(e.target.files,"terms_conditions")}} ref={terms_conditionsDoc}  type="file" accept="application/pdf"/>
                          <div onClick={()=>{focusInput(terms_conditionsDoc)}} id='img' className={` cursor-pointer  flex items-center    rounded-sm h-8 ${CurrentSetting.terms_conditions.length===0?"":"text-green-400"}`}>
                          condition général d'utilisation<AiOutlineArrowDown />
                          </div>
                      </td>
                      <td className="px-6 py-4">
                          <input onChange={(e)=>{getURLFile(e.target.files,"faq")}} ref={faqDoc}  type="file" accept="application/pdf"/>
                          <div onClick={()=>{focusInput(faqDoc)}} id='img' className={` cursor-pointer  flex items-center    rounded-sm h-8 ${CurrentSetting.faq.length===0?"":"text-green-400"}`}>
                            FAQ<AiOutlineArrowDown />
                          </div>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

    </div>
  )
}

/*
function Input({placeholder,setSetting,key}:{placeholder:string,key:string,setSetting:(value:string,key:string)=>void}){
  const [value,setValue]=useState("")
  return(
    <input  type="text" placeholder={placeholder} onBlur={()=>{setSetting(value,key)}} onChange={(e)=>{setValue(e.target.value)}} className="border py-1   focus:ring-0  rounded-lg focus:border-2 focus:border-rose-400" value={value} />
  )
}*/
export default Dashboad