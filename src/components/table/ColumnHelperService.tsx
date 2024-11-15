import { createColumnHelper } from "@tanstack/react-table"
import { type_service } from "../../types/type_service"

const ColumnHelper = ()=>{
const columnHelper = createColumnHelper<type_service>()
return [
  columnHelper.accessor('id', {
    header:"N",
    footer: info => info.column.id,
  }),
  columnHelper.accessor("name", {
    header: "Nom",
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
  columnHelper.accessor('video', {
    header: 'Video',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('img', {
    header: 'Image',
    footer: info => info.column.id,
  })
]
}

export default ColumnHelper