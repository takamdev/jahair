
import { Outlet, useLocation } from 'react-router-dom'
import Header from './layout/Header'
import Footer from './layout/Footer'
import setting from "./data/setting.json"
import { useEffect, useState } from 'react'
import useStore from './store'
import { getAllCollection } from './firebase/getCollections'
import { type_product } from './types/type_product'
import product from "./data/product.json"
/*
 <div className='w-full  h-full z-50 bg-slate-300'>
        <div className="text-center py-96">
            <div role="status">
                <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
      </div>
*/
function App() {
  const location = useLocation()
  const [showLogoWhat,setter]=useState(true)
  const [load,setLoad]=useState(false)
  useEffect(()=>{
  
    if(location.pathname.includes("admin")) setter(false)
      else setter(true)
   
  },[location.pathname])
  const setProduct = useStore((state)=>(state.setProduct))
//recuperation de produits
  useEffect(()=>{
    setLoad(true)//loading
   getAllCollection("product").then(res=>{
    //si aucun produit n'est enregistrer
       if(res.size===0){
        setProduct(product)
       }
       //contruction des données
      const data = res.docs.map(element=>{
        const itemProduct:type_product={
          id: element.id,
          category:element.data().category,
          title:element.data().title,
          prize: element.data().prize,
          img: element.data().img,
          in_stock:element.data().in_stock,
          desc: element.data().desc,

        }
        return itemProduct
       })
       //mise a jour de l'etat
       setProduct(data)
        
   }).catch(err=>console.error(err)
   ).finally(()=>{
    setLoad(false)
   })
  },[])
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
      <main className="bg-white relative isolate  pt-14  h-full">
        <Header/>
        <Outlet/>
      
        {
          showLogoWhat?(
            <>
  
                <Footer/>
                <a href={`https://wa.me/${setting.social_links.whatsapp}`} className="fixed w-12 bottom-7 right-3  md:w-16 md:bottom-7 md:right-7">
                  <img src="/logo_whatsapp.svg"  alt="whatsapp" />
                </a>
            </>
            
          ):(
            null
          )
        }
     
      </main>
    )
  }

  
}

export default App