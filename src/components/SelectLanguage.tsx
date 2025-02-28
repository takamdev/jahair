import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import '../i18n'; // Assure-toi d'importer la configuration i18n
import { useLocation } from "react-router-dom";

function SelectLanguage({className}:{className?:string}) {
    const [currentLangage,setCurrentLangage] = useState<string>()
    const {i18n } = useTranslation();
    const location = useLocation()
    const [show,setShow]=useState<boolean>()
    // chargement de la langue pas defaut
    useEffect(()=>{
      setCurrentLangage(i18n.language)        
    },[])

    // modificateur de langue
    useEffect(()=>{
        i18n.changeLanguage(currentLangage)
        
    },[currentLangage])

    // gestion de l'affichage du selecteur de langue
    useEffect(()=>{
      if(location.pathname.includes("admin")) setShow(false)
        else setShow(true)
    },[location.pathname])
 const changeLanguage = (language:string)=>{
  setCurrentLangage(language)
  localStorage.setItem("language",language)
 }
 if(show) return (
    <>
       <select  value={currentLangage} onChange={(e)=>changeLanguage(e.target.value)} id="language" className={`h-10   ${className} px-1 focus:ring-black focus:border-0 border-1 rounded-lg`} required>
            <option value="fr">FR</option>
            <option value="en">EN</option>
            <option value="it">IT</option>
          </select>
    </>
  )
  else return null
}

export default SelectLanguage