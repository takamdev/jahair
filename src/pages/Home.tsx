import { AiOutlineArrowRight } from "react-icons/ai"; 
import useStore from "../store"
//import CardComponent from "../components/Card"
import { Link } from "react-router-dom"





export default function Home() {
const setting = useStore(state=>state.setting)
//const product = useStore(state=>state.product)


  return (
    <section> 
    <div style={{backgroundImage:`url(${setting.img_welcome})`}} className="mt-14 img-welcome w-full  flex flex-col items-center justify-center h-72 lg:h-[700px] md:h-96 roboto-regular origin-top relative">
       <h1 className="lg:text-5xl italic text-blue-50 text-center  w-full"><span className="font-serif" style={{color:"#ff66c4"}}>WELCOME  TO</span>  @yourplacetobeby</h1>
       <h2 className="uppercase lg:top-60 lg:text-5xl  text-blue-50 my-10 text-center w-full">jahairstyle, so’lashes <br /> &  <br /> makeup artist</h2>
      <p className="lg:text-2xl italic text-black text-center w-full "> 
      <Link to={"product"} className="mt-5 mx-auto justify-center btn px-10 py-3 rounded-full flex items-center w-40 h-8 lg:w-56 lg:h-10 arrow-link">product <AiOutlineArrowRight className="arrow hidden lg:block origin-top-left ms-2" /> </Link>

      </p>
     </div>
     
    
    </section>
    
  )
}
