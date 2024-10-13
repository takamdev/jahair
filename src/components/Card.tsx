import {useEffect, useRef } from "react"
import useStore from "../store"
import { type_product } from "../types/type_product"
import ScrollReveal from 'scrollreveal'
import { useNavigate } from "react-router-dom"
function CardComponent({product,className,reveal}:{product:type_product,className?:string,reveal?:any}) {
  const setting = useStore(state=>state.setting)
  const {img,desc,title,rating,prize,in_stock,id} = product
  const addCart = useStore((state)=>(state.addCart))  
  const Cart = useStore((state)=>(state.Cart))
  const ref = useRef(null)
  const navigate=useNavigate()
  const addToCart = ()=>{
    const isExiste = Cart.find(item=>item.id===product.id)
    if(isExiste===undefined) addCart(product)
  }
console.log(rating);

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
 // rendre les notes(rating)

 const rating_light = []
 for (let index = 0; index < 5; index++) {

  if(index>rating-1){
    rating_light.push( <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="currentColor" className="w-6 h-6 cursor-pointer text-blue-gray-500">
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
    </path>
  </svg></span>)
  }else{
    rating_light.push(
      <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="currentColor" className="w-6 h-6 text-yellow-300 cursor-pointer">
      <path fill-rule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clip-rule="evenodd"></path>
    </svg>
    </span>)
  }
 }

 
 return (
 
      <div  ref={ref} className={`relative   flex flex-col ${className} bg-white shadow-sm border border-slate-200 rounded-lg w-96`}>
      <div className="relative p-2.5 h-96 overflow-hidden rounded-xl bg-clip-border">
        <img
        onClick={()=>{navigate(`/product/${id}`)}}
        src={img[0]}
          alt="picture"
          className="h-full w-full object-cover rounded-md cursor-pointer"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-slate-800 text-xl font-semibold">
          {title.slice(0,18)}
          </p>
          <p className="text-cyan-600 text-xl font-semibold">
          A parti de {setting.symbole_devise==="$"?(setting.symbole_devise.concat(prize.toString())):prize.toString().concat(setting.symbole_devise)}
          
          </p>
        </div>
        <p className="text-slate-600 leading-normal font-light">
          {
            desc.length<114 ?desc:desc.slice(0,114)
          }
        </p>
        <div className=" flex items-center mt-2 justify-between">
            <div className="inline-flex items-center">
              
    {
    rating_light
    }
            </div>
            <p style={{textDecoration:`${!in_stock?"line-through":""}`}} className={`${in_stock?"text-cyan-600":"text-red-400"} text-xl font-semibold`}>
              en stock
            </p>
        </div>
      

        <button onClick={addToCart} className="rounded-md roboto-regular w-40 mt-3 btn py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg  focus:shadow-none   active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
          ajouter au panier
        </button>
      </div>
      </div>
 )
    
   }
   
  
 
  

 


export default CardComponent

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