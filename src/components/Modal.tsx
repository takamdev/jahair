import { CgRemove } from "react-icons/cg"; 
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useRef, useState } from 'react'

export default function Modal({open,onClose}:{open:boolean,onClose(value: boolean): void}) {

    const [imgSelect,setImgSelect]=useState([])
// reference ppour que le clic sur la div demande a choisir des images
const ref = useRef<HTMLLabelElement | null>(null)
const choseImage = ()=>{
  if(ref.current!==null){
    ref.current.click()
  }
}
console.log(imgSelect);

// transformer la liste de fichier en tableau de fichier
const foromatFileList = (files:FileList | null)=>{
    for (const cle in files) {
        console.log(cle + ": " + files[parseInt(cle)]);
        setImgSelect((v)=>([...v,]))
      }
    
}

//suprimer une image
const removeImg = (name:string)=>{

}
  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
               
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Ajouter un Produit
                  </DialogTitle>
                  <div className="mt-3">
                     <label className='labelClass'  htmlFor="name">Nom</label>
                     <input className='inputClass' type="text" id='name' />

                     <label className='labelClass mt-2' htmlFor="category">Category</label>
                     <input className='inputClass' type="text" id='category' />

                     <label className='labelClass' htmlFor="prize">Prix</label>
                     <input className='inputClass' type="text" id='prize' />

                     <label className='labelClass' ref={ref} htmlFor="img">Photo</label>
                     <input onChange={(e)=>{foromatFileList(e.target.files)}} type="file" multiple accept=".jpg, .png, .pdf" id='img' className='hidden' />
                      <div id='img' onClick={choseImage} className='w-full flex overflow-y-scroll border-solid border-2 bg-slate-100  p-2 outline-none  rounded-sm h-12'>
                        {
                        
                        
                            imgSelect.map(item=>{
                                return (<span onClick={()=>{removeImg(item)}} className='mx-1 flex gap-1 items-center'>{item} <CgRemove className="text-red-500" /></span>)
                            })
                                
                        }
                      </div>
                      <label className='labelClass' htmlFor="desc">Description</label>
                      <textarea className='textareaClass' id="desc"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                onClick={() => onClose(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}