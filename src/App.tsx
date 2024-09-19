
import { Outlet } from 'react-router-dom'
import Header from './layout/Header'
import Footer from './layout/Footer'
import social_links from "./data/social_links.json"
function App() {
  return (
    <main className="bg-white relative isolate  pt-14  h-screen">
        
      <Header/>
      <Outlet/>
      <Footer/>
    <a href={`https://wa.me/${social_links[0].href}`} className="fixed w-10 bottom-1 right-1  md:w-20 md:bottom-10 md:right-10">
      <img src="/logo_whatsapp.svg" className=" icon-whatsapp" alt="whatsapp" />
    </a>
    </main>
  )
}

export default App