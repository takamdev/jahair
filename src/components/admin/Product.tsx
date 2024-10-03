import { BiCloudUpload } from "react-icons/bi"; 
import { AiOutlinePlus } from "react-icons/ai"; 
import { AiFillEdit } from "react-icons/ai"; 
import { AiFillDelete } from "react-icons/ai"; 
import React, { useState } from 'react'
import './../css/style.css'
import ColumnHelper from '../table/ColumnHelper'
import product from "./../../data/product.json"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { type_product } from '../../types/type_product'
import EditableCell from "../table/EditableCell";
import Modal from "../Modal";


const defaultData: type_product[] =product
const columns = ColumnHelper()

function Product() {

  const [data, setData] = React.useState<type_product[]>(() => [...defaultData])
  const [currentRow,setCurrentRow]=useState<type_product>(data[0])
  //controle du modal
  const [open, setOpen] = useState(false)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    autoResetPageIndex: false
  })
  //controlleur de champ 
  const handleChange = (value:string,id:string,key:string)=>{
   setCurrentRow((v)=>({...v,[key]:value}))
   const updataData = data.map(item=>{
      if(item.id===id) return currentRow
        else return item
   })
   
   setData(updataData)
   
  }
  // conrolleur de produit en stock
  const checkbox = (id:string)=>{
    const updataData = data.map(item=>{
       if (item.id === id) {
        return { ...item, in_stock: !item.in_stock };
      }
      return item;
   })
   setData(updataData)
  }

  // cree un objet file a partit du chemin vers le fichier
  /*
      const cheminFichier = '/chemin/vers/le/fichier.txt';

    const file = new File([await fetch(cheminFichier).then(response => response.arrayBuffer())], 'fichier.txt', {
      type: 'text/plain',
    });

    const storageRef = firebase.storage().ref('fichiers/' + file.name);
    storageRef.put(file).then((snapshot) => {
      console.log('Fichier envoyé avec succès !');
      console.log(snapshot.downloadURL); // URL de téléchargement du fichier
    });
*/
  // supprimer un produit
  const deleteProduct = (id:string)=>{
    const newData = data.filter(item=>item.id!==id)
    setData(newData)
  }
  return (
    <div className="container relative  bg-white p-4 h-full">
      <Modal open={open} onClose={setOpen} setData={setData}/>
      {
        data.length===0 ? (
          <p className="text-5xl text-center">aucun produit dans votre site</p>
        ):(
          <table className='table-container me-auto'>
          <thead className='table-head border-b' >
            {table.getHeaderGroups().map((headerGroup,index) => (
              <tr className='' key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th className='' key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
                   <th className='' key={index}>
                     Action
                   </th>
              </tr>
            ))}
          </thead>
          <tbody className='table-body'>
            {table.getRowModel().rows.map((row,number) => {
              //console.log(row.original);
             return (
              <tr className='border-b h-14' key={row.id}>
                  {row.getVisibleCells().map((cell,index) => {
                    
                    if(index===0) return (
                      <td className=''  key={cell.id}>
                      {number}
                      </td>
                    )
                    if(index===5) return (
                      <td className=''  key={cell.id}>
                        <input type="checkbox" onClick={()=>{checkbox(row.original.id)}} checked={row.original.in_stock}  />
                      </td>
                    )
                    if(index===6) return (
                      <td className='f' key={cell.id}>
                        <div className="flex items-center">
                          <img src={row.original.img[0]} width={50} alt="tof" />
                          <input type="file" id="image"  />
                          <label htmlFor="image"><AiFillEdit /></label>
                        </div>
                        
                      </td>
                    )
  
                    return (
                      <td className='' key={cell.id}>
                        <EditableCell onchange={handleChange} defaultCurrentValue = {setCurrentRow} cell={cell}  />
                      </td>
                    )
  
  
                })}
                <td className='mx-auto'>
                 <AiFillDelete onClick={()=>{deleteProduct(row.original.id)}} className="scale-150 text-red-600 cursor-pointer" />
                </td>
              </tr>
             )
          })}
          </tbody>
          </table>
        )
      }
    <button className="bg-green-500 p-4 absolute bottom-0 left-10 rounded-lg"><BiCloudUpload className="text-xl" /></button>
    <button onClick={()=>{setOpen(!open)}} className="btn p-4 absolute bottom-0 right-10 rounded-lg"><AiOutlinePlus /></button>
    </div>
  )
}
export default Product