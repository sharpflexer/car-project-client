
import {Navigate, Route, Routes, useLocation } from 'react-router-dom';
import classes from "./App.module.css";
import Admin from '../pages/Admin/Admin';
import Authorize from '../pages/Authorize/Authorize';
import Catalog from '../pages/Catalog/Catalog';


function App() {
  const location = useLocation();

  return (
    <div className="App">
      <div className={classes.authorize}>
        <Routes location={location} key={location.key}>
          <Route path="*" element={<Navigate to="/authorize" replace={true} />} />
          <Route path="authorize" element={<Authorize />} />
          <Route path="catalog" element={<Catalog />}/>
          <Route path="admin" element={<Admin />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
