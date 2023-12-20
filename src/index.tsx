import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import TokenStore from './store/TokenStore';
import { IStoreContext } from './interfaces/IStoreContext';
import CartStore from './store/CartStore';
import UserStore from './store/UserStore';
import CarStore from './store/CarStore';

const tokenStore = new TokenStore();
const cartStore = new CartStore();
const carStore = new CarStore();
const userStore = new UserStore();

export const StoreContext = React.createContext<IStoreContext>({
  tokenStore,
  cartStore,
  carStore,
  userStore
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContext.Provider value={{
        tokenStore,
        cartStore,
        carStore,
        userStore
      }}>
        <App />
      </StoreContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);