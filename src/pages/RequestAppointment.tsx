import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useRef, useState } from "react"
import ScrollReveal from 'scrollreveal'
import useStore from "../store"
import { useTranslation } from "react-i18next"
import '../i18n'; // Assure-toi d'importer la configuration i18n
import { type_service } from "../types/type_service"

type info = {
  fistname:string,
  lastname:string,
  email:string,
  postcode:string
  adresse:string,
  city:string,
  date:Date
}

type serviceName = {
  fr:string,
  en:string,
  it:string
}
const schema = yup
  .object({
    fistname: yup.string().required("required"),  
    lastname: yup.string().required("required"),    
    email: yup.string().required("required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"invalid_email"),    
    adresse:yup.string().required('required'),
    postcode:yup.string().required('required'),
    city:yup.string().required('required'),
    phone:yup.string().required("required").matches(/^\+?(?:[0-9]{1,3})?\s?(?:\([0-9]{1,3}\)|[0-9]{1,3})?\s?[0-9]{3,5}\s?[0-9]{4,9}$/,"invalid_nomber"),
    date:yup.date().required("required").min(new Date(),"min")
  })
  .required()



function RequestAppointment() {
  const service = useStore(state=>state.service)
  const { t ,i18n} = useTranslation();
  
  const {id}=useParams()
  const [serviceName,setServiceName] = useState<serviceName>()
  const [load,setLoad]=useState(false)
  const ref = useRef(null)
useEffect(()=>{
  setLoad(false)//inutil

  if(service.length!==0){
    const findService = service.find(item=>item.id===id) as type_service
    const serviceName = {
      fr:findService.name.split(",")[0],
      en:findService.name.split(',')[1],
      it:findService.name.split(',')[2]
     }
     setServiceName(serviceName)
  }
  ScrollReveal().reveal(ref.current||"", {
    duration: 1000,
    distance:"500px",
    origin: 'left',
    reset: false
});
return ()=>{
  ScrollReveal().clean(ref.current||"");
}

},[])


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data:info) => console.log(data)

  return (
    <div className="container my-14 lg:my-48 h-full mx-auto">
      
      <div className="relative bg-slate-50 lg:p-10" ref={ref}>
          <h1 className="text-center text-4xl font-medium  text-slate-800">{t('appointment_for')} <span className="font-bold text-red-600">{serviceName!==undefined&&serviceName[i18n.language as keyof typeof serviceName]}</span></h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  mt-5 md:px-20 lg:px-32 py-5 w-full mx-auto justify-center items-center">
             <div className="md:w-full flex gap-10 flex-col md:flex-row">
                <div className="w-full flex flex-col gap-5">
                   
                        <p className="w-full">
                          <label className={"labelClass"} htmlFor="fistname">{t('firstname')}<span className="text-red-600 ">{errors.fistname?"*":""}</span></label>
                          <input   {...register("fistname")}   id="fistname" type="text" className={"inputClass focus:border-0 "} />
                        </p>



                        <p className="w-full">
                        <label className={"labelClass"}  htmlFor="adresse">{t('adresse')}<span className="text-red-600 ">{errors.adresse?"*":""}</span></label>
                        <input {...register("adresse")}  className={"inputClass"} id="adresse" type="text" />
                      </p>

                        <p className="w-full">
                          <label className={"labelClass"} htmlFor="postcode">{t('postcode')}<span className="text-red-600 ">{errors.postcode?"*":""}</span></label>
                          <input   {...register("postcode")}   id="postcode" type="text" className={"inputClass focus:border-0 "} />
                        </p>


 
                        <p className="w-full">
                          <label className={"labelClass"}  htmlFor="email">{t('email')}<span className="text-red-600 ">{errors.email?"*":""}</span></label>
                          <input {...register("email")}  className={"inputClass"} id="email" type="email" />
                        </p>
                      
                   
                  </div>
                

                <div className="w-full flex flex-col gap-5">
                  
                    <p className="w-full">
                          <label className={"labelClass"}  htmlFor="lastname">{t('lastname')}<span className="text-red-600 ">{errors.lastname?"*":""}</span></label>
                          <input {...register("lastname")}  className={"inputClass"} id="lastname" type="text" />
                        </p>

                        <p className="w-full">
                          <label className={"labelClass"} htmlFor="phone">{t('phone')}<span className="text-red-600 ">{errors.phone?"*":""}</span></label>
                          <input   {...register("phone")}   id="phone" type="tel" className={"inputClass focus:border-0 "} />
                        </p>


                        <p className="w-full">
                          <label className={"labelClass"}  htmlFor="city">{t('city')}<span className="text-red-600 ">{errors.city?"*":""}</span></label>
                          <input {...register("city")}  className={"inputClass"} id="city" type="text" />
                        </p>

                        <p className="w-full">
                        <label className={"labelClass"}  htmlFor="date">{t('date')}<span className="text-red-600 ">{errors.date?"*":""}</span></label>
                        <input {...register("date")}  className={"inputClass"} id="date" type="datetime-local" />
                      </p>
                    
                   
                </div>
             </div>

            <button type="submit" disabled={load}  className="text-white mt-3 btn self-end focus:ring-0  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-10 md:me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
              
              {load?(
                <>
                 <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-lg text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                {t('make_appointment')}...
                </>
              ): `${t('make_appointment')}`}
               
              </button>
          </form>
      </div>
    </div>
  )
}

export default RequestAppointment