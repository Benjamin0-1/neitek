import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import NotFund from './Components/NotFund';
import Home from './Components/Home';
import LogOutButton from './Components/LogOutButton';
import { SideBar } from './Components/Sidebar';
import FAQ from './Components/FAQ';
import CreateSale from './Components/CreateSale';
import Profile from './Components/Profile';
import AllComissions from './Components/AllComissions';

// por razones de tiempo (tuve 1 dia para back y front), ciertas paginas seran protegidas simplemente checando si el token existe.
// obviamente esto esta protegido por el backend, pero no se muestra en el frontend totalmente.

function App() {
  return (
      <Router>
          <div style={{ display: 'flex', minHeight: '100vh' }}>
              <SideBar />
              <div style={{ flex: 1, marginLeft: 20 }}> 
                  <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="*" element={<NotFund />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/create-sale" element={<CreateSale />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/all-comissions" element={<AllComissions />} />
                  </Routes>
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                  <LogOutButton />
              </div>
          </div>
      </Router>
  );

}

export default App;
