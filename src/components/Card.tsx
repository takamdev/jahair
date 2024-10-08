import {useRef, useState } from "react"
import useStore from "../store"
import { type_product } from "../types/type_product"
import ScrollReveal from 'scrollreveal'

import { Card } from "flowbite-react";
function CardComponent({product}:{product:type_product}) {
  const setting = useStore(state=>state.setting)
  const {img,desc,title,prize} = product
  const [pulse,setPulse]=useState(true) 
  const addCart = useStore((state)=>(state.addCart))  
  const Cart = useStore((state)=>(state.Cart))
  const classAnimation = pulse ?"bg-slate-300 w-full  rounded-md":""
  const ref = useRef(null)
  const addToCart = ()=>{
    const isExiste = Cart.find(item=>item.id===product.id)
    if(isExiste===undefined) addCart(product)
  }
  const load = ()=>{
  setPulse(false)
    ScrollReveal().reveal(ref.current||"", {
      duration: 1000,
      distance:"100px",
      origin: 'bottom',
      reset: false
  });
  return ()=>{
    ScrollReveal().clean(ref.current||"");
  }
  }
  /*
 <Card
      className="max-w-sm"
      imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
      imgSrc={img[0]}
      
    >
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
         {title}
        </h5>
      </a>
      <div className="mb-5 mt-2.5 flex items-center">
        <svg
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <svg
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <svg
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <svg
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <svg
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          5.0
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">Starts at {setting.symbole_devise==="$"?(setting.symbole_devise+{prize}):(prize+setting.symbole_devise)}</span>
        <button
          onClick={addToCart}
          className="btn px-4 py-2 mx-4 rounded-lg "
        >
          ajouter au panier
        </button>
      </div>
    </Card>
  */

 
  return (

    <>
   




    <div ref={ref} className={`w-auto ${pulse&&"animate-pulse"} card p-2`}>
       <div className={`img-container ${classAnimation} bg-slate-300  overflow-hidden`}>
         <img onLoad={load} src={img[0]} alt="image" className={`transition h-96 w-full lg:hover:scale-110`} />
       </div>
        <div className={`flex flex-col ${!pulse&&"px-4"}  items- justify-center`}>
            <h4 className={`uppercase ${classAnimation} ${pulse&&"h-5"} lg:text-2xl mb-1 `}>{!pulse&&title.slice(0,15)}</h4>
            <span className={`h-0.5 scale-y-50 bg-slate-300 w-40`}></span>
            <p className={`mt-2 my-2 ${classAnimation} ${pulse&&"h-5"} lg:text-2xl`}>{!pulse&&desc}</p>
            <p className={`lg:text-1xl  ${classAnimation} ${pulse&&"h-5"} `}>{!pulse&&"Starts at"} {!pulse&&prize} {!pulse&&setting.symbole_devise}</p>
        </div>
        {!pulse&&<button onClick={addToCart} className={`btn px-4 py-2 mx-4 rounded-lg add-card`}>ajouter au panier</button>}
    </div>
    </>

  )
}

export default CardComponent