import { AiFillEye } from "react-icons/ai"; 
import { AiFillEyeInvisible } from "react-icons/ai"; 
import { useEffect, useRef, useState } from "react"
import ScrollReveal from 'scrollreveal'
import axios from "axios"
import useStore from "../store"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { editDoc } from "../firebase/editDoc"
import { getAllCollection } from "../firebase/getCollections"
import  bcrypt  from "bcryptjs";
import { useLocation, useNavigate } from "react-router-dom";
const labelClass ="self-start mt-3"

type info = {
  password:string,
  confirm_password:string,
}
const passwordRegex = /^(?=.*[A-Z])(?=(?:.*[a-zA-Z]){3,})(?=.*\d{2,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const schema = yup
  .object({
    password: yup.string().required("required").matches(passwordRegex, 'Le mot de passe doit contenir au moins 2 chiffres, 3 lettres, 1 caractère spécial et 1 majuscule'),  
    confirm_password: yup.string().oneOf([yup.ref('password')], 'Les mots de passe doivent correspondre').required("required"),    
  })
  .required()

function ForgetPassword() { 
  const [code,setCode] = useState('') 
  const [showform,SetShowform]=useState(false)
  const [isCorrectCode,setIScorrectCode]=useState(false)
  const [load,setLoad]=useState(false)
  const ref = useRef(null)
  const settting = useStore(state=>state.setting)
// envoie du mail de verification
function sendOTP(){
  setIScorrectCode(false)
  const body = {
    email:settting.email_site,
    subjet:"réinitialisation du mot de passe"
   }
   axios.post(`${process.env.baseURL}/api/admin/resquest-reset-password`,body).then(response=>{
    console.log(response.data);
    
   }).catch(err => console.log(err)
   )
}
  // effet scroll
useEffect(()=>{

  sendOTP()

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




// verification coté serveur
const onSubmit = () => {
   if(code.length!==0){
    setLoad(true)
    const body = {
      token:code,
     }
     axios.post(`${process.env.baseURL}/api/admin/reset-password`,body).then(response=>{
      setLoad(false)
      if(response.data.successfull===true) SetShowform(true)
        else setIScorrectCode(true)
     }).catch(err => {
      setLoad(false)
      if(err.response.data.successfull==false) setIScorrectCode(true)
        console.log(err)
     }
     )


   }
   
}


  return (
    <div className="container my-14 lg:my-48 h-full mx-auto">
      
      <div className="relative" ref={ref}>
          <h1 className="text-center text-5xl font-bold text-slate-800"> {showform? "Reset" : "Forget"} password</h1>

           {
            showform ? <ResetPassword/> :
            <div className="flex flex-col px-5 md:px-20 lg:px-32 py-5 lg:w-1/2 mx-auto justify-center items-center">
            <label className={labelClass}  htmlFor="email">entrez le code reçu a l'address email {settting.email_site.slice(0,3)}******{settting.email_site.slice(settting.email_site.indexOf('@'))} <span className="text-red-600 ">*</span></label>
            <input value={code} onChange={(e)=>{setCode(e.target.value)}} placeholder="ex: 641170"  className={"inputClass mt-2"} id="email" type="text" />
            <p role="button" className="mt-5 hover:text-rose-300" onClick={sendOTP}>renvoiyer le code !</p>
            
            {
              isCorrectCode && <p className="text-red-700 text-lg">code incorrect</p>

            }
            <button type="submit" onClick={onSubmit} disabled={load || code.length !== 0 ? false : true} className="btn self-end px-2 py-2 mt-3 w-28 rounded-lg">{load ? "vérification...":"vérifier"}</button>
          </div>
           }
      </div>

    </div>
  )
}


function ResetPassword(){

  const [load,setLoad]=useState(false)
  const [inputType1,setInputType1]=useState('password')
  const [inputType2,setInputType2]=useState('password')
  const navigateTo = useNavigate()
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: yupResolver(schema),
})

const onSubmit = async (data:info) =>{
  setLoad(true)

     let id = ""
      // cryptage du mot de passe
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(data.password, salt) as string;

  // modification de la collection admin
  const admin = await getAllCollection('admin')
  admin.forEach(admin=>{
   id = admin.id
  })
 const params = {
  collection_name:"admin",
  id_doc:id,
  data:{
    password:password
  }
 }
  editDoc(params).then(()=>{
    setLoad(false)
    navigateTo('/admin')
  }).catch(err=>console.log(err)
  )
// takamLOIC25@
 
}


return (
  <form onSubmit={handleSubmit(onSubmit)} className="flex mt-14 flex-col px-5 md:px-20 lg:px-32 py-5 lg:w-1/2 mx-auto justify-center items-center">
            <label className={"labelClass"} htmlFor="fistname">entrez le nouveau mot de passe<span className="text-red-600 ">*</span></label>
            <p className="relative w-full">
              <input   {...register("password")}   id="fistname" type={inputType1} className={"inputClass focus:border-0 "} />
             <span className="absolute right-5 top-4 scale-150">{

              inputType1 === "password" ?  <AiFillEyeInvisible onClick={()=>{setInputType1("text")}} /> :   <AiFillEye onClick={()=>{setInputType1("password")}} />

              }</span>
            </p>
            <p className="text-red-600 ">{errors.password?.message as string}</p>

            <label className={"labelClass"}  htmlFor="lastname">repeter le mot de passe<span className="text-red-600 ">*</span></label>
           
            <p className="relative w-full">
            <input {...register("confirm_password")}  className={"inputClass"} id="lastname" type={inputType2} />
             <span className="absolute right-5 top-4 scale-150">
              
                      {

                        inputType2 === "password" ?  <AiFillEyeInvisible onClick={()=>{setInputType2("text")}} /> :   <AiFillEye onClick={()=>{setInputType2("password")}} />

                        }
            
              
              </span>
            </p>

           
            <p className="text-red-600 ">{errors.confirm_password?.message as string}</p>
            <button type="submit" disabled={load} className="btn self-end px-4 py-2 mt-3 w-48 rounded-lg"> {load?"modification...":"modifier"}</button>
  </form>
)
}
export default ForgetPassword