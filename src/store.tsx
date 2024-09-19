import { create } from "zustand";
export type product ={
  "_id":number,
  "category":string,
  "title":string,
  "textprize":string,
  "prize":number,
  "img":string,
  "symbolprize":string,
  "qte"?:number
}
export type cart = product[]



interface CartState {
  Cart: cart
  addCart: (product: product) => void
  resetCart:(cart:cart) => void
}
const useStore = create<CartState>((set) => ({
    Cart: [],
    addCart: (product) => set((state) => ({ Cart:[...state.Cart,{...product,qte:1}]})),// dans ce cas T est de type le type de Cart
    resetCart:(cart)=>set(()=>({Cart:cart}))
  }))



  export default useStore