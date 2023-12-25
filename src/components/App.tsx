
import {Navigate, Route, Routes, useLocation } from 'react-router-dom';
import classes from "./App.module.css";
import Header from './navpanel/Header/Header';
import Authorize from './auth/Authorize/Authorize';
import Scroll from './share/Scroll/Scroll';
import Admin from './pages/adminpage/Admin/Admin';
import Catalog from './pages/catalogpage/Catalog/Catalog';

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
