import { type_avis } from "../types/type_avis"

export function moyenne(avis:type_avis[],id:string){

    const notes = avis.map(item=>{
        if(item.product_id===id) return item.note
    })
    const moyenne = notes.filter(item=>item!==undefined).reduce((acc,note)=>acc+note,0)/notes.length

    return Math.ceil(moyenne)
}