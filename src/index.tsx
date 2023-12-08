import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import TokenStore from './store/TokenStore';
import { IStoreContext } from './interfaces/IStoreContext';

const tokenStore = new TokenStore();

export const StoreContext = React.createContext<IStoreContext>({tokenStore});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContext.Provider value={{ tokenStore }}>
        <App />
      </StoreContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);