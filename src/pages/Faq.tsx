import useStore from "../store"
import { useTranslation } from "react-i18next"
import parse from "html-react-parser"
import {faq} from "./../data/doc"

function Faq() {
  const setting = useStore(state=>state.setting)
  const {i18n} = useTranslation()
  const getFAQ = faq(setting.email_site)

  return (
    parse(getFAQ[i18n.language as keyof typeof getFAQ])
  )
}

export default Faq