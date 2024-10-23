import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import '../i18n'; // Assure-toi d'importer la configuration i18n

function SelectLanguage({className}:{className?:string}) {
    const [currentLangage,setCurrentLangage] = useState<string>()
    const {i18n } = useTranslation();

    // chargement de la langue pas defaut
    useEffect(()=>{
      setCurrentLangage(i18n.language)        
    },[])

    // modificateur de langue
    useEffect(()=>{
        i18n.changeLanguage(currentLangage)
        
    },[currentLangage])

  return (
    <>
       <select  value={currentLangage} onChange={(e)=>setCurrentLangage(e.target.value)} id="language" className={`h-10 w-28  ${className} px-1 focus:ring-black focus:border-0 border-1 rounded-lg`} required>
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="it">Italien</option>
          </select>
    </>
  )
}

export default SelectLanguage