import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';
import itTranslation from './locales/it.json';


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      it:{ translation: itTranslation },
    },
    lng: localStorage.getItem("language")===null ? navigator.language.split("-")[0]:localStorage.getItem("language") as string, // Langue par défaut
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;