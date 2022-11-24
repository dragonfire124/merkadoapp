
import { getOrder, getPaypalClientId } from '../api';
import {  hideLoading, parseRequestUrl, rerender, showLoading, showMessage } from '../utils';



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

async function  addPaypalSdk(totalPrice){
  const clientId = await getPaypalClientId();                                       // Obtiene Id de la base de datos 
  showLoading();
  if(!window.paypal){
    const script = document.createElement('script')
    script.type = 'text/javascript';
    script.src= 'https://www.paypal.com/sdk/js?client-id=test&currency=MXN'
    
    script.onload =()=> handlePayment(clientId,totalPrice);
    document.body.appendChild(script);
  }else{
    handlePayment(clientId, totalPrice)
  }
}

const orderScreen = {
    after_render: async()=>{ },
    render: async ()=>{                                                                 // Contruye el html del pedido incluye lista de carrito, datos direccion, metodo pago, lista de pago. 
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
        if(!isPaid){
          addPaypalSdk(totalPrice)
        }
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
                      `)}
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
                      <li><div id="paypal-button" class="fw"></div></li>
                      </ul>
                    
                </div>
                
              </div>
            </div>       
        `;
    },
};

export default orderScreen;