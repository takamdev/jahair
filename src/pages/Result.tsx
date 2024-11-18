import useStore from "../store"
import { useEffect, useState } from "react";
import { type_product } from "../types/type_product";
import { type_service } from "../types/type_service";
import CardService from "../components/Service_Card";
import CardPorduct from "../components/Product_Card";
import { useTranslation } from "react-i18next";

function Result() {
    const services = useStore(state=>state.service)
    const produits = useStore(state=>state.product)
    const [data,setData]=useState<any>(undefined)
    const {t} =useTranslation()

useEffect(()=>{
 const url = new URL(window.location.href)   
 const value = url.searchParams.get("value")?.split('+') as string[]
    value.forEach(element=>{
        const find_data_in_products = produits.filter(item=>item.title.includes(element)) 
        const find_data_in_services = services.filter(item=>item.name.includes(element)) 

       if(find_data_in_products.length!==0)setData(find_data_in_products)
         else if (find_data_in_services.length!==0)setData(find_data_in_services)
       if(find_data_in_products.length!==0 && find_data_in_services.length!==0) setData([...find_data_in_services,...find_data_in_products])
            else if(find_data_in_products.length===0 && find_data_in_services.length===0) setData(null)
    })
},[])

if(data===null){
    return (
        <main className='container mx-auto mt-14 mb-40'>
          <p className="text-black text-5xl text-center">{t('no_fount_search')}</p>
       </main>
    )
}
  return (
    <main className='container mx-auto mb-40'>
      <article className='grid grid-cols-1 md:gap-14  lg:gap-20 place-content-center lg:grid-cols-4 md:grid-cols-2 mt-4 lg:mt-14'>
       {
        data?.map((item:type_product|type_service,index:string)=>{
            if(item as type_product){
                return (
                    <div key={index} className='lg:-ms-8 md:-ms-5'>
                            <CardPorduct className="my-6" reveal={{reset:false}}  product={item as type_product} />
                    </div>
              )
            }
          return (
                <div key={index} className='lg:-ms-8 md:-ms-5'>
                        <CardService className="my-6" reveal={{reset:false}}  service={item as type_service} />
                </div>
          )
        })
       }
    </article>
    </main>
  )
}

export default Result