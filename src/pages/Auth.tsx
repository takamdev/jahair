import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useRef, useState } from "react"
import ScrollReveal from 'scrollreveal'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import bcrypt from "bcryptjs"
import { getAllCollection } from "../firebase/getCollections"
import { addCollection } from "../firebase/addCollection"
import Cookies from "js-cookie"
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



function Auth() {
  const ref = useRef(null)
  const navigateTo = useNavigate()
  const [isAdmin,setIsAdmin]=useState(false)
  const [load,setLoad]=useState(false)
  const [create,setCreate]=useState(false)
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
     getAllCollection("admin").then((admin)=>{
        //si pas d'admin
      if(admin.size===0){  
        //cree l'admin
        addCollection("admin",newAdmin).then((docRefAdmin)=>{
          setCreate(true)
          if(docRefAdmin.id!==undefined) setLoad(false)
        }).catch(err=>{
        console.error(err);
        
        
         
      })
        
      } 
       // si admin 
       admin.forEach(doc=>{
        const getAdmin = doc.data()
         
        const isvalid = bcrypt.compareSync(data.password, getAdmin.password);
       
        if(isvalid){
         // cree un token en suppriment / du password crypté
         const tab = password.split("")
         let token =""
         tab.forEach(element =>{
           if(element!=="/"){
             token=token+element
           }
         })

         Cookies.set('token', token, { expires: 1 });
         navigateTo(`dashboard/${token}`,{unstable_viewTransition:true})
         setLoad(false)
        } 
         else {
           setIsAdmin(true)// afficher le messade d'erreur
           setLoad(false)// arreté le chargement
         }
        
       
     })
     }).catch(errors=>console.error(errors))

  }

  return (
    <div className="container my-14 lg:my-48 h-full mx-auto">
      
      <div className="relative" ref={ref}>
          <h1 className="text-center text-5xl font-bold text-slate-800">Admin</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-5 md:px-20 lg:px-32 py-5 lg:w-1/2 mx-auto justify-center items-center">
            {
              isAdmin?<p className="text-red-600">address email ou mot de passe invalid</p>:""
            }
            {
              create?<p className="text-green-500">admin crée avec success connectez vous!</p>:""
            }
            <label className={isAdmin?"self-start":"labelClass"}  htmlFor="email">Email<span className="text-red-600 ">*</span></label>
            <input {...register("email")}  className={"inputClass"} id="email" type="text" />
            <p className="text-red-600 ">{errors.email?.message}</p>

            <label className={"labelClass"}  htmlFor="password">Mot de passe<span className="text-red-600 ">*</span></label>
            <input {...register("password")}  className={"inputClass"} id="password" type="password" />
            <p className="text-red-600 ">{errors.password?.message}</p>
            <Link className="mt-5 hover:text-rose-300"  to="forget-password">mot de passe oublie ?</Link>
            <button type="submit" disabled={load}  className="text-white btn self-end focus:ring-0  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
              
            {load?(
              <>
               <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-lg text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>
              connexion...
              </>
            ):"connecter"} 
             
            </button>
          </form>
      </div>
    </div>
  )
}

export default Auth