
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import classes from "./App.module.css";
import Admin from '../pages/Admin/Admin';
import Authorize from '../pages/Authorize/Authorize';
import Catalog from '../pages/Catalog/Catalog';
import TechnicalWork from '../pages/TechnicalWork/TechnicalWork';
import TokenStore from '../store/TokenStore';
import { useRef } from 'react';
import { observer } from 'mobx-react';

function App() {
  const location = useLocation();

  function ConditionalElement(mainElement: JSX.Element) {
    if(!TokenStore.isAuth) {
      return <Navigate to="/authorize"/>
    }
    if(TokenStore.isTechnicalWork){
      return <Navigate to="/technicalWork"/>
    }

    return mainElement;
  }

  return (
    <div className="App">
      <div className={classes.authorize}>
        <Routes location={location} key={location.key}>
          <Route path="*" element={<Navigate to="/authorize" replace={true} />} />
          <Route path="authorize" element={<Authorize />} />
          <Route path="catalog" element={ConditionalElement(<Catalog/>)} />
          <Route path="admin" element={ConditionalElement(<Admin />)} />
          <Route path="technicalWork" element={<TechnicalWork />} />
        </Routes>
      </div>
    </div>
  );
}

export default observer(App);
