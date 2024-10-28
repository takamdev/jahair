import {useEffect, useRef } from "react"
import useStore from "../store"
import ScrollReveal from 'scrollreveal'
import { useNavigate } from "react-router-dom"
import { type_service } from "../types/type_service"
import { useTranslation } from "react-i18next"

function Card({service,className,reveal}:{service:type_service,className?:string,reveal?:any}) {

    const navigateTo = useNavigate()
    const setting = useStore(state=>state.setting)
    const {i18n,t}=useTranslation()

      // recuperation des tradustions
  const prepareTranslate = (object:string)=>{
    return {fr:object.split(",")[0],en:object.split(',')[1],it:object.split(',')[2]}
  }
    const {img,name,rating,prize,id} = {
      ...service,
      name:prepareTranslate(service.name),
    }
    const ref = useRef(null)
    const navigate=useNavigate()
    const MakeAppointment = ()=>{
      navigateTo(`service/request-appointment/${id}`)
    }

useEffect(()=>{
    ScrollReveal().reveal(ref.current||"", {
      duration: 1000,
      distance:"30px",
      origin: 'bottom',
      ...reveal
  });
  
  return ()=>{
    ScrollReveal().clean(ref.current||"")
  }
    },[])
// controller des notes

 // rendre les notes(rating)
    const rating_light = []
    for (let index = 0; index < 5; index++) {
   
     if(index>rating-1){
       rating_light.push( <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
       stroke="currentColor" className="w-6 h-6 cursor-pointer text-blue-gray-500">
       <path stroke-linecap="round" stroke-linejoin="round"
         d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
       </path>
     </svg></span>)
     }else{
       rating_light.push(
         <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         fill="currentColor" className="w-6 h-6 text-yellow-300 cursor-pointer">
         <path fill-rule="evenodd"
           d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
           clip-rule="evenodd"></path>
       </svg>
       </span>)
     }
    }
   
  return (
    <div  ref={ref} className={`relative h-[550px]   flex flex-col ${className} bg-white shadow-sm border border-slate-200 rounded-lg lg:w-96 w-auto`}>
      <div className="relative p-2.5 h-96 overflow-hidden rounded-xl bg-clip-border">
        <img
        onClick={()=>{navigate(`/service/${id}`)}}
        src={img}
          alt="picture"
          className="h-full w-full object-cover rounded-md cursor-pointer"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-slate-800 text-lg font-semibold">
          {name[i18n.language as keyof typeof name].slice(0,18)}
          </p>
          <p className="text-cyan-600 text-xl font-semibold">
          {t("starting_from")} {setting.symbole_devise==="$"?(setting.symbole_devise.concat(prize.toString())):prize.toString().concat(setting.symbole_devise)}
          
          </p>
        </div>
        <div className=" flex items-center mt-2 justify-between">
            <div className="inline-flex items-center">
              
            {rating_light} <span className="text-sm">({rating} {t("client_reviews")})</span>
            </div>
           
        </div>
        <button onClick={MakeAppointment} className="rounded-md roboto-regular w-full mt-3 btn py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg  focus:shadow-none   active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
        {t("make_appointment")}
        </button>
      </div>
      </div>
  )
}

export default Card