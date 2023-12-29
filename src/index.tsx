import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import TokenStore from './store/TokenStore';
import CartStore from './store/CartStore';
import UserStore from './store/UserStore';
import CarStore from './store/CarStore';
import { create } from 'mobx-persist';

const hydrate = create({
  storage: localStorage,
  jsonify: true
})

hydrate("tokenStore", TokenStore).then(() => console.log('tokenStore has been hydrated'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);