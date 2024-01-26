import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID!}>
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
);