import { AiOutlineArrowRight } from "react-icons/ai"; 
import { AiOutlineArrowDown } from "react-icons/ai"; 
import { useRef, useState } from "react"
import useStore from "../../store"
import { toast } from "sonner"
import {Button, Modal } from "flowbite-react";
import { BiCloudUpload } from "react-icons/bi";
import { addFile } from "../../firebase/addFile";
import { addCollection } from "../../firebase/addCollection";
import { HiOutlineExclamationCircle } from "react-icons/hi";
function Dashboad() {
  const CurrentSetting = useStore((state)=>state.setting)
  const setCurrentSetting=useStore(state=>state.setSetting)
  const [openModal, setOpenModal] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const refInputPicture = useRef<HTMLInputElement>(null)  
  const refInputLogo = useRef<HTMLInputElement>(null)
  const refInputWelcom = useRef<HTMLInputElement>(null)
  const AboutDoc = useRef<HTMLInputElement>(null)  
  const privacy_policyDoc = useRef<HTMLInputElement>(null)
  const terms_conditionsDoc = useRef<HTMLInputElement>(null)  
  const faqDoc = useRef<HTMLInputElement>(null)
  const [load,setLoad]=useState(false)



// transformer social_links en tableau

//mise a jour des parametre
const updateCollection= async ()=>{
  //confirmation des data
  setOpenModalConfirm(false)


  
  setLoad(true)
  // rensemblement des liens de  fichiers
  const fileLink = [
{url_name:CurrentSetting.profile_admin,type:"image/webp",key:"profile_admin"},
{type:"image/webp",url_name:CurrentSetting.logo,key:"logo"},
{url_name:CurrentSetting.img_welcome,type:"image/web",key:"img_welcome"},
{url_name:CurrentSetting.about_us,type:"application/pdf",key:"about_us"},
{url_name:CurrentSetting.privacy_policy,type:"application/pdf",key:"privacy_policy"},
{url_name:CurrentSetting.terms_conditions,type:"application/pdf",key:"terms_conditions"},
{url_name:CurrentSetting.faq,type:"application/pdf",key:"faq"}
    
  ]

  let settingUpdate = CurrentSetting
  //envoie des fichiers
  for(const item of fileLink){
      if(item.url_name!==""){
         try {
          const url = await addFile(item.url_name,item.type)
          settingUpdate={...settingUpdate,[item.key]:url}
         } catch (error) {
          console.log(error);
          
         }
        }else{
          toast.warning(`verifier que tout les fichiers sont entrez`,{
            className:"text-red-200"
          })
        }

  }

//envoie des parametres
addCollection("setting",settingUpdate).then(()=>{
  setLoad(false)
}).catch(err=>{
  console.log(err);
  setLoad(false)
  
})
  
}

//convertie l'objet socials-links en tableau
const convertObjectToArray = (object:{[key:string]: string})=>{
  const tabLink = Object.keys(object).map((cle) => {
    return {
      [cle]:object[cle]
    }
  });
  
  return tabLink
}
  // fonction de modification d'une proprieté de l'objet de type type_setting
  const editePropertie = (key:string,value:string,links?:boolean)=>{
    // si la proprieté a modifier est liens
    if(links){
      const newSetting = {...CurrentSetting,social_links:{
        ...CurrentSetting.social_links,
        [key]:value
      }}
      setCurrentSetting(newSetting)
    }else{
      
      const newSetting={...CurrentSetting,[key]:value}
      setCurrentSetting(newSetting)
    }
   
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
    <>
    {//modal de renseignemant des social links
    }
      <Modal show={openModal} size="md" onClose={()=>{setOpenModal(false)}} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">réseaux sociaux</h3>
            <div className="flex flex-col  ">
              {
               convertObjectToArray(CurrentSetting.social_links).map((item)=>{
               
               const key_liste = Object.keys(item) 
               const key =key_liste[0]
               const value = item[key] as string
               
                
                return (
                  <p className="mt-2">
                    <label className="block" htmlFor={key}>{key_liste[0]}</label>  
                    <input  id={key} value={value} onChange={(e)=>{editePropertie(key_liste[0],e.target.value,true)}}  className='border w-full py-1 ps-1 focus:ring-0  rounded-lg focus:border-2 focus:border-rose-400' type="text"/>
                  </p>
                )
               })
              }
             <button onClick={()=>{setOpenModal(false);}} className="self-end  mt-3 btn  px-4 py-2  rounded-lg">Modifier</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
{
  //modal de confirmation
}
      <Modal show={openModalConfirm} size="md" onClose={() => setOpenModalConfirm(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              éte vous sure d'avoir entré toute les données ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={updateCollection}>
                {"je, suis sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModalConfirm(false)}>
                Non, Quitté
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className='bg-white  mx-auto h-full mt-6'>
  
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <p className="text-center text-2xl font-semibold my-3">Réglage</p>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-6 py-4">
                          <input ref={refInputPicture} onChange={(e)=>{getURLFile(e.target.files,"profile_admin")}} type="file" accept="image/webp"/>
                          <div id='img' onClick={()=>{focusInput(refInputPicture)}} className={` cursor-pointer  flex items-center  rounded-sm h-8 ${CurrentSetting.profile_admin.length===0?"":"text-green-400"}`}>
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
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-6 py-4">
                         <input value={CurrentSetting.admin_name} onChange={(e)=>{editePropertie("admin_name",e.target.value)}} maxLength={15} placeholder="nom d'admin" className='border py-1 ps-1 focus:ring-0  rounded-lg focus:border-2 focus:border-rose-400' type="text"/>
                      </td>
                      <td className="py-4">
                        <label htmlFor="money" className=" me-2">devise de vente</label> 
                        <select id="money" className="className='border py-1 ps-1 focus:ring-0  rounded-lg focus:border-2 focus:border-rose-400'" value={CurrentSetting.symbole_devise} onChange={(e)=>{editePropertie("symbole_devise",e.target.value)}} >
                          <option value="$">dollar</option>
                          <option value="€">euro</option>
                        </select>
                      </td>
                      <td className="ps-2 py-4">
                      <button className="flex items-center" onClick={() => setOpenModal(true)}>Réseaux Sociaux <AiOutlineArrowRight /></button>
                      </td>

                      <td className="ps-6 py-4">
                        <textarea  cols={20}  value={CurrentSetting.desc_site} onChange={(e)=>{editePropertie("desc_site",e.target.value)}}  placeholder="petite description du site" className='border py-1 ps-1 text-sm  focus:ring-0 resize-none overflow-y-scroll  rounded-lg focus:border-2 focus:border-rose-400' />
                      </td>
                      <td className="ps-14 py-4">
                      <input ref={refInputWelcom} onChange={(e)=>{getURLFile(e.target.files,"img_welcome")}} type="file" accept="image/webp"/>
                          <div id='img' onClick={()=>{focusInput(refInputWelcom)}} className={` cursor-pointer  flex items-center  rounded-sm h-8 ${CurrentSetting.img_welcome.length===0?"":"text-green-400"}`}>
                            image welcome<AiOutlineArrowDown />
                          </div> 
                      </td>
                      <td className="pe-5 py-4">
                         <input value={CurrentSetting.email_site} onChange={(e)=>{editePropertie("email_site",e.target.value)}}  placeholder="email du site" className='border py-1 ps-1 focus:ring-0  rounded-lg focus:border-2 focus:border-rose-400' type="email"/>
                      </td>
                  </tr>
              </tbody>
          </table>

          
      </div>
      <button disabled={load} onClick={() => setOpenModalConfirm(true)} className="bg-green-500 p-4  absolute bottom-0 left-80 rounded-lg">
      {
        !load?( <BiCloudUpload className="text-xl" />):(
          <svg aria-hidden="true" role="status" className="inline w-6 h-6  text-lg text-green-500 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
          </svg>
        )
      }
      </button>
    </div>
    </>
  
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