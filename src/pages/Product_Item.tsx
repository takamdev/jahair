import { AiOutlineMail } from "react-icons/ai"; 
import { BsWhatsapp } from "react-icons/bs"; 
import { BiMinus } from "react-icons/bi"; 
import { BiPlus } from "react-icons/bi"; 
import { useParams } from 'react-router-dom'
import { type_product } from '../types/type_product'
import { useEffect, useState } from 'react'
import { getDocument } from '../firebase/getCollections'
import { Carousel } from "flowbite-react";
import useStore from '../store';
import { FaXTwitter } from "react-icons/fa6";
import { BsFacebook } from "react-icons/bs";
const theme = {
    "root": {
      "base": "relative h-full w-full",
      "leftControl": "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
      "rightControl": "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none"
    },
    "indicators": {
      "active": {
        "off": "bg-slate-300  hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
        "on": "bg-slate-600 dark:bg-gray-800"
      },
      "base": "h-3 w-3 rounded-full",
      "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
    },
    "item": {
      "base": "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
      "wrapper": {
        "off": "w-full flex-shrink-0 transform cursor-default snap-center",
        "on": "w-full flex-shrink-0 transform cursor-grab snap-center"
      }
    },
    "control": {
      "base": "inline-flex h-8 w-8 items-center justify-center rounded-full sm:h-10 sm:w-10",
      "icon": "h-5 w-5 text-black dark:text-gray-800 sm:h-6 sm:w-6"
    },
    "scrollContainer": {
      "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
      "snap": "snap-x"
    }
  }
  
function Product_Item() {
    const {id} =  useParams()
    const [product,setProduct]=useState<type_product|null>(null)
    const [load,setLoad]=useState(true)
    const setting = useStore(state=>state.setting)
    const Cart = useStore(state=>state.Cart)
    const addCart = useStore(state=>state.addCart)
    const [qte,setQte]=useState(1)
    const resetCart = useStore(state=>state.resetCart)
useEffect(()=>{
    if(id!==undefined){
        getDocument("product",id).then((res:any)=>{
          console.log(res);
          
            const itemProduct:type_product={
                id: id,
                category:res.category,
                title:res.title,
                prize: res.prize,
                img: res.img,
                in_stock:res.in_stock,
                desc: res.desc,
                rating:res.rating|2
              }
              setProduct(itemProduct)
              setLoad(false)
        }).catch(erreur=>{
            console.log(erreur);
        })
    }
   
},[])
const addQte=()=>{
  
if(qte<4&&product?.in_stock) setQte(v=>v+1)
}

const removeQte = ()=>{

  if(qte>1&&product?.in_stock) setQte(v=>v-1)
}
const addToCart = ()=>{
  console.log(Cart);
  
  
  const isExiste = Cart.find(item=>item.id===product?.id)
  if(isExiste===undefined){
    if(product)  addCart({...product,qte:qte})
    
  }else{
    //ajouter la quantité du produit deja existant
    const addQte= Cart.map(function(element){
        if(element.qte!==undefined){
  
           if(element.id===product?.id)return {...element,qte:element.qte+1}
           else return element
  
        }
    })
    // filtrage de type
    const filterType = addQte.filter(item=>item!==undefined)
    resetCart(filterType)

  } 
}
if(load){
    return(
        <div className="flex items-center justify-center w-screen h-screen border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div role="status">
                <svg aria-hidden="true" className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
  )
}else{
    return (
        <article className='lg:mt-20 lg:h-screen mb-10  lg:px-40'>
            
          <div  className='grid  grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className="h-96 lg:h-full">
            <Carousel theme={theme}  pauseOnHover slideInterval={1000}>
                <img className="object-cover max-w-lg " src={product?.img[0]} alt="picture" />
                <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
            </Carousel>
         </div>
            
            <div className='lg:px-10 px-4 mx-3'>
                <h1 className='text-capitalize text-3xl'>{product?.title}</h1>
                <div className='text-color border-t-stone-400 border-t pt-5  mt-5'>
                     <p className="text-slate-950">
                       {setting.symbole_devise==="$"?(setting.symbole_devise+product?.prize):product?.prize.toString().concat(setting.symbole_devise)}
                     </p>
                     <div className='lg:h-96 w-full'>
                       <p className="my-3">Taile</p>
                       <select className="w-full mt-5 border-0 focus:ring-0 bg-neutral-300">
                         <option value="">Choisir une option</option>
                         <option value="S">S(52cm)</option>
                         <option value="M">M(54cm)</option>
                         <option value="L">L(56cm)</option>

                       </select>

                       <div className="w-full gap-5 flex my-10">
                        <p className="flex gap-2 items-center">
                            <span onClick={removeQte} className="p-3 w-14 flex justify-center bg-neutral-300 cursor-pointer hover:bg-neutral-200"><BiMinus /></span>

                            <span className="p-2 w-14 flex justify-center bg-neutral-300">{qte}</span>

                            <span onClick={addQte} className="p-3 w-14 flex justify-center bg-neutral-300 cursor-pointer hover:bg-neutral-200"><BiPlus /></span>
                        </p>
                        {
                          product?.in_stock?(
                            <button onClick={addToCart}  className="w-full btn">ajouter au panier</button>
                          ):(
                            <p className="mt-3 roboto-regular">Rupture de stock</p>
                          )
                        }
                       </div>
                       <div className="w-full">
                          <p>
                            {product?.desc}
                          </p>
                          <ul className="max-w-md mx-10 my-5 space-y-1 text-color list-disc list-inside dark:text-gray-400">
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Lorem ipsum dolor sit amet.</li>
                          </ul>
                       </div>

                       <div className='text-color flex items-center  w-full border-t-stone-400 border-t pt-5  mt-5'>
                        <div>
                            <p className="text-slate-900">
                                partager
                            </p>
                        </div>
                        <div className="ms-auto">
                            <p className="w-full flex gap-5 ms-auto">
                                <span><a href={`https://www.facebook.com/sharer.php?u=${window.location.href}`} target="_blank"><BsFacebook className="scale-150"/></a></span>
                                <span><a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank"><FaXTwitter className="scale-150" /></a></span>
                                <span><a href={`https://wa.me/?text=${window.location.href}`} target="_blank"><BsWhatsapp className="scale-150" /></a></span>
                                <span><a href={`mailto:?subject=${product?.title}&body=${window.location.href}`} target="_blank"><AiOutlineMail className="scale-150" /></a></span>
                            
                            </p>
                        </div>
                       </div>
                     </div>

                </div>
            </div>
          </div>
        </article>
      )
}
 
}

export default Product_Item