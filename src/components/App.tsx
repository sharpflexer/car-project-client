import React, { useState } from 'react';
import SignIn from './forms/content/SignIn/SignIn';
import SignUp from './forms/content/SignUp/SignUp';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import classes from "./App.module.css";
import { AnimatePresence, motion } from 'framer-motion';
import Authorize from './forms/content/Authorize';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <div className={classes.authorize}>
        <Routes location={location} key={location.key}>
          <Route path="*" element={<Navigate to="/authorize" replace={true} />} />
          <Route path="authorize" element={<Authorize />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
