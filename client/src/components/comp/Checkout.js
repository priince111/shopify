import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
const STRIPE_PUBLISHABLE = 'pk_test_51PVchv060EZIjLGXcaPyOlJftqgVlGuMhTSbQaajM8cRe3cxiJMMnYihEN5tnqG1KR7R8NaLf4uHCb4AwInFgqHz00AooMaNxx';

const onToken = (user,checkout) => async (token) => {
    try {
        console.log("checkout",checkout)
        await checkout(user.id, token.id);
        alert("Payment Successful");
    } catch (error) {
        alert("Payment Failed: " + error.message);
    }
}



const Checkout = ({ amount, user, checkout }) => 
    <StripeCheckout
      amount={amount*100}
      token={onToken(user,checkout)}
      currency='INR'
      stripeKey={STRIPE_PUBLISHABLE}>
      <button className="btn btn-primary">
      Pay Now
    </button>
</StripeCheckout>

export default Checkout