import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import TokenStore from './store/TokenStore';

interface ITokenStore {
  tokenStore: TokenStore
}

const tokenStore = new TokenStore();

export const TokenContext = React.createContext<ITokenStore>({tokenStore});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TokenContext.Provider value={{ tokenStore }}>
        <App />
      </TokenContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);