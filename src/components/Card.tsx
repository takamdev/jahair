import useStore from "../store"
import { product } from "../store"
function Card({product}:{product:product}) {
  const {img,category,title,prize,textprize,symbolprize} = product

  const addCart = useStore((state)=>(state.addCart))  
  const Cart = useStore((state)=>(state.Cart))

  const addToCart = ()=>{
    const isExiste = Cart.find(item=>item._id===product._id)
    if(isExiste===undefined) addCart(product)
  }
  return (
    <div className='w-auto bg-slate-100 card p-2'>
       <div className='img-container  overflow-hidden'>
         <img src={img} alt="image" className='transition h-96 w-full lg:hover:scale-110' />
       </div>
        <div className='flex flex-col p-4  items- justify-center mt-2'>
            <h4 className='uppercase  lg:text-3xl mb-1 '>{category}</h4>
            <span className='h-0.5 scale-y-50 bg-slate-600 w-40'></span>
            <p className='mt-2 lg:text-2xl'>{title}</p>
            <p className='lg:text-1xl'>{textprize} {prize} {symbolprize}</p>
        </div>
        <button onClick={addToCart} className={`btn px-4 py-2 mx-4 rounded-lg add-card`}>ajouter au panier</button>
    </div>
  )
}

export default Card