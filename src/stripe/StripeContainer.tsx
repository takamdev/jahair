
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe,Appearance } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "../store";
const stripePromise = loadStripe(import.meta.env.PUBLIC_KEY);
const appearance:Appearance = {
  theme: 'stripe',
  variables: {
    fontWeightNormal: '500',
    borderRadius: '2px',
    colorPrimary: '#f360a6',
    tabIconSelectedColor: '#fff',
    gridRowSpacing: '16px'
  },
  rules: {
    '.Tab, .Input, .Block, .CheckboxInput, .CodeInput': {
      boxShadow: '0px 3px 10px rgba(18, 42, 66, 0.08)'
    },
    '.Block': {
      borderColor: 'transparent'
    },
    '.BlockDivider': {
      backgroundColor: '#ebebeb'
    },
    '.Tab, .Tab:hover, .Tab:focus': {
      border: '0'
    },
    '.Tab--selected, .Tab--selected:hover': {
      backgroundColor: '#f360a6',
      color: '#fff'
    }
  }
};

function StripeContainer({amount,email}:{amount:number,email:string}) {
  const setting = useStore(state=>state.setting)
  const [clientSecret,setClientSecret]=useState<string>('')
    
  const option = {
    clientSecret:clientSecret,
    appearance,
    
  }

  
  useEffect(()=>{
    const data = {
      amount:amount,
      currency:setting.symbole_devise==="$"?"usd":"eur"
    }
    axios.post(`${import.meta.env.baseURL}/api/create-payment-intent`,data).then(res=>{
     const getSecret = res.data.clientSecret
     console.log(getSecret);
     
     setClientSecret(getSecret)
    }).catch(err=>{console.log(err);
    })
  },[])


  if(clientSecret.length!==0 && stripePromise!==null)return (

    <>
        <Elements stripe={stripePromise} options={option} >
          {" "}
          <CheckoutForm  email={email}/>{" "}
        </Elements>
    </>
   




   );
   else return null
}

export default StripeContainer;
