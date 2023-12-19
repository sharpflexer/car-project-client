
import {Navigate, Route, Routes, useLocation } from 'react-router-dom';
import classes from "./App.module.css";
import Header from './navigation_panel/Header/Header';
import Catalog from './catalog_page/Catalog/Catalog';
import Admin from './admin_page/Admin/Admin';
import Authorize from './auth/Authorize/Authorize';
import Scroll from './share/Scroll/Scroll';

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
