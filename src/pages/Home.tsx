import { useNavigate } from "react-router-dom"
import useStore from "../store"





export default function Home() {
const setting = useStore(state=>state.setting)
  const navigatTo = useNavigate()

  return (
    <> 
    <div className="mt-14 lg:h-auto lg:scale-y-75 origin-top relative">
       <p className="absolute -top-60 lg:top-0 lg:text-5xl italic text-blue-50 text-center w-full mt-80"><span className="font-serif" style={{color:"#ff66c4"}}>WELCOME  TO</span>  @yourplacetobeby</p>
       <p className="absolute -top-40 uppercase lg:top-60 lg:text-5xl  text-blue-50 text-center w-full mt-80">jahairstyle, so’lashes <br /> &  <br /> makeup artist</p>
       <img src={setting.img_welcome} className="w-full lg:h-full h-72 " alt="image" loading="lazy"/>
      <p className="absolute -top-20 lg:top-2/4  lg:text-2xl italic text-black text-center w-full mt-80"> <button onClick={()=>{navigatTo("admin")}} className="btn rounded-full transition  w-40 h-10 lg:w-56 lg:h-20 ">product</button></p>
     </div>

    </>
    
  )
}
