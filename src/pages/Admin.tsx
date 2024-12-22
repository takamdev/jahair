import { MdOutlineReviews } from "react-icons/md"; 
import { FaHandSparkles } from "react-icons/fa"; 
import { SiFuturelearn } from "react-icons/si"; 
import { FaServicestack } from "react-icons/fa"; 
import { TbBrandProducthunt } from "react-icons/tb"; 
import { GoKey } from "react-icons/go"; 
import { TbSettings2 } from "react-icons/tb"; 
import { useEffect, useState } from "react";
import Dashboad from "../components/admin/Dashboad";
import Product from "../components/admin/Product";
import Services from "../components/admin/Services";
import Testimonials from "../components/admin/Testimonials";
import { Navigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import useStore from "../store";
import { Modal } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { addCollection } from "../firebase/addCollection";
import { getAllCollection } from "../firebase/getCollections";
import { editDoc } from "../firebase/editDoc";
const cssClassButtonActive = "btn rounded-lg text-start px-3 py-2 flex gap-2 items-center text-white"
const cssClassButtonInactive = "text-slate-500 flex gap-2 items-center text-start px-3 py-2"
function Admis() {

  const onglet = [<Dashboad/>,<Product/>,<Services/>,<Testimonials/>]
  const [brouillion,setBrouillion]=useState('')
  const {token}=useParams()
  const tokenstore = Cookies.get("token")
  const [buttonActive,setButtonActive]=useState([true,false,false,false])
  const [showOnglet,setShowOnglet]= useState(<Dashboad/>)
  const [income,setIncome]=useState(false)
  const [textIncome,setTextIncome]=useState('')
  const setting = useStore((state)=>state.setting)
  const [loadIncome,setLoadIncome]=useState(false)
  const {t}=useTranslation()
const updatebrouillion = (value:string)=>{
  setBrouillion(value)
  localStorage.setItem('brouillion',value)
}

  useEffect(()=>{
    const brouillion = localStorage.getItem('brouillion') as string
    setBrouillion(brouillion)

  },[])


  const changeCssClassButton = (index:number)=>{
      const newButtonActive = buttonActive.map((item,i)=>{
        console.log(item);
        
        if(index===i) return true
           else return false
      })
      setButtonActive(newButtonActive)
      setShowOnglet(onglet[index])
  }
  if(token!==tokenstore){
    return <Navigate to="/errors!!" replace />
  }

  // medifier l'etat du modal d'annonce 
   const Income = (value:{show:boolean,activeClass:number})=>{
    setIncome(value.show)
    changeCssClassButton(value.activeClass)
   }

   const sendIncome = async ()=>{
   
    if(textIncome.length!==0){ // vérifier si le champ n'est pas vide
      setLoadIncome(true) // activer le loader
      try {

        const income = await getAllCollection("income") // recuperer l'annonce

        // verifier si il y'a une annonce dans la bd
        if(income.size===0){ 
          // il y'a pas d'annonce
          await addCollection('income',{income:textIncome}) // ajout de l'annonce dans la bd
          setLoadIncome(false) // arret du chargement
        }else{

          const id = income.docs[0].id// recuperation de l'id de l'annonce
          const data = {
            collection_name:"income",
            id_doc:id,
            data:{income:textIncome}
        }
        // modification de l'annonce
          editDoc(data).finally(()=>{
            setLoadIncome(false) // arret du chargement
          })

        }

      } catch (error) {
        console.log(error);
        
      }


    }

   }
  return (
    <>
     <Modal show={income} size="md" onClose={() => Income({show:false,activeClass:0})} popup>
        <Modal.Header className="ms-10">laissez une annonce</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <textarea value={textIncome} onChange={(e)=>{setTextIncome(e.target.value)}} maxLength={100} className="textareaClass"></textarea>
            <div className="flex justify-end gap-4">
            <button type="submit" disabled={loadIncome} onClick={sendIncome}  className="text-white mt-1 btn self-end focus:ring-0  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
              
              {loadIncome?(
                <>
                 <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-lg text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                {t('sending')}...
                </>
              ): `${t('send')}`} 
               
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    
      
      <main className='flex text-black h-[800px] mt-8  p-10'>
      {
        //sibar
      }
      <div className='flex flex-col p-2'>
        <h1 className="flex gap-2 items-center"><TbSettings2 style={{transform:"scale(2)"}} /> <span className="font-bold text-2xl ms-3">Dashboard</span> <span className="font-light">v.01</span></h1>
        
        <div className="flex flex-col  mt-8 gap-5" style={{height:"550px"}}>
           <button onClick={()=>{changeCssClassButton(0)}}  className={buttonActive[0]?cssClassButtonActive:cssClassButtonInactive}><span className="border p-1 rounded-lg "><GoKey /></span>dashboard</button>
           <button onClick={()=>{changeCssClassButton(1)}}  className={buttonActive[1]?cssClassButtonActive:cssClassButtonInactive}><span className="border p-1 rounded-lg "><TbBrandProducthunt /></span>products</button>
           <button onClick={()=>{changeCssClassButton(2)}}  className={buttonActive[2]?cssClassButtonActive:cssClassButtonInactive}><span className="border p-1 rounded-lg "><FaServicestack /></span>services</button>
           <button onClick={()=>{changeCssClassButton(3)}}  className={buttonActive[3]?cssClassButtonActive:cssClassButtonInactive}><span className="border p-1 rounded-lg "><MdOutlineReviews /></span>Testimonials</button>
           <button onClick={()=>{Income({show:true,activeClass:4})}}  className={income?cssClassButtonActive:cssClassButtonInactive}><span className="border p-1 rounded-lg "><SiFuturelearn /></span>income</button>
          <div className="flex gap-2 mt-auto mb-2">
            <img src={setting.profile_admin} className="object-cover" style={{borderRadius:'100%',height:"50px" ,width:"50px"}} alt="tof" />
            <p className="flex flex-col gap-0.5">
              <span className="font-bold roboto-bold-italic">{setting.admin_name}</span>
              <span className="text-slate-500">Project Manager</span>
            </p>
          </div>
        </div>

      </div>
      <div className="px-10 bg-slate-50 w-full overscroll-y-auto  rounded-lg ms-2 ">
        <h1 className="flex gap-2 mx-10  items-center mt-2"><span className="font-bold text-2xl ms-3">Hello {setting.admin_name}</span><FaHandSparkles className="scale-150 text-orange-300" /></h1>
          {
            showOnglet
          }
      </div>

      <div className="absolute left-9 -bottom-5 ">
        <textarea value={brouillion} onChange={(e)=>{updatebrouillion(e.target.value)}} name="brouillion" placeholder="brouillion" className=" bg-slate-200 p-2 focus:ring-0 focus:border-0 border-0 rounded-sm  resize-none" cols={20} rows={5} id="brullon"></textarea>
      </div>
    </main>
    </>
 
  )
  
}

export default Admis