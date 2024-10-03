
import { Outlet, useLocation } from 'react-router-dom'
import Header from './layout/Header'
import Footer from './layout/Footer'
import social_links from "./data/social_links.json"
import { useEffect, useState } from 'react'

function App() {
  const location = useLocation()
  const [showLogoWhat,setter]=useState(true)
  useEffect(()=>{
  
    if(location.pathname.includes("admin")) setter(false)
      else setter(true)
   
  },[location.pathname])
  return (
    <main className="bg-white relative isolate  pt-14  h-full">
      <Header/>
      <Outlet/>
      <Footer/>
      {
        showLogoWhat?(
          <a href={`https://wa.me/${social_links.whatsapp}`} className="fixed w-12 bottom-7 right-3  md:w-16 md:bottom-7 md:right-7">
          <img src="/logo_whatsapp.svg"  alt="whatsapp" />
        </a>
        ):(
          null
        )
      }
   
    </main>
  )
}

export default App