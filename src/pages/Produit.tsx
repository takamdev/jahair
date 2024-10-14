import Card from '../components/Product_Card'
import useStore from '../store'

function Produit() {
  const product = useStore(state=>state.product)
  return (
    <main className='container mx-auto mb-40'>
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
