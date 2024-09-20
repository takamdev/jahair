
import product from './../data/product.json'
import Card from '../components/Card'
function Produit() {
  return (
    <main className='container mx-auto mb-40'>
      <div className='grid grid-cols-1  place-content-center lg:grid-cols-4 md:grid-cols-2 mt-5'>
       {
        product.map((item,index)=>{
          return (
                <div key={index} className='lg:w-auto'>
                        <Card  product={item} />
                </div>
          )
        })
       }
    </div>
    </main>
  )
}

export default Produit