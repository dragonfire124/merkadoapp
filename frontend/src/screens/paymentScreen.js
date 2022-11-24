import {   getUserInfo, setPayment } from "../localStorage";
import checkoutSteps from "../components/checkoutSteps";

const paymentScreen ={
    after_render: ()=>{
      document.getElementById('payment-form')
      .addEventListener('submit', async (e)=>{
       e.preventDefault();
       const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
       setPayment({paymentMethod})
      document.location.hash ='/placeorder'
      });
    },
    render:()=>{
      const {name}= getUserInfo();
      if(!name){
        document.location.hash = "/"; 
      }
      
      return `
      ${checkoutSteps.render({step1:true, step2:true, step3: true})}
        <div class="form-container">
            <form id ="payment-form">
                <ul class="form-items">
                  <li>
                   <h1>Payment</h1>
                  </li> 
                <li>
                  <div>
                  <input type="radio"
                  name="payment-method"
                  id="paypal"
                  value="paypal"
                  checked />
                  
                  <label for="paypal">PayPal</label> 
                  </div>
                </li>
                <li>
                  <div>
                  <input type="radio"
                  name="payment-method"
                  id="stripe"
                  value="stripe"
                  checked />
                  
                  <label for="stripe">Stripe</label> 
                  </div>
                </li>
                <li>
                  <button type="submit" class="primary">Continue</button>
                 </li>
                 
                </ul>
            </form>
        </div>
    `},

}

export default paymentScreen;