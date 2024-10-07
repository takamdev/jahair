import { useEffect, useState } from 'react'


interface etitableCell {
  onchange: (value: string, id: string, key: string) => void
  cell:any
}

function EditableCell({cell,onchange}:etitableCell) {
      
      // recherche des clée
      const index_Of = cell.id.indexOf('_')+1
    
      // recuperation des key
      const key =cell.id.slice(index_Of,cell.id.length)
       
    const [value,setValue]=useState('')

    useEffect(()=>{
    
        setValue(cell.row.original[key])
      
     
    },[cell.row.original[key]])

//modification du produit modification
const updateRow= ()=>{
   
    onchange(value,cell.row.original.id,key)
}


  return (
    <>
    <input className='border py-2 ps-1 focus:ring-0  rounded-lg focus:border-2 focus:border-rose-400' type="text" onBlur={updateRow}  value={value} onChange={(e)=>{setValue(e.target.value)}}/>
    </>
  )
}

export default EditableCell