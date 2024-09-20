import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useRef } from "react"
import { BsFacebook } from "react-icons/bs"
import { AiOutlineInstagram } from "react-icons/ai"
import { FaTiktok } from "react-icons/fa"
import { ImTwitter } from "react-icons/im"

type info = {
  fistname:string,
  lastname:string,
  email:string,
  message:string
}

const schema = yup
  .object({
    fistname: yup.string().required("ce champ est requis"),  
    lastname: yup.string().required("ce champ est requis"),    
    email: yup.string().required("ce champ est requis").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"email invalide"),    
    message: yup.string().required("ce champ est requis"),
  })
  .required()

const inputClass = "w-full border-solid border-2 bg-slate-200  p-2 outline-none  rounded-sm h-12"
const textareaClass= "w-full border-solid border-2  bg-slate-200 p-2 outline-none rounded-sm h-20 resize-none"
const labelClass ="self-start mt-3"
const contact =" contact@jahair.com"

function Contact() {
  const ref = useRef(null)

useEffect(()=>{

  ScrollReveal().reveal(ref.current, {
    duration: 1000,
    distance:"100px",
    origin: 'bottom',
    reset: false
});
return ()=>{
  ScrollReveal().clean(ref.current);
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
      
      <div className="relative" ref={ref}>
          <div className="lg:flex hidden flex-col absolute bottom-32 left-60">
            <h2 className="my-1  text-3xl font-mono  text-slate-950">Contacts</h2>

            <h4 className="text-slate-800">0039 32 89 70 50 26</h4>
            <h5 className="text-slate-800">{contact}</h5>
            <div className='py-6 flex gap-10 justify-normal'>
              <a className="scale-150" href=""><BsFacebook /></a>
              <a className="scale-150" href=""><AiOutlineInstagram /></a>
              <a className="scale-150" href=""><FaTiktok /></a>
              <a className="scale-150" href=""><ImTwitter /></a>
            </div>
          </div>

          <h1 className="text-center text-5xl font-bold text-slate-800">Contact</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-5 md:px-20 lg:px-32 py-5 lg:w-1/2 mx-auto justify-center items-center">
            <label className={labelClass} htmlFor="fistname">Nom<span className="text-red-600 ">*</span></label>
            <input   {...register("fistname")}   id="fistname" type="text" className={inputClass} />
            <p className="text-red-600 ">{errors.fistname?.message}</p>

            <label className={labelClass}  htmlFor="lastname">Prenom<span className="text-red-600 ">*</span></label>
            <input {...register("lastname")}  className={inputClass} id="lastname" type="text" />
            <p className="text-red-600 ">{errors.lastname?.message}</p>

            <label className={labelClass}  htmlFor="email">Email<span className="text-red-600 ">*</span></label>
            <input {...register("email")}  className={inputClass} id="email" type="text" />
            <p className="text-red-600 ">{errors.email?.message}</p>

            <label className={labelClass}  htmlFor="message">Message<span className="text-red-600 ">*</span></label>
            <textarea {...register("message")}  className={textareaClass} id="message"></textarea>
            <p className="text-red-600 ">{errors.message?.message}</p>

            <button type="submit" className="btn self-end px-4 py-2 mt-3 w-48 rounded-lg">Envoyer</button>
          </form>
      </div>
    </div>
  )
}

export default Contact