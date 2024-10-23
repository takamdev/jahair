import { Link } from "react-router-dom"


function Entretien() {
  return (
    <div className="lg:my-60 my-20 flex flex-col lg:flex-row justify-center items-center lg:gap-40">
          
            <p className="text-9xl roboto-medium opacity-50">404</p>
         
          <div className="flex flex-col justify-center items-center">
            <p className="text-5xl roboto-bold">Désolé!</p>
            <p className="text-xl text-red-600 roboto-medium">Page Non Trouvée</p>
            <p className="text-3xl lg:mt-14 roboto-medium p-3">
             La page que vous cherchez  est temporairement indisponible.
            </p>
            <Link className="text-xl mt-2 underline roboto-medium text-rose-300" to="/">Retour à l'acceuil</Link> 
          </div>
        </div>
  )
}

export default Entretien