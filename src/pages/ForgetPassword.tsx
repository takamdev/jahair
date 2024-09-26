import { useEffect, useRef, useState } from "react"
import ScrollReveal from 'scrollreveal'

const inputClass = "w-full border-solid border-2 bg-slate-200  p-2 outline-none  rounded-sm h-12"
const labelClass ="self-start mt-3"

function ForgetPassword() { 
  const [email,setEmail] = useState('') 
  const ref = useRef(null)

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

const onSubmit = () => {
    console.log(email+"hello");
}

  return (
    <div className="container my-14 lg:my-48 h-full mx-auto">
      
      <div className="relative" ref={ref}>
          <h1 className="text-center text-5xl font-bold text-slate-800">Forget password</h1>
          <div className="flex flex-col px-5 md:px-20 lg:px-32 py-5 lg:w-1/2 mx-auto justify-center items-center">
            <label className={labelClass}  htmlFor="email">Email<span className="text-red-600 ">*</span></label>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="entrez votre address email"  className={inputClass} id="email" type="text" />
            <button type="submit" onClick={onSubmit} disabled={email.length !== 0 ? false : true} className="btn self-end px-4 py-2 mt-3 w-48 rounded-lg">Envoyer</button>
          </div>
      </div>
    </div>
  )
}

export default ForgetPassword