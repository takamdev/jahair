import { create } from "zustand";
import {type_product} from "./types/type_product"
export type cart = type_product[]
import {type_setting} from "./types/type_setting"
import setting from "./data/setting.json"

interface typeStore {
  Cart: cart
  addCart: (product: type_product) => void
  resetCart:(cart:cart) => void
  product:cart
  setProduct:(products:cart) => void
  addProduct:(product:type_product)=>void
  setting:type_setting
  setSetting:(setting:type_setting)=>void
}
const useStore = create<typeStore>((set) => ({
    setSetting:(setting)=>set(()=>({setting:setting})),
    setting:setting,
    Cart: [],
    addCart: (product) => set((state) => ({ Cart:[...state.Cart,{...product,qte:1}]})),// dans ce cas T est de type le type de Cart
    resetCart:(cart)=>set(()=>({Cart:cart})),
    product:[],
    setProduct:(products)=>set(()=>({product:products})),
    addProduct:(product)=>set((state)=>({product:[...state.product,product]}))
  }))



  export default useStore