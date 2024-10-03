import { DocumentData, DocumentReference, DocumentSnapshot, QuerySnapshot } from "firebase/firestore/lite"

export type type_product = {
    id: string
    category: string
    title: string
    prize: number
    img: string[]
    symbolprize:string,
    in_stock:boolean,
    desc:string
  } 

  export type promiseGetAll =  Promise<QuerySnapshot<DocumentData, DocumentData>>
  export type promiseGetOne =    Promise<DocumentSnapshot<any>>
  export type promiseAddDocc = Promise<DocumentReference<any, DocumentData>>
