import { FaHandSparkles } from "react-icons/fa"; 
import { SiFuturelearn } from "react-icons/si"; 
import { SiApplenews } from "react-icons/si"; 
import { FaServicestack } from "react-icons/fa"; 
import { TbBrandProducthunt } from "react-icons/tb"; 
import { GoKey } from "react-icons/go"; 
import { TbSettings2 } from "react-icons/tb"; 
import { useState } from "react";
import Dashboad from "../components/admin/Dashboad";
import Product from "../components/admin/Product";
import Services from "../components/admin/Services";
import Promote from "../components/admin/Promote";
import Income from "../components/admin/Income";
import { Navigate, useParams } from "react-router-dom";
import useStore from "../store";

const cssClassButtonActive = "btn rounded-lg text-start px-3 py-2 flex gap-2 items-center text-white"
const cssClassButtonInactive = "text-slate-500 flex gap-2 items-center text-start px-3 py-2"
const name = "Prisca"
const onglet = [<Dashboad/>,<Product/>,<Services/>,<Promote/>,<Income/>]
function Admis() {
  const {token}=useParams()
  const tokenstore = useStore((state)=>(state.token))
  const [buttonActive,setButtonActive]=useState([true,false,false,false,false])
  const [showOnglet,setShowOnglet]= useState(<Dashboad/>)


  const changeCssClassButton = (index:number)=>{
      const newButtonActive = buttonActive.map((item,i)=>{
        if(index===i) return true
           else return false
      })
      setButtonActive(newButtonActive)
      setShowOnglet(onglet[index])
  }
  if(token!==tokenstore){
    return <Navigate to="/errors!!" replace />
  }

  return (
    <main className='flex text-black mt-8  p-10'>
      {
        //sibar
      }
      <div className='flex flex-col p-2'>
        <h1 className="flex gap-2 items-center"><TbSettings2 style={{transform:"scale(2)"}} /> <span className="font-bold text-2xl ms-3">Dashboad</span> <span className="font-light">v.01</span></h1>
        
        <div className="flex flex-col  mt-8 gap-5" style={{height:"550px"}}>
           <button onClick={()=>{changeCssClassButton(0)}}  className={buttonActive[0]?cssClassButtonActive:cssClassButtonInactive}><span className="border p-1 rounded-lg "><GoKey /></span>dashboad</button>
           <button onClick={()=>{changeCssClassButton(1)}}  className={buttonActive[1]?cssClassButtonActive:cssClassButtonInactive}><span className="border p-1 rounded-lg "><TbBrandProducthunt /></span>products</button>
           <button onClick={()=>{changeCssClassButton(2)}}  className={buttonActive[2]?cssClassButtonActive:cssClassButtonInactive}><span className="border p-1 rounded-lg "><FaServicestack /></span>services</button>
           <button onClick={()=>{changeCssClassButton(3)}}  className={buttonActive[3]?cssClassButtonActive:cssClassButtonInactive}><span className="border p-1 rounded-lg "><SiApplenews /></span>promote</button>
           <button onClick={()=>{changeCssClassButton(4)}}  className={buttonActive[4]?cssClassButtonActive:cssClassButtonInactive}><span className="border p-1 rounded-lg "><SiFuturelearn /></span>income</button>
          <div className="flex gap-2 mt-auto mb-2">
            <img src="/logo.png" className="object-cover" style={{borderRadius:'100%',height:"50px" ,width:"50px"}} alt="tof" />
            <p className="flex flex-col gap-0.5">
              <span className="font-bold">{name}</span>
              <span className="text-slate-500">Project Manager</span>
            </p>
          </div>
        </div>

      </div>
      <div className="px-10 bg-slate-50 w-full overscroll-y-auto  rounded-lg ms-2 ">
        <h1 className="flex gap-2 mx-10  items-center mt-2"><span className="font-bold text-2xl ms-3">Hello {name}</span><FaHandSparkles className="scale-150 text-orange-300" /></h1>
          {
            showOnglet
          }
      </div>
    </main>
  )
  
}

export default Admis