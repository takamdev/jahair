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
import Faq from "./pages/Faq";
import Entretien from "./pages/Entretien";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms_conditions from "./pages/Terms_conditions";
import Product_Item from "./pages/Product_Item";

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
                path:"product/:id",
                element:<Product_Item/>
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
                path:"faq",
                element:<Faq/>
            },
            {
                path:"entretien",
                element:<Entretien/>
            },
            {
                path:"privacy-policy",
                element:<PrivacyPolicy/>
            },
            {
                path:"terms-and-conditions",
                element:<Terms_conditions/>
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