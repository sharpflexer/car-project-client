import React from 'react';
import SignIn from './forms/content/SignIn/SignIn';
import SignUp from './forms/content/SignUp/SignUp';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import classes from "./App.module.css";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <div className={classes.authorize}>
          <Routes>
            <Route path="*" element={<Navigate to="signin" replace={true} />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
