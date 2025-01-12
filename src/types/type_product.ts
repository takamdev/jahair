import { DocumentData, DocumentReference, DocumentSnapshot, QuerySnapshot } from "firebase/firestore/lite"

export type type_product = {
    id: string
    category: {
      fr:string,
      en:string,
      it:string
    }
    title: {
      fr:string,
      en:string,
      it:string
    }
    prize: number
    img: string[]
    in_stock:boolean,
    desc:{
      fr:string,
      en:string,
      it:string
    },
    rating:number,
    caracteristique:{
      fr:string,
      en:string,
      it:string
    },
    taille:string
  } 

  export type promiseGetAll =  Promise<QuerySnapshot<DocumentData, DocumentData>>
  export type promiseGetOne =    Promise<DocumentSnapshot<any>>
  export type promiseAddDocc = Promise<DocumentReference<any, DocumentData>>
