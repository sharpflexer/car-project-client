import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import TokenStore from './store/TokenStore';
import { IStoreContext } from './interfaces/IStoreContext';
import CartStore from './store/CartStore';
import UserStore from './store/UserStore';
import CarStore from './store/CarStore';
import { create } from 'mobx-persist';

const tokenStore = new TokenStore();
const cartStore = new CartStore();
const carStore = new CarStore();
const userStore = new UserStore();

const hydrate = create({
  storage: localStorage,
  jsonify: true
})

hydrate("tokenStore", tokenStore).then(() => console.log('tokenStore has been hydrated'));

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
);