import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Produit from "./pages/Produit";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Admis from "./pages/Admin";
import Auth from "./pages/Auth";
import ForgetPassword from "./pages/ForgetPassword";
import Error_page from "./pages/404";
import Faq from "./pages/Faq";
import Entretien from "./pages/Entretien";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms_conditions from "./pages/Terms_conditions";
import Product_Item from "./pages/Product_Item";
import Test from "./pages/Test";
import Service_item from "./pages/Service_item";
import RequestAppointment from "./pages/RequestAppointment";
import Init_payment from "./pages/Init_payment";
import Completion from "./pages/Complation";
import Result from "./pages/Result";

function Root() {
   const route = createBrowserRouter([
      {
         path: "/",
         element: <App />,
         errorElement: <Error_page />,
         children: [
            {
               path: "",
               element: <Home />,
            },
            {
               path: "product",
               element: <Produit />,
            },

            {
               path: "product/:id",
               element: <Product_Item />,
            },
            {
               path: "contact",
               element: <Contact />,
            },
            {
               path: "services",
               element: <Services />,
            },
            
            {
               path: "service/:id",
               element: <Service_item />,
            },

            {
               path: "faq",
               element: <Faq />,
            },
            {
               path: "entretien",
               element: <Entretien />,
            },
            {
               path: "privacy-policy",
               element: <PrivacyPolicy />,
            },
            {
               path: "terms-and-conditions",
               element: <Terms_conditions />,
            },
            {
               path: "about-us",
               element: <AboutUs />,
            },
            {
               // admin
               path: "admin",
               element: <Auth />,
            },
            {
               // dashboard
               path: "admin/dashboard/:token",
               element: <Admis />,
            },
            {
               // forget password
               path: "admin/forget-password",
               element: <ForgetPassword />,
            },
            {
               // test
               path: "service/request-appointment/:id",
               element: <RequestAppointment />,
            },
            {
               // test
               path: "test",
               element: <Test />,
            },
            {
               
               path: "init-payment",
               element: <Init_payment />,
            },
            {
               
               path: "init-payment/payment-succeeded",
               element: <Completion />,
            },
            {
               
               path: "search/results",
               element: <Result />,
            },
         ],
      },
   ]);
   return <RouterProvider router={route} />;
}

export default Root;
