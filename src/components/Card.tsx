import {useRef, useState } from "react"
import useStore from "../store"
import { type_product } from "../types/type_product"
import ScrollReveal from 'scrollreveal'
function Card({product}:{product:type_product}) {
  const {img,desc,title,prize,symbolprize} = product
  const [pulse,setPulse]=useState(true) 
  const addCart = useStore((state)=>(state.addCart))  
  const Cart = useStore((state)=>(state.Cart))
  const classAnimation = pulse ?"bg-slate-300 w-full  rounded-md":""
  const ref = useRef(null)
  const addToCart = ()=>{
    const isExiste = Cart.find(item=>item._id===product._id)
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

 
  return (
    <div ref={ref} className={`w-auto ${pulse&&"animate-pulse"} card p-2`}>
       <div className={`img-container ${classAnimation} bg-slate-300  overflow-hidden`}>
         <img onLoad={load} src={img} alt="image" className={`transition h-96 w-full lg:hover:scale-110`} />
       </div>
        <div className={`flex flex-col ${!pulse&&"px-4"}  items- justify-center`}>
            <h4 className={`uppercase ${classAnimation} ${pulse&&"h-5"} lg:text-3xl mb-1 `}>{!pulse&&title}</h4>
            <span className={`h-0.5 scale-y-50 bg-slate-300 w-40`}></span>
            <p className={`mt-2 my-2 ${classAnimation} ${pulse&&"h-5"} lg:text-2xl`}>{!pulse&&desc}</p>
            <p className={`lg:text-1xl  ${classAnimation} ${pulse&&"h-5"} `}>{!pulse&&"Starts at"} {!pulse&&prize} {!pulse&&symbolprize}</p>
        </div>
        {!pulse&&<button onClick={addToCart} className={`btn px-4 py-2 mx-4 rounded-lg add-card`}>ajouter au panier</button>}
    </div>
  )
}

export default Card