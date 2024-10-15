import { createColumnHelper } from "@tanstack/react-table"
import {type_product} from "../../types/type_product"

const ColumnHelper = ()=>{

const columnHelper = createColumnHelper<type_product>()
return [
  columnHelper.accessor('id', {
    header:"N",
    footer: info => info.column.id,
  }),
  columnHelper.accessor("title", {
    header: "Nom",
    footer: info => info.column.id,
  }),
  columnHelper.accessor('category', {
    header: "Category",
    footer: info => info.column.id,
  }),
  columnHelper.accessor('desc', {
    header: "Description",
    footer: info => info.column.id,
  }),
  columnHelper.accessor('prize', {
    header: "Prix",
    footer: info => info.column.id,
  }),
  
  columnHelper.accessor('in_stock', {
    header: 'En stock',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('img', {
    header: 'Images',
    footer: info => info.column.id,
  })
]
}

export default ColumnHelper