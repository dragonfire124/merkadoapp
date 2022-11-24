import HomeScreen from './screens/HomeScreen';
import productScreen from "./screens/productScreen"
import { hideLoading, parseRequestUrl, showLoading } from "./utils"
import Error404Screen from "./screens/Error404Screen"
import cartScreen from './screens/cartScreen';
import signinScreen from './screens/signingScreen';
import Header from './components/header';
import registerScreen from './screens/registerScreen';
import profileScreen from './screens/profileScreen';
import shippingScreen from './screens/shippingScreen';
import paymentScreen from './screens/paymentScreen';
import placeOrderScreen from './screens/placeOrderScreen';
import orderScreen from './screens/orderScreen';
import dashBoardScreen from './screens/dashBoardScreen';
import productlistScreen from './screens/productListScreen';
import productEditScreen from './screens/productEditScreen';
import orderListScreen from './screens/orderListScreen';


const routes = {
    '/': HomeScreen,
    '/product/:id/edit': productEditScreen,
    '/product/:id': productScreen,
    '/order/:id': orderScreen,
    '/orderlist': orderListScreen,
    '/cart/:id': cartScreen, 
    '/cart': cartScreen, 
    '/signin': signinScreen,
    '/register':registerScreen,
    '/profile':profileScreen,
    '/shipping':shippingScreen,
    '/payment': paymentScreen,
    '/placeorder': placeOrderScreen,
    '/dashboard': dashBoardScreen,
    '/productlist': productlistScreen,
};

async function router() {
    showLoading();
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const header = document.getElementById('header-container');
    header.innerHTML = await Header.render();
    await Header.after_render();
    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render();
    if (screen.after_render)await screen.after_render();
    hideLoading();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
