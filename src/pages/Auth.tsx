import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useRef, useState } from "react"
import ScrollReveal from 'scrollreveal'
import { Link } from "react-router-dom"
import { db } from "../firebase/config"
import { useNavigate } from "react-router-dom"
import {collection,getDocs ,addDoc} from "firebase/firestore/lite"
import bcrypt from "bcryptjs"
import useStore from "./../store"
type info = {
  email:string,
  password:string
}

const schema = yup
  .object({
       
    email: yup.string().required("ce champ est requis").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"email invalide"),    
    password: yup.string().required("ce champ est requis"),
  })
  .required()

const inputClass = "w-full border-solid border-2 bg-slate-200  p-2 outline-none  rounded-sm h-12"
const labelClass ="self-start mt-3"

function Auth() {
  const ref = useRef(null)
  const navigateTo = useNavigate()
  const [isAdmin,setIsAdmin]=useState(false)
  const [load,setLoad]=useState(false)
  const setToken = useStore((state)=>state.setToken)
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
  } = useForm({
    resolver: yupResolver(schema),
  })

  // connexion ou enregistrement de l'administrateur
  const onSubmit = async (data:info) => {
    setLoad(true)
    // cryptage du mot de passe
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(data.password, salt);
   
    
    // information de l'admin
    const newAdmin = {
      email:data.email,
      password:password
     }

    // verifier s'il y'a un administrateur
        const refAdmin = collection(db,"admin")
       try {
        const admin = await getDocs(refAdmin)
        //si pas d'admin
        if(admin.size===0){
          //cree l'admin
          const docRefAdmin = await addDoc(refAdmin,newAdmin)
          if(docRefAdmin.id!==undefined) setLoad(false)


        } 
        // si admin 
        admin.forEach(doc=>{
           const getAdmin = doc.data()
           const isvalid = bcrypt.compareSync(data.password, getAdmin.password);
          
           if(isvalid){
            // cree un token
            const tab = password.split("")
            let token =""
            tab.forEach(element =>{
              if(element!=="/"){
                token=token+element
              }
            })
            setToken(token)
            navigateTo(`dashboard/${token}`)
            setLoad(false)
           } 
            else {
              setIsAdmin(true)
              setLoad(false)
            }
           
          
        })
       } catch (error) {
        console.log("erreur");
        
        console.log(error);
        
       }
  }

  return (
    <div className="container my-14 lg:my-48 h-full mx-auto">
      
      <div className="relative" ref={ref}>
          <h1 className="text-center text-5xl font-bold text-slate-800">Admin</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-5 md:px-20 lg:px-32 py-5 lg:w-1/2 mx-auto justify-center items-center">
            {
              isAdmin?<p className="text-red-600">address email ou mot de passe invalid</p>:""
            }
            <label className={isAdmin?"self-start":labelClass}  htmlFor="email">Email<span className="text-red-600 ">*</span></label>
            <input {...register("email")}  className={inputClass} id="email" type="text" />
            <p className="text-red-600 ">{errors.email?.message}</p>

            <label className={labelClass}  htmlFor="password">Mot de passe<span className="text-red-600 ">*</span></label>
            <input {...register("password")}  className={inputClass} id="password" type="password" />
            <p className="text-red-600 ">{errors.password?.message}</p>
            <Link className="mt-5 hover:text-rose-300"  to="forget-password">mot de passe oublie ?</Link>
            <button type="submit" disabled={load} className="btn self-end px-4 py-2 mt-3 w-48 rounded-lg">
               {load?"connexion...":"connecter"} 
              </button>
          </form>
      </div>
      
    </div>
  )
}

export default Auth