import { useParams } from "react-router-dom"

function RequestAppointment() {
    const {id}=useParams()
  return (
    <div className="mt-14">{id}</div>
  )
}

export default RequestAppointment