import { BiSend } from "react-icons/bi"; 
import { AiOutlineMail } from "react-icons/ai"; 
import { BsWhatsapp } from "react-icons/bs"; 
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllCollection, getDocument } from '../firebase/getCollections'
import useStore from '../store';
import * as yup from "yup"
import { FaXTwitter } from "react-icons/fa6";
import { BsFacebook } from "react-icons/bs";
import Card from "../components/Service_Card";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Rating from "../components/Rating";
import { addCollection } from "../firebase/addCollection";
import { type_avis } from "../types/type_avis";
import { moyenne } from "../helper/mean";
import { editDoc } from "../firebase/editDoc";
import { FeaturedVideoGallery } from "../components/Gallery";
import { useTranslation } from "react-i18next";
import { type_service } from '../types/type_service';
import Note_product from "../components/Note_product";


type info = {
  fistname:string,
    email:string,
    message:string
  }  

  const schema = yup
  .object({
    fistname: yup.string().required("ce champ est requis"),    
    email: yup.string().required("ce champ est requis").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"email invalide"),    
    message: yup.string().required("ce champ est requis"),
  })
  .required()
function Service_item() {
    // initialisation des etats
    const {id} =useParams()
  const [service,setService]=useState<type_service|null>(null)
  const [load,setLoad]=useState(true)
  const [submiting,setSubmiting]=useState(false)
  const [note,setNote]=useState(0)
  const setting = useStore(state=>state.setting)
  const services = useStore(state=>state.service)
  const [Avis,SetAvis]=useState<type_avis[]|null>(null)
  const date = new Date()
  const mounts = ["Janv","Févr","Mars","Avr","Mai","Juin","Juil","Août","Sept","Oct","Nov","Déc"]
  const {i18n,t}=useTranslation()
  const navigateTo = useNavigate()
    // recuperation du roduict
    useEffect(()=>{
      if(id!==undefined){
          getDocument("service",id).then((res:any)=>{
            
            const itemService:type_service={
              id: res.id,
              name:res.name,
              prize: res.prize,
              img: res.img,
              desc: res.desc,
              rating:res.rating===undefined ? 4:res.rating,
              video:res.video
            }
                setService(itemService)
                getAllCollection("avis").then(res=>{
                 const newAvis = res.docs.map(doc=>doc.data() as type_avis)
  
                 SetAvis(newAvis.filter(item=>item.product_id===id))
                 setLoad(false)
                }).catch(err=>console.log(err))
          }).catch(erreur=>{
              console.log(erreur);
          })
      }
     
  },[])

// vailadation des avis

const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  resolver: yupResolver(schema),
})

// envoie de l'avis client
const onSubmit = (data:info) =>{
  setSubmiting(true)
  const avis:type_avis={
    ...data,
    note:note,
    product_id:id!,
    date:`${date.getDate()} ${mounts[date.getMonth()]} ${date.getFullYear()}`
  }

getAllCollection('avis').then( async res=>{
  if(res.size===0){
    addCollection("avis",avis).then(()=>{
      setSubmiting(false)
      reset()
    }).catch(err=>console.log(err)
    )
  }else{
    // ajout de l'avis
    addCollection("avis",avis).then(()=>{
      setSubmiting(false)
      reset()
    }).catch(err=>console.log(err)
    )
    //calcule de la moyenne des notes
    const Avis =[...res.docs.map((doc) => doc.data() as type_avis),avis]
    const note = moyenne(Avis,id!)
    
    // mise a jour du rating de ce produit
    const data = {
      collection_name: "service",
      id_doc: id!,
      data: {...service,rating:note},
      
   };
   try {
      const res = await editDoc(data);
      if (res.success) {
        setSubmiting(false) 
        reset()
        SetAvis((v)=>([avis,...v!]))
      }
   } catch (error) {
      console.log(error);
   }
  }
})
  
}
// demander un rendez-vous


  const MakeAppointment = ()=>{
    navigateTo(`/service/request-appointment/${id}`,{unstable_viewTransition:true})
  }


// description en fonction des langues
const desc = {
  fr:service?.desc.split(',')[0],
  en:service?.desc.split(',')[1],
  it:service?.desc.split(',')[2]
}


// titre en fonction des langues
const name = {
  fr:service?.name.split(',')[0],
  en:service?.name.split(',')[1],
  it:service?.name.split(',')[2]
}
    if(load){
      return(
          <div className="flex items-center justify-center w-screen h-screen border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <div role="status">
                  <svg aria-hidden="true" className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                  <span className="sr-only">Loading...</span>
              </div>
          </div>
    )
  }else{
      return (
          <article className='lg:mt-20 mb-10 h-full lg:px-40'>
              
          
            <div  className='grid   grid-cols-1 lg:grid-cols-2  gap-4'>
            {
                   // debut division de carousel
              }   
            <div className="md:h-auto p-1 lg:h-full">
              <FeaturedVideoGallery videos={service?.video as string[]}/>
           </div>
           {
                // fin division de carousel
            }   
              <div className='lg:px-10 px-4 mx-3'>
                  <h1 className='text-capitalize text-3xl'>{name[i18n.language as keyof typeof name]}</h1>
                  <p className="flex mt-2"><Rating iconSize="w-6 h-6" showAvis={true} rating={service!.rating}/></p>
                  <div className='text-color border-t-stone-400 border-t pt-5  mt-5'>
                           {
                            // debut division de action sur le produit
                           }   
                       <p className="text-slate-950">
                       {t("starting_from")} {setting.symbole_devise==="$"?(setting.symbole_devise+service?.prize):service?.prize.toString().concat(setting.symbole_devise)}
                       </p>
                       <div className='h-auto w-full'>
                         
  
  
                           {
                            // debut division de description
                           }   
                         <div className="w-full flex  min-h-96 max-h-full">
                            <p className="h-full">
                              {desc[i18n.language as keyof typeof desc]}
                            </p>
                            <button onClick={MakeAppointment} className="rounded-md self-end roboto-regular w-96 ms-auto  btn py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg  focus:shadow-none   active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            {t("make_appointment")}
                            </button>
                         </div>
  
                           {
                            // fin division de description
                           }        
  
                           {
                            // debut division de partage
                           }   
                         <div className='text-color flex items-center  w-full border-t-stone-400 border-t pt-5  mt-5'>
                          <div>
                              <p className="text-slate-900">
                                  {t('share')}
                              </p>
                          </div>
                          <div className="ms-auto">
                              <p className="w-full flex gap-5 ms-auto">
                                  <span><a href={`https://www.facebook.com/sharer.php?u=${window.location.href}`} target="_blank"><BsFacebook className="scale-150"/></a></span>
                                  <span><a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank"><FaXTwitter className="scale-150" /></a></span>
                                  <span><a href={`https://wa.me/?text=${window.location.href}`} target="_blank"><BsWhatsapp className="scale-150" /></a></span>
                                  <span><a href={`mailto:?subject=${service?.name}&body=${window.location.href}`} target="_blank"><AiOutlineMail className="scale-150" /></a></span>
                              
                              </p>
                          </div>
  
                          
                         </div>
                         {
                            // fin division de partage
                           }
    
                       </div>
  
                  </div>
              </div>
            </div>
          
  
            <div className="lg:my-28 my-10 relative flex lg:flex-row flex-col mx-5">
              <div className="lg:w-1/3 w-full ">
              <h3 className="text-start font-bold text-3xl underline mb-2">{t("leave_your_Review")}</h3>
              <p className="mb-3 text-color">{t("not_published_mail")}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className={"labelClass"} htmlFor="fistname">{t("firstname")}<span className="text-red-600 ">*</span></label>
                    <input   {...register("fistname")}   id="fistname" type="text" className={"inputClass focus:border-0 "} />
                    <p className="text-red-600 ">{errors.fistname?.message}</p>
  
                    <label className={"labelClass"}  htmlFor="email">{t("email")}<span className="text-red-600 ">*</span></label>
                    <input {...register("email")}  className={"inputClass"} id="email" type="text" />
                    <p className="text-red-600 ">{errors.email?.message}</p>
  
                    <label className={"labelClass"}  htmlFor="message">{t("message")}<span className="text-red-600 ">*</span></label>
                    <textarea {...register("message")}  className={"textareaClass"} id="message"></textarea>
                    <p className="text-red-600 ">{errors.message?.message}</p>
  
                    <p className="mt-3 flex"><span className="me-2 capitalize">{t("notes")}:</span> <Note_product Note={setNote}/> </p>
                    
                    <button type="submit" disabled={submiting}  className={`text-white ${submiting&&"cursor-wait"} mt-3 btn self-end focus:ring-0  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center`}>
                {submiting?(
                  <>
                   <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-lg text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>
                  {t('sending')}...
                  </>
                ):<p className="flex items-center gap-2"> {t('send')} <BiSend className="mt-1 scale-150" /></p>} 
                 
                </button>
                </form>
              </div>
              <div className="w-full lg:mx-5 my-2">
                <h3 className="text-center font-bold text-3xl underline">{t('client_reviews')}</h3>
                <div className="  overflow-y-scroll   p-5  lg:ms-14 mt-10">
                  { 
                  Avis?.length!==0 ? Avis!.map((item,index)=>{
                      return (
                        <div key={index} className="flex my-2">
                        <span><img src="/avatar.png" alt="avatar" /></span>
                        <div className=" relative border ms-2  p-3  h-auto w-full ">
                          <p className="flex">
                            <h4 className="text-color"><span className="font-bold">{item.fistname}</span> - <span className="text-sm lg:text-lg"> {item.date}</span></h4>
                            <span className="ms-auto flex items-center"><Rating iconSize="w-4 h-4" showAvis={false} rating={item.note}/></span>
                          </p>
                          <p className="mt-3 text-color">
                            {
                              item.message
                            }
                          </p>
                        </div>
                      </div>
                      )
                    }):<p className="text-center font-light text-2xl">{t("no_reviews_service")}</p>
                  }
                    
                  
                
                </div>
              </div>
            </div> 
  
            <h2 className="text-center text-4xl ">{t("you_like")}...</h2>
            
            <div className='grid grid-cols-1 md:gap-14 p-5 lg:gap-20 place-content-center lg:grid-cols-4 md:grid-cols-2 mt-4 lg:mt-14'>
                {
                  services.filter(item=>item.id!==id).slice(0,4).map((item,index)=>{
                    
                    return (
                          <div key={index} className='lg:-ms-8 md:-ms-5'>
                                  <Card className="my-6" reveal={{reset:false}}  service={item} />
                          </div>
                    )
                  })
                }
            </div>
          </article>
        )
  }
   
}

export default Service_item


