import axios from "axios";
import { apiUrl } from "./config";
import { getUserInfo } from "./localStorage";

export const getProduct = async(id)=>{
    try {
        const response = await axios({
            url:`${apiUrl}/api/products/${id}`,
            method: 'GET',
            Headers:{
                'Content-Type': 'aplication/json',
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return {error: err.response.data.message || err.message}
    }
};

export const getProducts = async()=>{
    try {
        const response = await axios({
            url:`${apiUrl}/api/products`,
            method: 'GET',
            Headers:{
                'Content-Type': 'aplication/json',
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return {error: err.response.data.message || err.message}
    }
};

export  const createProduct = async()=>{
    try {
        
        const {token} = getUserInfo();
        console.log(token)
        const response = await axios ({
            url: `${apiUrl}/api/products`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }

        })
        if(response.statusText !=='Created'){
            throw new Error(response.data.message)
        }
        else{
            return response.data; 
        }
    } catch (err) {
        return {error: err.response.data.message || err.message}
    }
}


export const deleteProduct = async (productId) => {
    try {
      const { token } = getUserInfo();
      const response = await axios({
        url: `${apiUrl}/api/products/${productId}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
  };

                        // CREATE PRODUCT

    export  const updateProduct = async(product)=>{
                            try {
                                
                                const {token} = getUserInfo();
                                const response = await axios ({
                                    url: `${apiUrl}/api/products/${product._id}`,
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}`
                                    },
                                    data: product,
                                })
                                if(response.statusText !=='OK'){
                                    throw new Error(response.data.message)
                                }
                                else{
                                    return response.data; 
                                }
                            } catch (err) {
                                return {error: err.response.data.message || err.message}
                            }
                        }
       
                        // UPLOAD DOCUMENT

export  const uploadProductImage = async(formData)=>{
    try {
        const {token}= getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/uploads`,
            method: 'POST',
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            data: formData,
        });
        if(response.statusText !== 'Created'){
            throw new Error(response.data.message)
        }else{
            return response.data; 
        }
    } catch (err) {
        return {error: err.response.data.message || err.message};
    }
}
export const signin = async ({email,password})=>{
    try {
        const response = await  axios({
            url: `${apiUrl}/api/users/signin`,
            method: 'POST',
            header:{
                'Content-Type': 'application/json',
            },
            data:{
                email,
                password
            }
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    } catch (err) {
        console.log(err)
        return {error: err.response.data.message || err.message};
    }
};

export const register = async ({name, email,password})=>{
    try {
        const response = await  axios({                         //  
            url: `${apiUrl}/api/users/register`,
            method: 'POST',
            header:{
                'Content-Type': 'application/json',
            },
            data:{                                              // Se crea objeto "data" con datos de formulario
                name,
                email,
                password
            }
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;                                   // Regresa objeto "data"
    } catch (err) {
        console.log(err)
        return {error: err.response.data.message || err.message};
    }
};


export const update = async ({name, email,password})=>{
    try {
        const {_id,token}= getUserInfo();
        const response = await  axios({
            url: `${apiUrl}/api/users/${_id}`,
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data:{
                name,
                email,
                password
            }
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    } catch (err) {
        console.log(err)
        return {error: err.response.data.message || err.message};
    }
};

export const createOrder = async(order) => {
    try {
        const {token} =  getUserInfo();
        const response  = await axios({
            url:`${apiUrl}/api/orders`,
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: order,                                       // REgresa objeto data con info de la ordens                                        // DEvuelve datos de la orden
        })
        if(response.statusText !== 'Created'){
            throw new Error (response.data.message)                 
        }
        return response.data;                                       //
    } catch (err) {
        return {error:err.response ? err.response.data.message: err.message}
    }
}

export const getOrder = async(id)=>{
try {
    const {token}= getUserInfo();                                       // Obtiene info de usuario en localStorage
    const response = await axios({
        url:`${apiUrl}/api/orders/${id}`,
        headers: {
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if(response.statusText !== 'OK'){
        throw new Error (response.data.message)                 
    }
    return response.data;
} catch (err) {
    return {error: err.message}
}
}


export const getOrders = async()=>{
    try {
        const {token}= getUserInfo();                                       // Obtiene info de usuario en localStorage
        const response = await axios({
            url:`${apiUrl}/api/orders`,
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error (response.data.message)                 
        }
        return response.data;
    } catch (err) {
        return {error: err.message}
    }
}


export const deleteOrder = async (orderId) => {
    try {
      const { token } = getUserInfo();
      const response = await axios({
        url: `${apiUrl}/api/orders/${orderId}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
  };

  
export const deliverOrder = async (orderId) => {
    try {
      const { token } = getUserInfo();
      const response = await axios({
        url: `${apiUrl}/api/orders/${orderId}/deliver`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
  };



export const getPaypalClientId = async()=>{
    const response = await axios({
        url:`${apiUrl}/api/paypal/clientId`,
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if(response.statusText !== 'OK'){
        throw new Error(response.data.message)
    }
    return response.data.clientId;
}


export const getSummary = async()=>{
    try {
        const {token}= getUserInfo();                                       // Obtiene info de usuario en localStorage
        const response = await axios({
            url:`${apiUrl}/api/orders/summary`,
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error (response.data.message)                 
        }
        return response.data;
    } catch (err) {
        return {error: err.message}
    }
}