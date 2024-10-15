import { AiOutlineArrowRight } from "react-icons/ai"; 
import useStore from "../store"
import { default as Card_product} from "../components/Product_Card"
import { default as Cart_Service } from "../components/Service_Card"
import { Link } from "react-router-dom"




export default function Home() {
const setting = useStore(state=>state.setting)
const product = useStore(state=>state.product)
const service =useStore(state=>state.service)
  return (
    <div> 
    <div style={{backgroundImage:`url(${setting.img_welcome})`}} className="mt-14 img-welcome w-full  flex flex-col items-center justify-center h-72 lg:h-[700px] md:h-96 roboto-regular origin-top relative">
       <h1 className="lg:text-5xl italic text-blue-50 text-center  w-full"><span className="font-serif" style={{color:"#ff66c4"}}>WELCOME  TO</span>  @yourplacetobeby</h1>
       <h2 className="uppercase lg:top-60 lg:text-5xl  text-blue-50 my-10 text-center w-full">jahairstyle, so’lashes <br /> &  <br /> makeup artist</h2>
      <p className="lg:text-2xl italic text-black text-center w-full "> 
      <Link to={"product"} className="mt-5 mx-auto justify-center btn px-10 py-3 rounded-full flex items-center w-40 h-8 lg:w-56 lg:h-10 arrow-link">product <AiOutlineArrowRight className="arrow hidden lg:block origin-top-left ms-2" /> </Link>

      </p>
     </div>
     <p className="my-10">
        <h2 className="text-center roboto-black text-4xl">Nos Produits</h2>
        <h5 className="text-center roboto-light text-lg md:text-base lg:text-xl">Découvrez les produits les plus populaires de notre site !</h5>
     </p>

     {
      // debut de section produits
     }

     <section className="flex justify-center">
     <article className='grid grid-cols-1 md:gap-14 lg:gap-20 place-content-center lg:grid-cols-4 md:grid-cols-2  '>
       {
        product.map((item,index)=>{
          return (
                <div key={index} className='lg:-ms-8 md:-ms-5'>
                        <Card_product reveal={{reset:true}}  product={item} />
                </div>
          )
        })
       }
    </article>
     </section>
     {
      // fin de section services
     }

    {
      // debut de section banier produits
     }

    <section style={{backgroundImage:`url(/img/baner-product.jpg)`}} className="mt-14 img-baner-product  h-60 lg:h-[300px] md:h-96 roboto-regular origin-top relative">
       <div className="h-full w-full text-white backdrop-brightness-75 flex flex-col items-center justify-center ">
          <p className="text-center roboto-bold  text-3xl lg:text-5xl">Decouvrez Nos Produits</p>
          <Link to={"product"} className="mt-5 btn px-10 py-3 rounded-full flex items-center arrow-link">Pruducts <AiOutlineArrowRight className="arrow hidden lg:block origin-top-left ms-2" /> </Link>
       </div>
    </section>


    {
      // fin de section banier produits
     }

     <p className="my-10">
     <h2 className="text-center roboto-black text-4xl">Nos Services</h2>
     <h5 className="text-center roboto-light text-lg md:text-base lg:text-xl">Découvrez les services les plus demander de notre site !</h5>
     </p>

     {
      // debut de section services
     }

     <section className="flex justify-center">
     <article className='grid grid-cols-1 md:gap-14 lg:gap-20 place-content-center lg:grid-cols-4 md:grid-cols-2  '>
       {
        service.map((item,index)=>{
          return (
                <div key={index} className='lg:-ms-8 md:-ms-5'>
                        <Cart_Service reveal={{reset:true}}  service={item} />
                </div>
          )
        })
       }
    </article>
     </section>

     {
      // fin de section services
     }
    </div>
    
  )
}
