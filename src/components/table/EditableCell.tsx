import React, { useEffect, useState } from 'react'

function EditableCell({cell,onchange,defaultCurrentValue}) {
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
    onchange(value,cell.row.original._id,key)
}

//valeur par defaut du produit en cours de modification
const setCurrentRow = ()=>{
    defaultCurrentValue(cell.row.original)
}
  return (
    <>
    <input className='border py-2 ps-1  rounded-lg outline-rose-300' type="text" onBlur={updateRow} onFocus={setCurrentRow} value={value} onChange={(e)=>{setValue(e.target.value)}}/>
    </>
  )
}

export default EditableCell