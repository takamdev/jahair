import { create } from "zustand";
import {type_product} from "./types/type_product"
type cart =( type_product & {qte?:number})
import {type_setting} from "./types/type_setting"
import setting from "./data/setting.json"
import { type_service } from "./types/type_service";

interface typeStore {
  Cart: cart[]
  addCart: (product: cart) => void
  resetCart:(cart:cart[]) => void
  product:type_product[]
  setProduct:(products:type_product[]) => void
  addProduct:(product:cart)=>void
  setting:type_setting
  setSetting:(setting:type_setting)=>void
  service:type_service[]
  setService:(services:type_service[])=>void
  addService:(service:type_service)=>void
  
}
const useStore = create<typeStore>((set) => {
  const CartStore:cart[] = JSON.parse(localStorage.getItem('cart')!)||[]
  
  return {
    Cart:CartStore ,
    product:[],
    service:[],


    addCart: (product) => set((state) => {
     const newCart = [...state.Cart,{...product,qte:(product.qte ? product.qte : 1)}]
     localStorage.setItem('cart',JSON.stringify(newCart) )
     return { Cart: JSON.parse(localStorage.getItem('cart')!)}
    }),// dans ce cas T est de type le type de Cart

    resetCart:(cart)=>set(()=>{
      const newCart = cart
      localStorage.setItem('cart',JSON.stringify(newCart) )
      return {Cart: JSON.parse(localStorage.getItem('cart')!)}
    }),

    setProduct:(products)=>set(()=>({product:products})),
    addProduct:(product)=>set((state)=>({product:[...state.product,product]})),

    setSetting:(setting)=>set(()=>({setting:setting})),
    setting:setting,
    
    setService:(services)=>set(()=>({service:services})),
    addService:(service)=>set((state)=>({service:[...state.service,service]}))
  }
})



  export default useStore