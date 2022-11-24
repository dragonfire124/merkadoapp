import { hideLoading, parseRequestUrl, showLoading } from "../utils";
import { getProduct } from "../api";
import rating from '../components/rating';

const productScreen = {
    after_render: ()=>{
        const request  = parseRequestUrl();
        
        document.getElementById("add-button").addEventListener('click', ()=>{
            document.location.hash = `/cart/${request.id}`
        });
    },    
    render: async() =>{
            const request  = parseRequestUrl();
            showLoading();
            const product  = await  getProduct(request.id)
            if(product.error){
                return `<div>${product.error}</div>`
            }
            hideLoading();
            return `
            <div class ="content">
                <div class ="back-to-result">
                    <a href ="/#/">Back to result</a>
                </div>
              <div class="datails">
                    <div class="details-image ">
                        <img src ="${product.image}" alt="${product.name}" />
                    </div>
                    <div class="details-info">
                    <ul>
                      <li>
                        <h1>${product.name}</h1>
                      </li>
                      <li>
                        ${rating.render({
                            value:product.rating,
                            text:`${product.numReviews} reviews`,
                        })}
                      </li>
                      <li>
                        Price: <strong>$${product.price}</strong>
                      </li>
                      <li>
                        Description: 
                        <div>
                          ${product.description}
                        </div>
                      </li>
                    </ul>
                </div>
                <div class="details-action">
                <ul>
                  <li>
                    Price: $${product.price}
                  </li>
                  <li>
                    Status:
                    ${
                        product.countInStock > 0?
                        `<span class="success">In stock</span>`
                        : `<span class="error">Unavailable</span>`
                    }
                  </li>
                  <li>
                    <button id="add-button" class="fw primary">Add to Cart</button>
                  </li>
                  <ul>
                  </div>
                </div>
                </div>`
        },
};
export default productScreen;