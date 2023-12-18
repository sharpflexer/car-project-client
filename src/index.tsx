import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import TokenStore from './store/TokenStore';
import { IStoreContext } from './interfaces/IStoreContext';
import CartStore from './store/CartStore';

const tokenStore = new TokenStore();
const cartStore = new CartStore();

export const StoreContext = React.createContext<IStoreContext>({tokenStore, cartStore});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContext.Provider value={{ tokenStore, cartStore}}>
        <App />
      </StoreContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);