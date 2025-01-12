import { AiOutlinePlusCircle } from "react-icons/ai"; 
import { CgRemove } from "react-icons/cg"; 
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {  useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "sonner";
import { addFile } from "../firebase/addFile";
import { addCollection } from "../firebase/addCollection";
import { type_service } from "../types/type_service";
import translator from "../helper/translator";




interface formData {
   name:string
   prize:number
   desc:string
}
const borderColor = "border-rose-300 border-2 w-full bg-slate-200   p-2 focus:ring-0 focus:border-0  rounded-sm h-12"

const schema = yup
  .object({
    name: yup.string().required(),
    prize: yup.number().required(),    
    desc: yup.string().required(),



  })
  .required()

export default function Modal({open,onClose,setData}:{open:boolean,onClose(value: boolean): void,setData(value: React.SetStateAction<type_service[]>):void}) {

    const [fileSelect,setFileSelect]=useState<(string[]|undefined)>([])
    const [imgSelect,setImgSelect]=useState<string>("")
    const refInputImg = useRef<HTMLInputElement>(null)
    const refInputVideo = useRef<HTMLInputElement>(null)


    const [load , setLoad]=useState(false)
    const {
      reset,
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<formData>({
      resolver: yupResolver(schema),
    })
    const resetFrom = ()=>{
      reset()
      setFileSelect([]) 
        refInputImg.current!.value =""
        refInputVideo.current!.value =""



      
    }
    const onSubmit = async (data:formData) =>{
    //verifier si les fichiers sont charger et recuperer les urls locals
     if(fileSelect?.length !== 0 && imgSelect?.length!==0){
      setLoad(true)
      const url: string[] = [];
      let img =  ""

      // envoie des fichiers et recuperaation des urls de partage sur firebase
     for (const element of fileSelect as string[]) {
      const res = await addFile(element, "video/mp4");
      
      url.push(res)
     }
     img = await addFile(imgSelect as string, "image/webp")
    // fin d'envoie de fichiers sur firebase

    // traduction

              
    const  objetTranslation = {
      desc:data.desc as string,
      name:data.name as string

    }


      const translationToEn =  await translator(objetTranslation,'en')
      const translationToIt=  await translator(objetTranslation,'it')


        // construit le produit
        const service = {
          name: {
            en:translationToEn.name.text,
            fr:data.name,
            it:translationToIt.name.text
          },
          prize: data.prize,
          video: url,
          rating:4,
          desc: {
            en:translationToEn.desc.text,
            fr:data.desc,
            it:translationToIt.desc.text
          },
          img: img
      } 
      //ajout du produit et recuperation de l'id
      addCollection("service",service).then(res=>{
        
        const Service = {
          id:res.id,
          ...service
        } 
        //mise a jour du tableau dans le dom
        setData((v)=>([...v,Service]))
        //reinitialisation des champ
        setLoad(false)
        resetFrom()
      }).catch(err=>console.error(err)
      )
    
   

     }else{
       toast.warning("entrez les videos",{
        className:"text-red-600"
       })
     }
     
    }

    
// transformer les fichier en liste de url fichier
const getURLFile = (files:FileList | null)=>{
     // parcourie l'objet file
     for (const cle in files) {      
     
      
      if(files[parseInt(cle)].type==="video/mp4"&&fileSelect?.length as number <=4){
      
        const url_name = URL.createObjectURL(files[parseInt(cle)])+ " "+files[parseInt(cle)].name

        
      // verifier si le fichier existe
        const isexiste = fileSelect?.find(item=>item.split(' ')[1]===url_name.split(' ')[1])

            if(fileSelect!== undefined && fileSelect.length<=3 && isexiste===undefined){
                const a = [...fileSelect,url_name]
                setFileSelect(a)
            }
      }else if(files[parseInt(cle)].type==="image/webp"&&fileSelect?.length as number ===0){
        const url_name = URL.createObjectURL(files[parseInt(cle)])+ " "+files[parseInt(cle)].name
        setImgSelect(url_name)
      }else{


       if(files[parseInt(cle)].type==="video/*"){
        toast.warning("seul les videos au format mp4 sont accepter ",{
          className:"text-green-500"
        })
       } else if(files[parseInt(cle)].type==="image/*"){
        toast.warning("seul les images au format webp  sont accepter ou ",{
          className:"text-green-500"
        })
       }else{
        toast.warning("seul les images ou videos sont acceptés",{
          className:"text-green-500"
        })
       }
        
    
 
  }
      }
    
    
}

const removeInSelect = (name:string)=>{
  const newFiles = fileSelect?.filter(file=>file!==name)
  setFileSelect(newFiles)
}


  return (
    <Dialog open={open} onClose={onClose} className="relative z-10 ">
      <DialogBackdrop
        transition
        className="fixed inset-0  bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
               
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Ajouter un Service
                  </DialogTitle>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                     <label className='labelClass'  htmlFor="name">Nom</label>
                     <input {...register("name")} className={errors.name?borderColor:"inputClass"} type="text" id='name' />

                     

                     <label className='labelClass' htmlFor="prize">Prix</label>
                     <input {...register("prize")} className={errors.prize?borderColor:"inputClass"} type="text" id='prize' />

                     <label className='labelClass flex items-center gap-2' htmlFor="video">Videos<AiOutlinePlusCircle className="text-green-500 text-xl" /></label>
                     <input  onChange={(e)=>{getURLFile(e.target.files)}} ref={refInputVideo} type="file"   accept="video/mp4" multiple = {true} id='video' className='hidden' />
                      <div id='video' className='w-full grid grid-cols-2 gap-4 overflow-y-scroll border-solid border-2 bg-slate-100  p-2 outline-none  rounded-sm h-12'>
                      { 
                        fileSelect?.length as number >0?(
                          
                          
                          fileSelect?.map(file=>{
                             
                             return  <span onClick={()=>{removeInSelect(file)}} className='mx-1  flex gap-0 items-center'>{file.split(' ')[1].slice(0,15)} <CgRemove className="text-red-500 text-2xl z-50" /></span>
                          }) 
                         ):""
                        
                      }
                      </div>

                      <label className='labelClass flex items-center gap-2' htmlFor="img">Photo<AiOutlinePlusCircle className="text-green-500 text-xl" /></label>
                     <input  onChange={(e)=>{getURLFile(e.target.files)}} ref={refInputImg} type="file"   accept="image/webp" id='img' className='hidden' />
                      <div id='img' className='w-full grid grid-cols-2 gap-4 overflow-y-scroll border-solid border-2 bg-slate-100  p-2 outline-none  rounded-sm h-12'>
                        {
                          imgSelect.length!==0&&<span onClick={()=>{setImgSelect('')}} className='mx-1  flex gap-0 items-center'>{imgSelect?.split(' ')[1].slice(0,15)} <CgRemove className="text-red-500 text-2xl z-50" /></span>

                        }
                      </div>

                      <label className='labelClass' htmlFor="desc">Description</label>
                      <textarea {...register("desc")} className={errors.desc?borderColor+'h-20 resize-none':"textareaClass"} id="desc"></textarea>
                      <button disabled={load} className="btn px-4 py-2  rounded-lg" type="submit">
                        {
                          load?"patientez...":"envoyer"
                        }
                      </button>
                      
                  </form>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                onClick={() => {
                  onClose(false)
                  resetFrom()
                  
                }}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}