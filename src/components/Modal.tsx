import { AiOutlinePlusCircle } from "react-icons/ai"; 
import { CgRemove } from "react-icons/cg"; 
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {  useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "sonner";
import { type_product } from "../types/type_product";
import { addFile } from "../firebase/addFile";
import { addCollection } from "../firebase/addCollection";




interface formData {
   name:string
   category:string
   prize:number
   desc:string
}
const borderColor = "border-rose-300 border-2 w-full bg-slate-200   p-2 focus:ring-0 focus:border-0  rounded-sm h-12"

const schema = yup
  .object({
    name: yup.string().required(),    
    category: yup.string().required(),    
    prize: yup.number().required(),    
    desc: yup.string().required(),



  })
  .required()

export default function Modal({open,onClose,setData}:{open:boolean,onClose(value: boolean): void,setData(value: React.SetStateAction<type_product[]>):void}) {

    const [imgSelect,setImgSelect]=useState<string[]>([])
    const refInputFile = useRef<HTMLInputElement>(null)
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
      setImgSelect([])
      if(refInputFile.current) refInputFile.current.value =""
    }
    const onSubmit = async (data:formData) =>{
    //verifier si les images sont charger et recuperer les urls locals
     if(imgSelect.length>0){
      setLoad(true)
      
      const urlList: string[] = [];
        for (const element of imgSelect) {
          try {
            const res = await addFile(element,"image/webp");
            urlList.push(res);
          } catch (err) {
            console.error(err);
          }
        }

      // construit le produit
        const product = {
          category: data.category,
          title: data.name,
          prize: data.prize,
          img: urlList,
          in_stock:true,
          desc:data.desc
        } 
        //ajout du produit et recuperation de l'id
        addCollection("product",product).then(res=>{
          
          const product = {
            id:res.id,
            category: data.category,
            title: data.name,
            prize: data.prize,
            img: urlList,
            in_stock:true,
            desc:data.desc
          } 
          //mise a jour du tableau dans le dom
          setData((v)=>([...v,product]))
          //reinitialisation des champ
          setLoad(false)
          resetFrom()
        }).catch(err=>console.error(err)
        )
        
     }else{
       toast.warning("entrez les images",{
        className:"text-red-600"
       })
     }
     
    }

    
// transformer les image en liste de url images
const getURLFile = (files:FileList | null)=>{
  // parcourie l'objet file
    for (const cle in files) {      
      if(files[parseInt(cle)].type==="image/webp"){
        const url_name = URL.createObjectURL(files[parseInt(cle)])+ " "+files[parseInt(cle)].name


      // verifier si le fichier existe
        const isexiste = imgSelect.find(item=>item.split(' ')[1]===url_name.split(' ')[1])

        if(isexiste===undefined)  {

          if(imgSelect.length<=3){
            setImgSelect((v)=>([...v,url_name]))
          }
        }
      }else{
        toast.success("seul les image au format webp sont accepter",{
          className:"text-green-500"
        })
       
      }
      }
    
}

//suprimer une image
const removeImg = (name:string)=>{
   const newFIles = imgSelect.filter(item => item.split(" ")[1]!==name)
   setImgSelect(newFIles)
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
                    Ajouter un Produit
                  </DialogTitle>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                     <label className='labelClass'  htmlFor="name">Nom</label>
                     <input {...register("name")} className={errors.name?borderColor:"inputClass"} type="text" id='name' />

                     <label className='labelClass mt-2' htmlFor="category">Category</label>
                     <input {...register("category")} className={errors.category?borderColor:"inputClass"} type="text" id='category' />

                     <label className='labelClass' htmlFor="prize">Prix</label>
                     <input {...register("prize")} className={errors.prize?borderColor:"inputClass"} type="text" id='prize' />

                     <label className='labelClass flex items-center gap-2' htmlFor="img">Photo (4 images max) <AiOutlinePlusCircle className="text-green-500 text-xl" /></label>
                     <input  onChange={(e)=>{getURLFile(e.target.files)}} ref={refInputFile} type="file"  multiple accept="image/webp" id='img' className='hidden' />
                      <div id='img' className='w-full grid grid-cols-2 gap-4 overflow-y-scroll border-solid border-2 bg-slate-100  p-2 outline-none  rounded-sm h-12'>
                        {
                        
                        
                            imgSelect.map(item=>{
                                return (<span onClick={()=>{removeImg(item.split(' ')[1])}} className='mx-1  flex gap-0 items-center'>{item.split(' ')[1]} <CgRemove className="text-red-500 text-2xl z-50" /></span>)
                            })
                                
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