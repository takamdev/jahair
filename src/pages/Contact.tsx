import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useRef, useState } from "react"
import { BsFacebook } from "react-icons/bs"
import { AiOutlineInstagram } from "react-icons/ai"
import { FaTiktok } from "react-icons/fa"
import { ImTwitter } from "react-icons/im"
import ScrollReveal from 'scrollreveal'
import useStore from "../store"
import { useTranslation } from "react-i18next"
import '../i18n'; // Assure-toi d'importer la configuration i18n
import axios from "axios"

type info = {
  fistname:string,
  lastname:string,
  email:string,
  message:string
}

const schema = yup
  .object({
    fistname: yup.string().required("required"),  
    lastname: yup.string().required("required"),    
    email: yup.string().required("required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"invalid_email"),    
    message: yup.string().required("required"),
  })
  .required()



function Contact() {
  const { t } = useTranslation();
  
  const [load,setLoad]=useState(false)
  const ref = useRef(null)
  const setting = useStore(state=>state.setting)
useEffect(()=>{

  ScrollReveal().reveal(ref.current||"", {
    duration: 1000,
    distance:"100px",
    origin: 'bottom',
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
    reset
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data:info) => {
    setLoad(true)
    const body = {
      html:`
      <!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Contact</title>
   </head>
   <body>

      <main className="container">
         <h1 className="title">${data.lastname} ${data.fistname} vous a envoyé un message</h1>

         <div className="contain">
           ${data.message}
         </div>
        <a style="margin-top: 15px;" className="link" href="mailto:${data.email}">répondre</a>
      </main>
   </body>
</html>
      `,
      subjet:"client de jahairstyle",
      email:setting.email_site
    }

    axios.post(process.env.baseURL+"/api/sendmail",body).then(res=>{
      console.log(res.data);
     

      
    }).catch(errors=>console.log(errors)
    ).finally(()=>{
      reset()
      setLoad(false)

    })
  }

  return (
    <div className="container my-14 lg:my-48 h-full mx-auto">
      
      <div className="relative" ref={ref}>
          <div className="lg:flex hidden flex-col absolute bottom-32 left-60">
            <h2 className="my-1  text-3xl font-mono  text-slate-950">{t('contacts')}</h2>

            <h4 className="text-slate-800">{setting.social_links.whatsapp}</h4>
            <h5 className="text-slate-800">{setting.email_site}</h5>
            <div className='py-6 flex gap-10 justify-normal'>
              <a className="scale-150" href={setting.social_links.facebook}><BsFacebook /></a>
              <a className="scale-150" href={setting.social_links.instagram}><AiOutlineInstagram /></a>
              <a className="scale-150" href={setting.social_links.tiktok}><FaTiktok /></a>
              <a className="scale-150" href={setting.social_links.twitter}><ImTwitter /></a>
            </div>
          </div>

          <h1 className="text-center text-5xl font-bold text-slate-800">{t('contact')}</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-5 md:px-20 lg:px-32 py-5 lg:w-1/2 mx-auto justify-center items-center">
            <label className={"labelClass"} htmlFor="fistname">{t('firstname')}<span className="text-red-600 ">*</span></label>
            <input   {...register("fistname")}   id="fistname" type="text" className={"inputClass focus:border-0 "} />
            <p className="text-red-600 ">{t(errors.fistname?.message as string)}</p>

            <label className={"labelClass"}  htmlFor="lastname">{t('lastname')}<span className="text-red-600 ">*</span></label>
            <input {...register("lastname")}  className={"inputClass"} id="lastname" type="text" />
            <p className="text-red-600 ">{t(errors.lastname?.message as string)}</p>

            <label className={"labelClass"}  htmlFor="email">{t('email')}<span className="text-red-600 ">*</span></label>
            <input {...register("email")}  className={"inputClass"} id="email" type="text" />
            <p className="text-red-600 ">{t(errors.email?.message as string)}</p>

            <label className={"labelClass"}  htmlFor="message">{t('message')}<span className="text-red-600 ">*</span></label>
            <textarea {...register("message")}  className={"textareaClass"} id="message"></textarea>
            <p className="text-red-600 ">{t(errors.message?.message as string)}</p>

            <button type="submit" disabled={load}  className="text-white mt-3 btn self-end focus:ring-0  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
              
              {load?(
                <>
                 <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-lg text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                {t('sending')}...
                </>
              ): `${t('send')}`} 
               
              </button>
          </form>
      </div>
    </div>
  )
}

export default Contact