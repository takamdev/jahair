import { create } from "zustand";
import {type_product} from "./types/type_product"
export type cart = type_product[]



interface CartState {
  Cart: cart
  addCart: (product: type_product) => void
  resetCart:(cart:cart) => void
}
const useStore = create<CartState>((set) => ({
    Cart: [],
    addCart: (product) => set((state) => ({ Cart:[...state.Cart,{...product,qte:1}]})),// dans ce cas T est de type le type de Cart
    resetCart:(cart)=>set(()=>({Cart:cart}))
  }))



  export default useStore