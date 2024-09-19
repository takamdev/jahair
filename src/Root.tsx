import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "./App";
import Produit from "./pages/Produit";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";

function Root() {
const route = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        errorElement:<p>errreur</p>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:"product",
                element:<Produit/>
            },
            {
                path:"contact",
                element:<Contact/>
            },
            {
                path:"services",
                element:<Services/>
            },
            {
                path:"about-us",
                element:<AboutUs/>
            }
        ]
    }
])
  return (
    <RouterProvider router={route}/>
  )
}

export default Root