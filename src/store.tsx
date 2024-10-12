import { create } from "zustand";
import {type_product} from "./types/type_product"
type cart =( type_product & {qte?:number})
import {type_setting} from "./types/type_setting"
import setting from "./data/setting.json"

interface typeStore {
  Cart: cart[]
  addCart: (product: cart) => void
  resetCart:(cart:cart[]) => void
  product:type_product[]
  setProduct:(products:type_product[]) => void
  addProduct:(product:cart)=>void
  setting:type_setting
  setSetting:(setting:type_setting)=>void
}
const useStore = create<typeStore>((set) => ({
    setSetting:(setting)=>set(()=>({setting:setting})),
    setting:setting,
    Cart: [],
    addCart: (product) => set((state) => ({ Cart:[...state.Cart,{...product,qte:(product.qte ? product.qte : 1)}]})),// dans ce cas T est de type le type de Cart
    resetCart:(cart)=>set(()=>({Cart:cart})),
    product:[],
    setProduct:(products)=>set(()=>({product:products})),
    addProduct:(product)=>set((state)=>({product:[...state.product,product]}))
  }))



  export default useStore