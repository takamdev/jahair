import {useEffect, useRef } from "react"
import useStore from "../store"
import { type_product } from "../types/type_product"
import ScrollReveal from 'scrollreveal'
import Rating from "./Rating"
import { useTranslation } from "react-i18next"
function Card({product,className,reveal}:{product:type_product,className?:string,reveal?:any}) {
  const setting = useStore(state=>state.setting)

  // recuperation des tradustions
  const prepareTranslate = (object:string)=>{
    return {fr:object.split(",")[0],en:object.split(',')[1],it:object.split(',')[2]}
  }
  const {i18n,t}=useTranslation()
  
  const {img,desc,title,rating,prize,in_stock,id} = {
    ...product,
    title:prepareTranslate(product.title),
    desc: prepareTranslate(product.desc),
  }
  const addCart = useStore((state)=>(state.addCart))  
  const Cart = useStore((state)=>(state.Cart))
  const ref = useRef(null)
  const addToCart = ()=>{
    const isExiste = Cart.find(item=>item.id===product.id)
    if(isExiste===undefined) addCart(product)
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

 return (
 
      <div  ref={ref} className={`relative h-[550px]  flex flex-col ${className} bg-white shadow-sm border border-slate-200 rounded-lg lg:w-96 w-auto`}>
      <div className="relative p-2.5 h-96 overflow-hidden rounded-xl bg-clip-border">
        <a href={`/product/${id}`}>
        <img
        
        src={img[0]}
          alt="picture"
          className="h-full w-full object-cover rounded-md"
        />
        </a>
        
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-slate-800 text-lg font-semibold">
          {title[i18n.language as keyof typeof title].slice(0,18)}
          </p>
          <p className="text-cyan-600 text-xl font-semibold">
          {t("starting_from")} {setting.symbole_devise==="$"?(setting.symbole_devise.concat(prize.toString())):prize.toString().concat(setting.symbole_devise)}
          
          </p>
        </div>
        <p className="text-slate-600 leading-normal font-light">
          {
            desc[i18n.language as keyof typeof desc].length<114 ?desc[i18n.language as keyof typeof desc]:desc[i18n.language as keyof typeof desc].slice(0,114)
          }
        </p>
        <div className=" flex items-center mt-2 justify-between">
            <div className="inline-flex items-center">
              <Rating iconSize="w-6 h-6" showAvis={true} rating={rating}/>
            </div>
            <p style={{textDecoration:`${!in_stock?"line-through":""}`}} className={`${in_stock?"text-cyan-600":"text-red-400"} text-xl font-semibold`}>
            {t("in_stock")}
            </p>
        </div>
      

        <button disabled={!product.in_stock} onClick={addToCart} className="rounded-md roboto-regular w-40 mt-3 btn py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg  focus:shadow-none   active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
        {t("add_to_cart")}
        </button>
      </div>
      </div>
 )
    
   }
   
  
 
  

 


export default Card

/*
function Skelette(){
 return (
  <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 animate-pulse">
  <div
    className="relative grid h-80 mx-4 mt-4 overflow-hidden text-gray-700 bg-gray-300 bg-clip-border rounded-xl place-items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
      className="w-12 h-12 text-gray-500">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z">
      </path>
    </svg>
  </div>
  <div className="px-6 py-3">
    <div className="w-full flex justify-between">
      <div
        className="block w-36 h-3 mb-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
        &nbsp;
      </div>

      <div
        className="block w-36 h-3 mb-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
        &nbsp;
      </div>
    </div>
    
    <div
      className="block w-full h-2 my-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit">
      &nbsp;
    </div>
    <div
      className="block w-full h-24 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded text-inherit">
      &nbsp;
    </div>
    <div
      className="block w-full h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit">
      &nbsp;
    </div>
    <div
      className="block w-full h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit">
      &nbsp;
    </div>
  </div>
  <div className="p-6 pt-0">
    <button  tabIndex={-1}
      className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none h-8 w-20 bg-gray-300 shadow-none hover:shadow-none"
      type="button">
      &nbsp;
    </button>
  </div>
</div>
 )
}
*/