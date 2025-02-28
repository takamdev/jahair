import { AiFillDelete } from "react-icons/ai"; 
import { CgShoppingCart } from "react-icons/cg"; 

import { Table } from "flowbite-react";
import {Drawer } from "flowbite-react";
import useStore from "../store";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useTranslation } from "react-i18next";
const theme={
  "root": {
    "base": "fixed z-40 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800",
    "backdrop": "fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80",
    "edge": "bottom-16",
    "position": {
      "top": {
        "on": "left-0 right-0 top-0 w-full transform-none",
        "off": "left-0 right-0 top-0 w-full -translate-y-full"
      },
      "right": {
        "on": "right-0 top-0 h-screen w-80 transform-none",
        "off": "right-0 top-0 h-screen w-80 translate-x-full"
      },
      "bottom": {
        "on": "bottom-0 left-0 right-0 w-full transform-none",
        "off": "bottom-0 left-0 right-0 w-full translate-y-full"
      },
      "left": {
        "on": "left-0 top-0 h-screen w-80 transform-none",
        "off": "left-0 top-0 h-screen w-80 -translate-x-full"
      }
    }
  },
  "header": {
    "inner": {
      "closeButton": "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      "closeIcon": "h-4 w-4",
      "titleIcon": "me-2.5 h-4 w-4",
      "titleText": "mb-4 inline-flex items-center text-2xl ms-2  font-bold dark:text-gray-400"
    },
    "collapsed": {
      "on": "hidden",
      "off": "block"
    }
  },
  "items": {
    "base": ""
  }
}

export function OffCanvasCart({isOpen,setIsOpen}:{setIsOpen(value:boolean):void,isOpen:boolean}) {
 const Cart = useStore(state=>state.Cart)
 // cart qui incluree les titre sur differente langue

const carttiltle = Cart.map(item=>{
  return {...item,title:item.title}
 })
 
 const resetCart = useStore(state=>state.resetCart)
const handleClose = () => setIsOpen(false);
const setting = useStore(state=>state.setting)

const {i18n,t} = useTranslation()

const removeQte = (item:typeof carttiltle[0])=>{
  if(item.qte!>1){
    const newCart = Cart.map(element=>{
      return  element.id ===item.id ? {...element,qte:element.qte! - 1}:element
     })
     resetCart(newCart)
  }
 
}


const addQte =(item:typeof carttiltle[0])=>{
  if(item.qte! <5){
    const newCart = Cart.map(element=>{
      return  element.id ===item.id ? {...element,qte:element.qte! + 1}:element
     })
     resetCart(newCart)
  
  }

}

const deleteProd = (id:string)=>{
  const newCart = Cart.filter(element=>element.id!==id)
   resetCart(newCart)
}
  return (
    <>
      <Drawer theme={theme}  open={isOpen} onClose={handleClose} position="right" className="w-full md:w-96 lg:w-[500px] z-[1000]">
        <Drawer.Header  titleText="text-2xl" title={t("cart")} titleIcon={()=><CgShoppingCart className="me-2 scale-150" />} />
        <Drawer.Items>
          {
            Cart.length===0 ?(
              <p className="text-center text-2xl mt-5">{t("cart_empty")}</p>
            ):(
              <div className="h-full relative">
                <section className="overflow-x-auto mt-5">
                <Table>
                  <Table.Head>
                  <Table.HeadCell>{t('picture')}</Table.HeadCell>
                    <Table.HeadCell>{t('firstname')}</Table.HeadCell>
                    <Table.HeadCell>{t('prize')}</Table.HeadCell>
                    <Table.HeadCell>qte</Table.HeadCell>
                    <Table.HeadCell>{t('action')}</Table.HeadCell>
    
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {
                      carttiltle.map((item)=>{
                        return (
                          <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="ms-o">
                            <img src={item.img[0]} alt="toff"  />
                          </Table.Cell>
                          <Table.Cell>{item.title[i18n.language as keyof typeof item.title]}</Table.Cell>
                          <Table.Cell>{setting.symbole_devise==="$"?setting.symbole_devise +item.prize:item.prize+setting.symbole_devise}</Table.Cell>
                          <Table.Cell>
                        
                            <p className="flex gap-2 items-center">
                            <BiMinus className="cursor-pointer" onClick={()=>removeQte(item)} /> 
                            {item.qte}
                            <BiPlus className="cursor-pointer" onClick={()=>addQte(item)} />
                            </p>
                          </Table.Cell>
                          <Table.Cell>
                            <AiFillDelete onClick={()=>{deleteProd(item.id)}} className="text-red-600 cursor-pointer" />
                          </Table.Cell>
                        
                        </Table.Row>
                        )
                      })
                    }
                  
                  
                  </Table.Body>
                </Table>
                
                
              
                </section>

                <div className="w-full mt-10 ">
                   <p className="text-3xl text-end me-5 mb-5 "><span className="font-bold">{t("total")} </span>:
                    {setting.symbole_devise==="$"?setting.symbole_devise +Cart.reduce((acc,item)=>acc+(item.prize*item.qte!),0):Cart.reduce((acc,item)=>acc+(item.prize*item.qte!),0)+setting.symbole_devise}
                  
                    </p>
                    <a className="btn  rounded-md  py-2 lg:w-3/4 w-96 lg:mx-10 px-10  text-center  font-semibold text-lg " href="/init-payment">{t("proceed_to_payment")}</a>
                </div>
              </div>
            )
          }
         
        </Drawer.Items>
        
      </Drawer>
    </>
  );
}
