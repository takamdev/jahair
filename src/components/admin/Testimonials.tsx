import { AiFillDelete } from "react-icons/ai"; 
import { useEffect, useState } from "react";
import { type_testimonials } from "../../types/type_testimonials";
import { getAllCollection } from "../../firebase/getCollections";
import { editDoc } from "../../firebase/editDoc";
import {Popover } from "flowbite-react";
import Load from "../../layout/Load";
import { deleteDocById } from "../../firebase/deleteDoc";


function Testimonials() {
  const [data, setData] = useState<type_testimonials[]>([]);
  const [load,setLoad]=useState(false)

  useEffect(()=>{
    setLoad(true)
   getAllCollection('testimonials').then(res=>{
   const testimonials:type_testimonials[] = res.docs.map(element=>{
      return{
        name:element.data().name,
        message:element.data().message,
        email:element.data().email,
        note:element.data().note,
        img:element.data().img,
        show:element.data().show ,
        id:element.id
      }
    })
    setData(testimonials)
    setLoad(false)
   })
  },[])

  const show = (value:boolean ,id:string)=>{
    const testimonial = data.find(item=>item.id===id) as type_testimonials
    const updateData ={
      collection_name:"testimonials",
      id_doc:id,
      data:{
        ...testimonial,
        show:value
      }
    }
    editDoc(updateData).then(()=>{
      const newdate = data.map(item=>{
        if(item.id===id){
         return {
           ...item,
           show:value
         }
        }
        return item
     }) 

     setData(newdate)
    }).finally(()=>{

    })


  


  }
  
  const deleteTest = async (id:string)=>{
    try {
      await deleteDocById({collection_name:"testimonials",id_doc:id})
      const newData = data.filter(item=>item.id!==id)
      setData(newData)
    } catch (error) {
      console.log(error);
      
    }
  }

  if(load) return <Load/>
  return (
    <div className='bg-white mx-auto h-full p-4 mt-6'>
       {data.length === 0 ? (
            <p className="text-5xl text-center">
               aucun temoignage enregistré
            </p>
         ) : (
            <table className="table-container me-auto">
               <thead className="table-head border-b">
                 <tr>
                   <th>N</th>
                   <th>Note</th>
                   <th>Nom</th>
                   <th>Email</th>
                   <th>message</th>
                   <th>photo</th>
                   <th>rendre visible</th>
                   <th>action</th>

                 </tr>
               </thead>
               <tbody className="table-body">
                {
                  data.map((item,index)=>{
                    return (
                      <tr key={index} className="border-b h-14">
                        <td> {index} </td>
                        <td> {item.note} </td>
                        <td> {item.name} </td>
                        <td> {item.email} </td>
                        <td> 
                           
                          <Popover content={
                            <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                              <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                <h3 className="font-semibold text-gray-900 dark:text-white">témoignage de {item.name}</h3>
                              </div>
                              <div className="px-3 py-2">
                                <p>{item.message}</p>
                              </div>
                            </div>
                           } trigger="hover" placement="top">
                           <p className="cursor-pointer">{item.message.slice(0,15)}...</p>
                          </Popover>
                        </td>
                        <td> <img src={item.img} style={{borderRadius:"100%",height:"50px",width:"50px"}} alt="photo" /> </td>
                        <td> <input type="checkbox" defaultChecked={item.show} onChange={(e)=>{show(e.target.checked,item.id)}} /> </td>
                        <td>

                        <AiFillDelete
                                 onClick={() => {
                                    deleteTest(item.id);
                                 }}
                                 className="scale-150 text-red-600 cursor-pointer"
                              />
                        </td>
                      </tr>
                    )
                  })
                }
               
               </tbody>
            </table>
         )}
    </div>
  )
}

export default Testimonials