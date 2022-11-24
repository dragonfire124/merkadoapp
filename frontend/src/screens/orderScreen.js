
/* eslint-disable no-unused-vars */

import { deliverOrder, getOrder, getPaypalClientId } from '../api';
import { getUserInfo } from '../localStorage';
import {  hideLoading, parseRequestUrl,  renderFunction,  rerender, showLoading, showMessage } from '../utils';


/*
const handlePayment=(clientId, totalPrice)=>{
  window.paypal.Button.render({
   env: 'sandbox',
   client:{
     sandbox: clientId,
     production: '',
   },
   locale: 'en_US',
   style:{
     size:'responsive',
     color: 'gold',
     shape: 'pill',
   },
   commit:true,
   payment (data,actions){
     return actions.payment.create({
       transactions:[
         {
           amount:{
             total:totalPrice,
             currency: 'MXN',
           },
         }
       ],
     });
   },
   onAuthorize(data,actions){
     return actions.payment.execute().then(async()=>{
       showLoading();
       hideLoading();
       showMessage('Payment was successful.', ()=>{
         rerender(orderScreen);
       });
     });
   },
  },
  '#paypal-button'
  ).then(()=>{
 hideLoading();
  })
 }
*/
const addPaypalSdk = async(totalPrice)=>{

      console.log('Entro addpaypalsdk')
     
      const script1 = document.createElement('script')
      script1.src = "https://www.paypal.com/sdk/js?client-id=AdhGWAGlcYEGqnO7nkSlsLC2TNAbAigLT8xaCLyU9sOOjnlVEsNHcgI87IiWVg_3Y26SIbKRwnA5AgJe&currency=MXN"
      script1.async = true; 
      script1.type = "text/javascript"
      document.body.appendChild(script1);
      const script2 = document.createElement('script')
      
      script2.innerHTML = 'paypal.Buttons().render("#paypal-payment-button")'
      document.body.appendChild(script2);
}

  const orderScreen = {
    after_render: async()=>{ 
      const request = parseRequestUrl();
      document.getElementById('deliver-order-button')
      .addEventListener('click', async()=>{
        showLoading();
        await deliverOrder(request.id);
        hideLoading();
        showMessage('Order Delivered');
        rerender(orderScreen) 
      });
      
     }, 
    render: async ()=>{     
                                                                 // Contruye el html del pedido incluye lista de carrito, datos direccion, metodo pago, lista de pago. 
        const request = parseRequestUrl();
        
        const {
          _id,
          shipping,
          payment,
          orderItems,
          itemsPrice,
          shippingPrice,
          taxPrice, 
          totalPrice,
          isDelivered,
          deliveredAt,
          isPaid,
          PaidAt
        } = await getOrder(request.id);
        
        const{isAdmin} = getUserInfo();
        return ` 
        <div>
           <h1>Order ${_id}</h1>
            <div class="order">
              <div class="order-info">
                <div>
                  <h2>Shipping</h2>
                  <div>
                  ${shipping.address}, ${shipping.city}, ${shipping.postalCode},${shipping.country}
                  </div>
                  ${isDelivered
                  ?
                  `<div class="success">Delievered at ${deliveredAt}</div>`
                  : `<div class="error">Not delivered</div>`
                }
                </div>  
                <div>
                  <h2>Payment</h2>
                  <div>
                    Payment Method: ${payment.paymentMethod}
                  </div>
                  ${isPaid
                    ?
                    `<div class="success">Paid at ${PaidAt}</div>`
                    : `<div class="error">Not Paid</div>`
                  }
                </div>
                <div>                                                        
                <ul class ="cart-list-container">
                  <li>
                    <h2>Shopping Cart</h2>
                    <div>Price</div>
                  </li>
                ${orderItems.map(
                    (item)=>` 
                      <li>
                        <div class="cart-image">
                          <img src="${item.image}" alt="${item.image}"/>
                        </div>    
                        <div class="cart-name">
                          <div>
                            <a href="/#/product/${item.product}">${item.name}</a>
                          </div>
                          <div> Qty: ${item.qty}</div>
                        </div>
                        <div class="cart-price">$${item.price}</div>
                      </li>
                      ` 
                      )}
                    </ul>  
                  </div>
                </div>
                <div class="order-action">                                
                    <ul>
                      <li>
                        <h2>Order Summary</h2>
                      </li>
                      <li><div>Items</div><div>${itemsPrice}</div></li>
                      <li><div>Shipping</div><div>${shippingPrice}</div></li>
                      <li><div>Tax</div><div>${taxPrice}</div></li>
                      <li class= "total"><div>Order Total</div><div>${totalPrice}</div></li>
                      <li><div class= "fw" id="paypal-button"></div></li>
                      <li>
                      ${
                        !isDelivered && isAdmin? 
                      `<button id="deliver-order-button" class="primary fw">Deliver Order</button>`:
                      ''
                      }
                      </li>
                      </ul>
                </div>
                
              </div>
            </div>`

    }
 
}

export default orderScreen;