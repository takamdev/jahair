import Card from "../components/Service_Card"
import useStore from "../store"

function Services() {
 const service = useStore(state=>state.service)
  return (
    <main className='container mx-auto mb-40'>
    <article className='grid grid-cols-1 md:gap-14  lg:gap-20 place-content-center lg:grid-cols-4 md:grid-cols-2 mt-4 lg:mt-14'>
     {
      service.map((item,index)=>{
        return (
              <div key={index} className='lg:-ms-8 md:-ms-5'>
                      <Card className="my-6" reveal={{reset:false}}  service={item} />
              </div>
        )
      })
     }
  </article>
  </main>
  )
}

export default Services