import { BiError } from "react-icons/bi"; 
import { loadStripe } from '@stripe/stripe-js';
import {useEffect, useState} from 'react';
import useStore from '../store';
import { useTranslation } from "react-i18next";
import parse from "html-react-parser"
const stripePromise =loadStripe(process.env.PUBLIC_KEY as string);

function Completion() {
  const resetCart = useStore(state=>state.resetCart)
  const [isSuccess,setIsSuccess]=useState<boolean|null>(null)
  const {t}=useTranslation()
  useEffect(() => {
    resetCart([])
    if (!stripePromise) return;

    stripePromise.then(() => {
      const url = new URL(window.location.href);
      const status = url.searchParams.get('status') as string;
      if(status==="succeeded") setIsSuccess(true)
        else setIsSuccess(false)
    });
  }, [stripePromise]);

  return (
    <main className='lg:mt-28 mb-14 lg:mb-60'>
      {
        isSuccess ? <div  className='mt-10 lg:w-[600px] h-[500px] my-auto  mx-auto'>
            
            <p className='mt-14 text-5xl text-center roboto-regular'>
            {t("success_payment")} <span className='roboto-bold'>JahairStyle</span>
            </p>
            <p className='text-center roboto-regular h-[400px]'>
                <img src="/img/confirmation.webp" alt="success" className='mx-auto h-full' />
            </p>
        </div> : <div  className='pt-40 lg:w-[600px] h-[500px]   mx-auto'>
            
            <p className='mt-14 text-2xl text-center roboto-regular'>
            {parse(t("failed_payment"))}
            </p>
            <p className='text-center mt-14 roboto-regular h-[400px]'>
                <BiError className="mx-auto text-red-600" style={{transform:"scale(7)"}} />
            </p>
        </div>
      }
    </main>
  );
}

export default Completion;
