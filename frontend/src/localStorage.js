export const    getCartItems =()=>{
    const cartItems = localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')):
    [];
    return cartItems; 
}

export const setCartItems = (cartItems)=>{
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const setUserInfo = ({    
_id = '',
name ='',
email ='',
password='',
token='',
isAdmin = false,
})=>{
    localStorage.setItem('userInfo', JSON.stringify({
        _id,
        name,
        email,
        password,
        token,
        isAdmin,
    }))
}

export const getUserInfo =()=>{
    return localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):
    {name: '', email: '', password: ''};
}

export const clearUser =()=>{
    localStorage.removeItem('userInfo')
}

export const getShipping =()=>{                             // Obtiene items de "shipping " en localstorage, si no los hay regresa objeto con valores vacios. 
    const shipping = localStorage.getItem('shipping')?
    JSON.parse(localStorage.getItem('shipping')):
    {
        address: '',
        city: '',
        postalCode: '',
        country: '',
    }
    return shipping;
}

export const setShipping = (
    {
        address='',                                          // Default values
        city ='',
        postalCode='',
        country=''

    }
) =>{
    localStorage.setItem(
        'shipping', JSON.stringify({address, city, postalCode, country})
    );
}



export const getPayment =()=>{                             // Obtiene items de "payment" en localstorage, si no los hay regresa objeto con valores vacios. 
    const payment = localStorage.getItem('payment')?
    JSON.parse(localStorage.getItem('payment')):
    {
        paymentMethod: 'paypal',
       
    }
    return payment;
}

export const setPayment = (
    {                                               // Default values
        paymentMethod =  'paypal'}) =>{
    localStorage.setItem(
        'payment', JSON.stringify({paymentMethod})  // Guarda el localStorage el metodo de pago 
    );
}

export const cleanCart =()=>{
    localStorage.removeItem('cartItems');
}