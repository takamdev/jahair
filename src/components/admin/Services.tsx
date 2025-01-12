import { BiCloudUpload } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import "./../css/style.css";
import ColumnHelper from "../table/ColumnHelperService";
import {
   flexRender,
   getCoreRowModel,
   useReactTable,
} from "@tanstack/react-table";
import { type_service  } from "../../types/type_service";
import EditableCell from "../table/EditableCell";
import Modal from "./../Modal_add_service";
import { deleteDocById } from "../../firebase/deleteDoc";
import { editDoc } from "../../firebase/editDoc";

import static_service from "./../../data/service.json"
import { getAllCollection } from "../../firebase/getCollections";
import Load from "../../layout/Load";
import { deleteFile } from "../../firebase/deleteFile";
import translator from "../../helper/translator";

const columns = ColumnHelper();

function Service() {

   const [data, setData] = React.useState<type_service[]>([]);
   const [upload, setUpload] = useState(false);
   const [load, setLoad] = useState(true);


   useEffect(() => {
     
       getAllCollection("service").then(res=>{
         if(res.size===0) setData(static_service);

         const data = res.docs.map(element=>{
            const itemProduct:type_service={
              id: element.id,
              name:element.data().name.fr,
              prize: element.data().prize,
              video: element.data().video,
              desc: element.data().desc.fr,
              img: element.data().img,
              rating:element.data().rating===undefined ? 4:element.data().rating
            }
            return itemProduct
           })
         
           setData(data);
           setLoad(false)
       }).catch(err=>{
         console.log(err);
         
       })


   }, []);

   //controle du modal
   const [open, setOpen] = useState(false);
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      autoResetPageIndex: false,
   });
   //controlleur de champ
   const handleChange = (value: string, id: string, key: string) => {
      const updateData = data.map((doc) => {
         if (doc.id === id) {
            const newDoc = {
               ...doc,
               [key]: value,
            };
            return newDoc;
         } else {
            return doc;
         }
      });
      setData(updateData);
   };


   // supprimer un service
   const deleteService = async (id: string) => {
      const refs = {
         collection_name: "service",
         id_doc: id,
      };
      try {
         const result = await deleteDocById(refs);
         if (result.success === true) {
            const newData = data.filter((item) => item.id !== id);
            setData(newData);
            const video = data.find(item=>item.id===id)?.video
            deleteFile(video!)
         }
      } catch (error) {
         console.log(error);
      }

      /**/
   };

   const updateCollection = () => {
      setUpload(true);

      data.map(async (item) => {
         // construction du document en oubliant l'id
         const doc = Object.fromEntries(
            //reconvertie en objet
            Object.entries(item).filter(([cle]) => cle !== "id") // transformer un objet en tableau de cle valeur et elemine la cle valeur id
         );
         // traduction

          
         const  objetTranslation = {
            desc:doc.desc as string,
            name:doc.name as string
   
           }
   
          
            const translationToEn =  await translator(objetTranslation,'en')
            const translationToIt=  await translator(objetTranslation,'it')
   
   
         const data = {
            collection_name: "service",
            id_doc: item.id,
            data: {
               ...doc,
               desc: {
                  en:translationToEn.desc.text,
                  fr:doc.desc,
                  it:translationToIt.desc.text
               },
               name: {
                  en:translationToEn.name.text,
                  fr:doc.name,
                  it:translationToIt.name.text
               }
            },
         };
         try {
            const res = await editDoc(data);
            if (res.success === true) setUpload(false);
         } catch (error) {
            console.log(error);
         }
      });
   };
   if(load) return <Load/>
   return (
      <div className="container relative  bg-white p-4 h-full">
         <Modal open={open} onClose={setOpen} setData={setData} />
         {data.length === 0 ? (
            <p className="text-5xl text-center">
               aucun service enregistrér dans votre site
            </p>
         ) : (
            <table className="table-container me-auto">
               <thead className="table-head border-b">
                  {table.getHeaderGroups().map((headerGroup, index) => (
                     <tr className="" key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                           <th className="" key={header.id}>
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                   )}
                           </th>
                        ))}
                        <th className="" key={index}>
                           Action
                        </th>
                     </tr>
                  ))}
               </thead>
               <tbody className="table-body">
                  {table.getRowModel().rows.map((row, number) => {
                     //console.log(row.original);
                     return (
                        <tr className="border-b h-14" key={row.id}>
                           {row.getVisibleCells().map((cell, index) => {
                              if (index === 0)
                                 return (
                                    <td className="" key={cell.id}>
                                       {number}
                                    </td>
                                 );
                              if (index === 4)
                                 
                                 return (
                                    <td  key={cell.id}>
                                       <div className="flex  items-center">
                                          <video
                                             src={row.original.video[0]}
                                             width={30}
                                            autoPlay
                                            muted
                                          />
                                       </div>
                                    </td>
                                 );

                                 if (index === 5)                                 
                                    return (
                                       <td  key={cell.id}>
                                          <div className="flex  items-center">
                                             <img
                                                src={row.original.img}
                                              width={50}
                                             />
                                          </div>
                                       </td>
                                    );

                              return (
                                 <td className="" key={cell.id}>
                                    <EditableCell
                                       width="w-64"
                                       onchange={handleChange}
                                       cell={cell}
                                    />
                                 </td>
                              );
                           })}
                           <td className="mx-auto">
                              <AiFillDelete
                                 onClick={() => {
                                    deleteService(row.original.id);
                                 }}
                                 className="scale-150 text-red-600 cursor-pointer"
                              />
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         )}
         <button
            disabled={upload}
            onClick={updateCollection}
            className="bg-green-500 p-4 absolute bottom-0 left-10 rounded-lg"
         >
            {!upload ? (
               <BiCloudUpload className="text-xl" />
            ) : (
               <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-6 h-6  text-lg text-green-500 animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                     fill="#E5E7EB"
                  />
                  <path
                     d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                     fill="currentColor"
                  />
               </svg>
            )}
         </button>

         <button
            onClick={() => {
               setOpen(!open);
            }}
            className="btn p-4 absolute bottom-0 right-10 rounded-lg"
         >
            <AiOutlinePlus />
         </button>
      </div>
   );
}
export default Service;
