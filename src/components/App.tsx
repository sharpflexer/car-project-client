
import { Navigate, Route, Routes, useLocation, useRoutes } from 'react-router-dom';
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
  const {isAuth, isTechnicalWork} = TokenStore;

  // function ConditionalElement(mainElement: JSX.Element) {
  //   if (!TokenStore.isAuth) {
  //     return <Navigate to="/authorize" replace={true} />
  //   }
  //   if (TokenStore.isTechnicalWork) {
  //     return <Navigate to="/technicalWork" replace={true} />
  //   }

  //   return mainElement;
  // }

  function AvailableRoutes() {
    if (!isAuth) {
      return <Route path="authorize" element={<Authorize />} />
    }
    if(isTechnicalWork){
      return null;
    }
    return (
      <>
        <Route path="authorize" element={<Authorize />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="admin" element={<Admin />} />
      </>
    );
  }

  function DefaultRoute() {
    if (!isAuth) {
      return (<Navigate to="/authorize" replace={true} />);
    }
    if(isTechnicalWork){
      return (<Navigate to="/technicalWork" replace={true} />);
    }

    return (<Navigate to="/catalog" replace={true} />);
  }

  return (
    <div className="App">
      <div className={classes.authorize}>
        <Routes location={location} key={location.key}>
          <Route path="*" element={< DefaultRoute />} />
          <AvailableRoutes />
          <Route path="technicalWork" element={<TechnicalWork />} />
        </Routes>
      </div>
    </div>
  );
}

export default observer(App);
