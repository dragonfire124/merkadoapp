/* eslint-disable no-alert */
import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUSer, showLoading, showMessage } from "../utils";

const signinScreen ={
    after_render: ()=>{

      document.getElementById('signin-form')
      .addEventListener('submit', async (e)=>{
        e.preventDefault();
        showLoading();
        const data = await  signin({
          email:  document.getElementById('email').value,
          password: document.getElementById('password').value,
        });
        hideLoading();
        if(data.error){
          showMessage(data.error);
        }else{
          setUserInfo(data);
          redirectUSer();
        }
      });
    },
    render:()=>{
      if(getUserInfo().name){
        redirectUSer(); 
      }
      return `
        <div class="form-container">
            <form id ="signin-form">
                <ul class="form-items">
                  <li>
                   <h1>Sign-in</h1>
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
                    <button type="submit" class="primary">Signin</button>
                  </li>
                  <li>
                    <div>
                     New User ?
                     <a href ="/#/register">Create your account</a>
                    </div>
                  </li>
                </ul>
            </form>
        </div>
    `},

}

export default signinScreen;