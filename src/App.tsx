
import { Outlet, useLocation } from 'react-router-dom'
import Header from './layout/Header'
import Footer from './layout/Footer'
import { useEffect, useState } from 'react'
import useStore from './store'
import { getAllCollection } from './firebase/getCollections'
import { type_product } from './types/type_product'
import product from "./data/product.json"
import service from './data/service.json'
import { type_setting } from './types/type_setting'
import Load from './layout/Load'
import { type_service } from './types/type_service'
import SelectLanguage from './components/SelectLanguage'
import Cookies from "js-cookie"
import { useTranslation } from 'react-i18next'

function App() {
  const location = useLocation()
  const [showLogoWhat,setter]=useState(true)
  const [load,setLoad]=useState(false)
  const setSetting = useStore(state=>state.setSetting)
  const setting = useStore(state=>state.setting)
  const setProduct = useStore((state)=>(state.setProduct))
  const setService = useStore(state=>state.setService)
  const [requetCookies,setRequestCookies]=useState(false)  
  const [authCookies,setAuthCookies]=useState(false)

   const {t}=useTranslation()
  useEffect(()=>{
  
    if(location.pathname.includes("admin")) setter(false)
      else {
        localStorage.setItem('brouillion',"")
        setter(true)
      }
    
    document.title=`Jahairstyle-${location.pathname === "/" ? "Home":location.pathname.replace('/','')}`
    window.scrollTo({top:0,  behavior: 'smooth'});
  },[location.pathname])


//recuperation de parametres
const getData = async ()=>{
  try {
    const setting = await getAllCollection('setting')
    //contruction des données
    const settingData = setting.docs.map(element=>{
      const itemSetting:type_setting={
        id:element.id,
        symbole_devise:element.data().symbole_devise,
        profile_admin:element.data().profile_admin,
        admin_name:element.data().admin_name,
        faq:element.data().faq,
        privacy_policy:element.data().privacy_policy,
        terms_conditions:element.data().terms_conditions,
        livrason_option:element.data().livrason_option,
        logo:element.data().logo,
        social_links:{
            whatsapp:element.data().social_links.whatsapp,
            facebook:element.data().social_links.facebook,
            instagram:element.data().social_links.instagram,
            tiktok:element.data().social_links.tiktok,
            twitter:element.data().social_links.twitter,
        },
        desc_site:element.data().desc_site,
        img_welcome:element.data().img_welcome,
        email_site:element.data().email_site,
      }
      return itemSetting
     })
     setSetting(settingData[0])
     
  } catch (error) {
    console.log(error);
    
  }
}
const setAuthorization = ()=>{
Cookies.set("authaurisation_value","true",{ expires: 1 })
setRequestCookies(true)

}


  useEffect(()=>{
   // Cookies.set("authaurisation_value","false",{ expires: 1 }) // réinitialisation de cookies l'or des testes

    const acceptCookies = Cookies.get('authaurisation_value') as string

    if(acceptCookies==="true") setAuthCookies(true)
      else setAuthCookies(false)

    setLoad(true)//loading
    getData()
    const promesses = [
      getAllCollection("product"),
      getAllCollection("service")
    ];
    
    Promise.all(promesses)
      .then(querySnapshots => {
        if(querySnapshots[0].size===0){
          setProduct(product)
         }


         //contruction des données produits
      const data_product = querySnapshots[0].docs.map(element=>{
        const itemProduct:type_product={
          id: element.id,
          category:element.data().category,
          title:element.data().title,
          prize: element.data().prize,
          img: element.data().img,
          in_stock:element.data().in_stock,
          desc: element.data().desc,
          rating:element.data().rating===undefined ? 4:element.data().rating,
          caracteristique:element.data().caracteristique,
          taille:element.data().taille
        }
        return itemProduct
       })
      
       //mise a jour de l'etat
       setProduct(data_product)

        if(querySnapshots[1].size===0){
          setService(service)
         }
        
          //contruction des données services
      const data_service = querySnapshots[1].docs.map(element=>{
        const itemService:type_service={
          id: element.id,
          name:element.data().name,
          prize: element.data().prize,
          img: element.data().img,
          desc: element.data().desc,
          video:element.data().video,
          rating:element.data().rating===undefined ? 4:element.data().rating
        }
        return itemService
       })
      
       //mise a jour de l'etat
       setService(data_service)
      }).catch(err=>console.error(err)
   ).finally(()=>{
    setLoad(false)
   })




  },[])

  if(load){
    return(
     
       <Load/>
    )
  }else{
    return (
      <main className="bg-white roboto-light w-auto relative isolate  pt-14  h-full">
        <Header/>
        <Outlet/>
      
        {
          showLogoWhat?(
            <>
  
                <Footer/>
                <SelectLanguage className='lg:hidden fixed bottom-7 left-3 overflow-y-scroll'/>
                <a target='blank' href={`https://wa.me/${setting.social_links.whatsapp.replace(/ /g,"")}`} className="fixed w-12 bottom-7 right-3  md:w-16 md:bottom-7 md:right-7">
                  <img src="/logo_whatsapp.svg"  alt="whatsapp" />
                </a>
            </>
            
          ):(
            null
          )
        }
        {
          <div className={`bg-black ${authCookies && "hidden"} ${requetCookies && "showRequetCookies"} w-full opacity-80 text-white roboto-bold  text-center lg:h-16 h-auto fixed  bottom-20 lg:bottom-0`}>
          <p className='my-5'>{t("request_cookies_action")}<button onClick={setAuthorization}  className='border block mx-auto mt-2 border-white py-1 px-2 lg:inline lg:mx-2'>{t("accept")}</button> <a className='btn p-2 mt-2 block w-48 mx-auto lg:mt-0 lg:inline' href="/terms-and-conditions">{t('Find_out_more')}</a> </p>
        </div>
        }
        
      </main>
    )
  }

  
}

export default App