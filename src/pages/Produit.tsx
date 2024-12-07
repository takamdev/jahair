import { useEffect, useState } from 'react'
import Card from '../components/Product_Card'
import useStore from '../store'
import { useTranslation } from 'react-i18next'

function Produit() {
  const getproduct = useStore(state=>state.product)
  const [product,setProduct] = useState(getproduct)
  const [cathegorie , setCathegorie]=useState<{
    fr: string;
    en: string;
    it: string;
}[]|null>(null)

  const {t,i18n}=useTranslation()
 
  useEffect(()=>{
    const getCategorie = product.map(item=>{
      return {
        fr:item.category.split(",")[0],
        en:item.category.split(",")[1],
        it:item.category.split(",")[2]
      }
    })
    setCathegorie(getCategorie)
  },[])
  
  const filter = (value:string)=>{
     const newListProduct = getproduct.filter(item =>item.category.includes(value))
     setProduct(newListProduct)
     if(value.length===0)setProduct(getproduct)

    
  }
  return (
    <main className='container mx-auto mb-40'>
      <div className="block w-full mt-10 ms-5 lg:mt-20">
                            <label htmlFor="countries" className="block mb-2 text-lg ms-1 font-medium text-gray-600 w-full">{t("filter")}</label>
                            <select defaultValue="" onChange={(e)=>{filter(e.target.value)}} id="countries"  className="h-12 w-36 bg-slate-100 focus:ring-0 border-0 text-gray-600 text-base rounded-lg block  py-2.5 px-4 focus:outline-none">
                            <option value="">{t('all_category')}</option>
                            {
                              cathegorie?.map(item =>{
                                return (
                                  <option value={item[i18n.language as keyof typeof item]}>{item[i18n.language as keyof typeof item]}</option>

                                )
                              })
                            }
                            </select>
                        
                       
    
                    </div>
      <article className='grid grid-cols-1 md:gap-14  lg:gap-20 place-content-center lg:grid-cols-4 md:grid-cols-2 mt-4 lg:mt-14'>
       {
        product.map((item,index)=>{
          return (
                <div key={index} className='lg:-ms-8 md:-ms-5'>
                        <Card className="my-6" reveal={{reset:false}}  product={item} />
                </div>
          )
        })
       }
    </article>
    </main>
  )
}

export default Produit
