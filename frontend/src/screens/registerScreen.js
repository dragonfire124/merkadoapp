import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUSer, showLoading, showMessage } from "../utils";

const registerScreen ={
    after_render: ()=>{

      document.getElementById('register-form')                    // Se agrega listener al boton registrar
      .addEventListener('submit', async (e)=>{
        e.preventDefault();
        showLoading();
        const data = await  register({                            // Obtiene objeto "data" 
          name:  document.getElementById('name').value,
          email:  document.getElementById('email').value,
          password: document.getElementById('password').value,
        });
        hideLoading();
        if(data.error){
          showMessage(data.error);
        }else{                                                    // Guarda "data" en localstorage
          setUserInfo(data);
          redirectUSer();                                         // Si hay elementos en carrito dirige a "shopping" sino a "home"
        }
      });
    },
    render:()=>{
      if(getUserInfo().name){
        redirectUSer();                                           //  
      }
      return `
        <div class="form-container">
            <form id ="register-form">
                <ul class="form-items">
                  <li>
                   <h1>Create Account</h1>
                  </li> 
                  <li>
                  <label for="name">Name</label>
                  <input type="name" name="name" id="name">
                </li>     
                  <li>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email">
                  </li>
                  <li>
                   <label for="password">Password</label>
                   <input type="password" name="password" id="password"/>
                  </li>  
                  <li>
                   <label for="repassword">Re-Enter Password</label>
                   <input type="password" name="repassword" id="repassword"/>
                  </li> 
                  <li>
                    <button type="submit" class="primary">Register</button>
                  </li>
                  <li>
                    <div>
                     Already have an account ?
                     <a href ="/#/signin">Sign-In </a>
                    </div>
                  </li>
                </ul>
            </form>
        </div>
    `},

}

export default registerScreen;