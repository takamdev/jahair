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
import Admis from "./pages/Admis";
import Auth from "./pages/Auth";
import ForgetPassword from "./pages/ForgetPassword";
import Error_page from "./pages/Error_page";

function Root() {
const route = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        errorElement:<Error_page/>,
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
            },
            {  // admin
                path:"admin",
                element:<Auth/>
            },
            {  // dashboard
                path:"admin/dashboard/:token",
                element:<Admis/>
            },
            {  // forget password
                path:"admin/forget-password",
                element:<ForgetPassword/>
            }
        ]
    }
])
  return (
    <RouterProvider router={route}/>
  )
}

export default Root