
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
    <a href={`https://wa.me/${social_links[0].href}`} className="fixed w-12 bottom-7 right-3  md:w-16 md:bottom-7 md:right-7">
      <img src="/logo_whatsapp.svg"  alt="whatsapp" />
    </a>
    </main>
  )
}

export default App