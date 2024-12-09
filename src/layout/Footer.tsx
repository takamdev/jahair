import { AiOutlinePlus } from "react-icons/ai"; 
import { FaTiktok } from "react-icons/fa"; 
import { AiOutlineInstagram } from "react-icons/ai"; 
import { BsFacebook } from "react-icons/bs"; 
import { Link } from "react-router-dom";

import useStore from "../store";
import { FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { BiSend } from "react-icons/bi";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Note_product from "../components/Note_product";
import { addCollection } from "../firebase/addCollection";
import { addFile } from "../firebase/addFile";

type info = {
    fistname:string,
    message:string,
    email:string
  }  

  const schema = yup
  .object({
    fistname: yup.string().required("ce champ est requis"),   
    email: yup.string().required("ce champ est requis").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"email invalide"),     
    message: yup.string().required("ce champ est requis"),
  })
  .required()
function Footer() {
  const setting = useStore(state=>state.setting)
  const [submiting,setSubmiting]=useState(false)
  const [note,setNote]=useState(0)
  const [imgSelect,setImgSelect]=useState<string>("")

  const {t}=useTranslation()

  // vailadation des avis

const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  resolver: yupResolver(schema),
})

const getPhoto = (file:File|null)=>{
  if(file){
    const url_name = URL.createObjectURL(file)+ " "+file.name
    setImgSelect(url_name)
  }else{
    setImgSelect("")
  }

}

// envoie de l'avis client
const onSubmit = async (data:info) =>{
  setSubmiting(true)

  const image_firebase = await addFile(imgSelect,"image/*");

  const testimonials = {
    name:data.fistname,
    message:data.message,
    email:data.email,
    note:note,
    img:image_firebase,
    show:false
  }
// ajout de l'avis
addCollection("testimonials",testimonials).then(()=>{

}).catch(err=>console.log(err)

).finally(()=>{
  setSubmiting(false)
  reset()
})

}
  return (
    <footer className="h-3/4 text-neutral-700 pb-5 bottom-0  bg-neutral-200">
       <section className="flex flex-col-reverse lg:flex-row lg:justify-center  mx-5 py-16 h-5/6">
       <article className="flex flex-col mt-5 lg:mt-1 ">
            <div className="w-full ">
            <h3 className="text-start font-bold text-3xl underline mb-2">{t("witnessed")}!</h3>
            <p className="mb-3 text-color">{t("to_support_us")}</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <label className={"labelClass"} htmlFor="fistname">{t("firstname")}<span className="text-red-600 ">*</span></label>
                  <input   {...register("fistname")}   id="fistname" type="text" className={" w-full   bg-slate-200  p-2 focus:ring-0  border-0 rounded-sm h-10  focus:border-0 "} />
                  <p className="text-red-600 ">{errors.fistname?.message}</p>


                  <label className={"labelClass block my-4"} htmlFor="photo">{t("select_photo")}<span className={`${imgSelect.length===0 ? "text-red-600":"text-green-500"} inline`}> <AiOutlinePlus className="inline cursor-pointer" /></span></label>
                  <input type="file" onChange={(e)=>{getPhoto(e.target.files![0])}} accept="image/*" id="photo" />

                  <label className={"labelClass"}  htmlFor="email">{t("email")}<span className="text-red-600 ">*</span></label>
                  <input {...register("email")}  className={" w-full   bg-slate-200  p-2 focus:ring-0  border-0 rounded-sm h-10  focus:border-0 "} id="email" type="text" />
                  <p className="text-red-600 ">{errors.email?.message}</p>
                  
                  <label className={"labelClass"}  htmlFor="message">{t("message")}<span className="text-red-600 ">*</span></label>
                  <textarea {...register("message")}  className={"w-full bg-slate-200 p-2 focus:ring-0 focus:border-0 border-0 rounded-sm h-14 resize-none"} id="message"></textarea>
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
           
          </article> 

          <article className="flex flex-col mt-1 ">
            <img src={setting.logo} className="h-14 lg:mx-5 w-28" alt="logo" /> 
            <p className=" w-80 lg:mx-5 my-5">
              {t("motivation_footer")} 
            </p>
            <div className='text-neutral-500 flex gap-10 mx-5'>
              <a className="scale-150 " href={setting.social_links.facebook}><BsFacebook /></a>
              <a className="scale-150"  href={setting.social_links.instagram}><AiOutlineInstagram /></a>
              <a className="scale-150"  href={setting.social_links.tiktok}><FaTiktok /></a>
              <a className="scale-150"  href={setting.social_links.twitter}><FaXTwitter /></a>
            </div>
          </article>
          
          <article className="flex flex-col lg:flex-row gap-5">
            <div className="flex flex-col lg:mx-10">
              <h2 className="text-gray-900 font-bold"> {t("payment_method")}</h2>
              <p className="w-80">
                <img src="/payment_methode.webp" className="mt-5 lg:mt-12" alt="payment methode" />
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-gray-900 font-bold">{t("customer_services")}</h2>
              <a className="underline" href="/faq">FAQ</a>
              <a className="underline" href="/contact">{t("contact")}</a>
              <a className="underline" href="/entretien">{t("wig_maintenace")}</a>
              <a className="underline" href="/privacy-policy">{t("priva_cypolicy")}</a>
              <a className="underline" href="/terms-and-conditions">{t("terms_conditions")}</a>
            </div>
            <div className="flex gap-3 flex-col">
            <h2 className="text-gray-900 font-bold">{t("about")}</h2>
            <Link className="underline" to="/about-us">{t("about")}</Link>
            </div>
          </article>
       </section>
       
        <div className='py-3 lg:p-6 text-sm relative flex items-center flex-col lg:flex-row lg:justify-center lg:gap-1 bordureFooter'>
          <span> Copyright © 2024 <b className="font-semibold">JAHAIR STYLE</b></span>. <p>All rights reserved Designed by <a target="blank" className="underline text-red-700 font-bold" href="https://takam-loic-junior.vercel.app">Loic Takam</a></p> 
        </div>
    </footer>
  )
}

export default Footer