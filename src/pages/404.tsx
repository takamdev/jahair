import { Link } from "react-router-dom"
import Footer from "../layout/Footer"
import Header from "../layout/Header"
import useStore from "../store"

function Error_page() {
const setting = useStore(state=>state.setting)
  return (
    <main className="bg-white roboto-light w-auto relative isolate  pt-14  h-full">
        <Header/>
       
        <div className="lg:my-60 my-20 flex flex-col lg:flex-row justify-center items-center lg:gap-40">
          
            <p className="text-9xl roboto-medium opacity-50">404</p>
         
          <div className="flex flex-col justify-center items-center">
            <p className="text-5xl roboto-bold">Désolé!</p>
            <p className="text-xl text-red-600 roboto-medium">Page Non Trouvée</p>
            <p className="text-3xl lg:mt-14 roboto-medium p-3">
             La page que vous cherchez pourrait avoir <br /> été enlevée, a fait changer son nom, <br /> ou est temporairement indisponible.
            </p>
            <Link className="text-xl mt-2 underline roboto-medium text-rose-300" to="/">Retour à l'acceuil</Link> 
          </div>
        </div>
        <Footer/>
        <a target='blank' href={`https://wa.me/${setting.social_links.whatsapp.trim()}`} className="fixed w-12 bottom-7 right-3  md:w-16 md:bottom-7 md:right-7">
          <img src="/logo_whatsapp.svg"  alt="whatsapp" />
        </a>

      </main>
  )
}

export default Error_page