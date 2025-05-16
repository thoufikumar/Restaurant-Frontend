import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import App from './App';
import AboutUs from './components/AboutUs';
import Signup from './components/RegisterPage';
import ReservationPage from './components/ReservationPage';
import TableSelection from './components/TableSelection';
import Login from './components/Loginpage';
import History from './components/History';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path='/TableSelection' element={<TableSelection />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
