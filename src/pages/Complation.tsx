import { loadStripe } from '@stripe/stripe-js';
import {useEffect, useState} from 'react';
import useStore from '../store';
const stripePromise =loadStripe(process.env.PUBLIC_KEY as string);

function Completion() {
  const [ messageBody, setMessageBody ] = useState<any>('');
  const resetCart = useStore(state=>state.resetCart)
  useEffect(() => {
    resetCart([])
    if (!stripePromise) return;

    stripePromise.then(async (stripe:any) => {
      const url = new URL(window.location.href);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      if(error) setMessageBody(`> ${error.message}` )
        else setMessageBody(<>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
        )
    });
  }, [stripePromise]);

  return (
    <>
      <h1>Thank you!</h1>
      <a href="/">home</a>
      <div id="messages" role="alert" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div>
    </>
  );
}

export default Completion;
