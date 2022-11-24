/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import dashBoardMenu from "../components/dashBoardMenu";
import { createProduct, deleteProduct, getProducts } from "../api";
import { hideLoading, rerender, showLoading, showMessage } from "../utils";

const  productlistScreen = {
    after_render :()=>{
      document
      .getElementById('create-product-button')
      .addEventListener('click', async()=>{
        const data = await createProduct();                               // Crea un nuevo producto en base de datos de tipo "sample"
        
        document.location.hash = `/product/${data.product._id}/edit`
      })
    
      const editButtons = document.getElementsByClassName('edit-button')  // Edita la informacion de producto creado 
      Array.from(editButtons).forEach(editbutton=>{
        editbutton.addEventListener('click',()=>{
          document.location.hash = `/product/${editbutton.id}/edit`
        } )
      })

    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', async () => {
        if (confirm('Are you sure to delete this product?')) {
          showLoading();
          const data = await deleteProduct(deleteButton.id);
          if (data.error) {
            showMessage(data.error);
          } else {
            rerender(productlistScreen);
          }
          hideLoading();
        }
      });
    });
      
    },
    render: async()=>{
        const products = await getProducts();
        return `
        <div class="dashboard">
          ${dashBoardMenu.render({selected:'products'})}
          <div class="dashboard-content">
            <h1>Products</h1>
            <button id ="create-product-button" class="primary">Create product</button>
            <div class="product-list">
              <table>
                <thead>
                  <tr>
                   <th>ID</th>
                   <th>NAME</th>
                   <th>PRICE</th>
                   <th>CATEGORY</th>
                   <th>BRAND</th>
                   <th class="tr-action">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  ${products.map((product)=> `
                  <tr>
                    <td>${product._id}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.category}</td>
                    <td>${product.brand}</td>
                    <td>
                    <button id ="${product._id}" class="edit-button" >Edit</button>
                    <button id ="${product._id}" class="delete-button" >Delete</button>
                    </td>
                  </tr>
                  
                  `).join('\n')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        `
    },
}

export default productlistScreen; 