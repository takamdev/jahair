import { BiArrowBack } from "react-icons/bi"; 
import useStore from "../store";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Label, Radio } from "flowbite-react";
import StripeContainer from "../stripe/StripeContainer";
type info = {
    fullname:string,
    address:string,
    city:string,
    postal_code:string,
    phone:number,
    email:string,

  }
  
  const radiotheme = {
    "root": {
      "base": "h-4 w-4 border border-gray-300 text-[#ff66c4]  focus:ring-0  dark:border-gray-600 dark:bg-gray-700 dark:focus:bg-cyan-600 dark:focus:ring-cyan-600"
    }
  }
  const schema = yup
    .object({
      fullname: yup.string().required("required"),       
      address: yup.string().required("required"), 
      city: yup.string().required("required"), 
      postal_code: yup.string().required("required"), 
      phone:yup.number().required("required"), 
      email: yup.string().required("required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"invalid_email"),    
    })
    .required()
function Init_payment() {
    const Cart = useStore(state=>state.Cart)
    const setting = useStore(state=>state.setting)
    const {i18n,t} = useTranslation()
    const [activeVue, setActiveVue]=useState<boolean[]>([true,false])
    const [methode,setMethode]=useState<string>('paypal')
    const navigation = useNavigate()
    const [dataForm,setDataForm]=useState<info|null>(null)
    const carttiltle = Cart.map(item=>{
        return {...item,title:{fr:item.title.split(",")[0],en:item.title.split(",")[1],it:item.title.split(",")[2]}}
    })
     const livrason_price = 20

     const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      })
    


const navigate =()=>{
    reset()
    if(activeVue[0]) navigation("/")
        else if(activeVue[1]) setActiveVue([true,false])
            else if(activeVue.filter(item=>item===true).length===0) setActiveVue([false,true])
    
               
}

const onSubmit = (data:info) => {
    setDataForm(data)
    setActiveVue([false,false])
  }
  return (
    <main className="mt-10 p-5 lg:p-14 mb-40">
        <article className="lg:w-[1200px] mx-auto">
            <p className="flex items-center text-lg font-medium   gap-1"><BiArrowBack /><button onClick={navigate} type="button" >{t("previous")}</button></p>
            <div className="flex justify-center flex-col md:flex-row  md:gap-24 mt-8">
                <div className="p-3 w-full">
                <div className="border-b-2">
                <h1 className="text-lg font-medium text-slate-700">{t("pay")} Jahair Style</h1>
                    <p className="text-2xl font-bold me-5 mb-5 ">
                            {setting.symbole_devise==="$"?setting.symbole_devise +Cart.reduce((acc,item)=>acc+(item.prize*item.qte!),livrason_price):Cart.reduce((acc,item)=>acc+(item.prize*item.qte!),livrason_price)+setting.symbole_devise}   
                    </p>
                    {
                    carttiltle.map((item,index)=>{
                        return  <p key={index} className="text-slate-700 font-normal flex">
                            <span>{item.title[i18n.language as keyof typeof item.title]}</span> 
                            <span className="ms-auto">{setting.symbole_devise==="$"?setting.symbole_devise +item.prize*item.qte!:item.prize*item.qte!+setting.symbole_devise}
                            </span>
                            </p>
                    }) 
                    }
                    <p className="mt-5 flex mb-2 text-slate-700 font-normal"><span >{t("total")} </span>
                        <span className="ms-auto">                    {setting.symbole_devise==="$"?setting.symbole_devise +Cart.reduce((acc,item)=>acc+(item.prize*item.qte!),0):Cart.reduce((acc,item)=>acc+(item.prize*item.qte!),0)+setting.symbole_devise}
                        </span>
                    </p>

                </div>
                <div className="border-b-2">
                <p className="mt-5 flex mb-2 text-slate-700 font-normal"><span > {t('Livason')} <br /> {t("standard_delivery")} </span>
                        <span className="ms-auto">${livrason_price}</span>
                    </p>
                </div>
                   
                <p className="mt-5 flex mb-2 text-slate-700 font-normal"><span > {t("total_of")} </span>
                        <span className="ms-auto">                            {setting.symbole_devise==="$"?setting.symbole_devise +Cart.reduce((acc,item)=>acc+(item.prize*item.qte!),livrason_price):Cart.reduce((acc,item)=>acc+(item.prize*item.qte!),livrason_price)+setting.symbole_devise}   
                        </span>
                    </p>
                </div>

                {
                    activeVue[0]?<div className="p-3 w-full">
               
                    <h1 className="text-lg font-medium text-slate-700"> {t("shopping_info")} </h1>
                        <div className="block w-full mt-5">
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-600 w-full"> {t("shopping_desti")} </label>
                            <select id="countries" className="h-12 bg-slate-100 focus:ring-0 border-0 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none">
                            <option className="" selected>Choose a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                            </select>
                        
                       
    
                    </div>
                    <div className="w-full">
                      <p className="block mb-2 text-sm font-medium text-gray-600 w-full mt-5"> {t("shopping_opt")} </p>
                      <p className="mt-5 border-2 p-3 rounded-md font-medium flex mb-2 text-slate-700 cursor-pointer"><span > {t("standard_delivery")} </span>
                            <span className="ms-auto">${livrason_price}</span>
                        </p>
                         <button onClick={()=>{setActiveVue([false,true])}} className="btn w-full rounded-md block p-2 text-center font-medium text-lg mt-3"  type="button"> {t("continue")} </button>
                    </div>
                    </div> : activeVue[1] ? <div className="w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col    mx-auto justify-center items-center">
                        

                                <label className={"labelClass"}  htmlFor="email">{t('email')}<span className="text-red-600 ">*</span></label>
                                <input {...register("email")}  className={"inputClass"} id="email" type="text" />
                                <p className="text-red-600 ">{t(errors.email?.message as string)}</p>

                                <label className={"labelClass"} htmlFor="fullname">{t('fullname')}<span className="text-red-600 ">*</span></label>
                                <input   {...register("fullname")} placeholder="votre nom complet"  id="fullname" type="text" className={"inputClass focus:border-0 "} />
                                <p className="text-red-600 ">{t(errors.fullname?.message as string)}</p>

                                <label className={"labelClass"}  htmlFor="phone">{t('phone')}<span className="text-red-600 ">*</span></label>
                                <input {...register("phone")}  className={"inputClass"} id="phone" type="tel" />
                                <p className="text-red-600 ">{t(errors.phone?.message as string)}</p>

                                <label className={"labelClass"} htmlFor="postal_code">{t('postal_code')} <span className="text-red-600 ">*</span></label>
                                <input   {...register("postal_code")}  id="postal_code" type="text" className={"inputClass focus:border-0 "} />
                                <p className="text-red-600 ">{t(errors.postal_code?.message as string)}</p>

                                <label className={"labelClass"}  htmlFor="city">{t('city')}<span className="text-red-600 ">*</span></label>
                                <input {...register("city")}  className={"inputClass"} id="city" type="text" />
                                <p className="text-red-600 ">{t(errors.phone?.message as string)}</p>

                                <label className={"labelClass"} htmlFor="address"> {t("address")} <span className="text-red-600 ">*</span></label>
                                <input   {...register("address")}   id="fullname" type="text" className={"inputClass focus:border-0 "} />
                                <p className="text-red-600 ">{t(errors.address?.message as string)}</p>
                              
                              
                                <button type="submit" className="text-white mt-3 btn self-end focus:ring-0  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                                {t('continue')}
                                
                                </button>
                            </form>
                    </div> : <>
                                <div className="w-full">
                                     <fieldset defaultValue={methode}   className="flex  flex-col">
                                          <legend className="mb-4 text-slate-700 font-normal text-lg roboto-medium"> {t("payment_method")} </legend>

                                          <div className="border-[1px] cursor-pointer flex items-center  rounded-t-md p-4  ">
                                            <p className="flex cursor-pointer  items-center gap-2">
                                            <Radio className="cursor-pointer" theme={radiotheme} id="paypal" name="methode" value="paypal"  defaultChecked onChange={(e)=>{setMethode(e.target.value)}} />
                                            <Label className="cursor-pointer" htmlFor="paypal">Paypal</Label>
                                            </p>


                                            <Label   htmlFor="card" className="w-1/2 h-6 cursor-pointer ms-auto -me-20 ">
                                                <img src="/paypal.svg" className="w-full cursor-pointer h-full "  alt="paypal methode" />
                                            </Label>
                                          </div>
                                          <div className="border-[1px] w-full cursor-pointer flex items-center rounded-b-md p-4 ">
                                            <p className="flex  items-center gap-2">
                                            <Radio className="cursor-pointer" theme={radiotheme} id="card" name="methode" value="card" onChange={(e)=>{setMethode(e.target.value)}}  />
                                            <Label htmlFor="card" className="cursor-pointer">Options de paiment populaires</Label>
                                            </p>

                                            <Label htmlFor="card" className="w-1/2 ms-auto cursor-pointer -me-11 h-6">
                                                <img src="/cards_payment.svg" className="w-full h-6 cursor-pointer"  alt="card methode" />
                                            </Label>
                                          </div>
                                     </fieldset>

                                     <div className="mt-3">
                                        {
                                            methode==="paypal" ? <div>
                                                 <p className="text-center text-lg roboto-medium">Paypal is not yet integrated</p>
                                            </div>:<StripeContainer email={dataForm?.email as string} amount={Cart.reduce((acc,item)=>acc+(item.prize*item.qte!),livrason_price)}/>

                                        }
                                     </div>
                                </div>
                            </>
                }
                
            </div>
        </article>

    </main>
  )
}

export default Init_payment