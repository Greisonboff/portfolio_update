import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Box from './components/boxGrup/box'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Listas from './components/listas/Listas';
import Form from './components/formCertification/FormCertification';
import FormProject from './components/formProject/FormProject';
import Header from './components/header/Header';
import Home from './components/home/Home';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Box element={[Home]} />} />
        <Route path='/certificado' element={<Box element={[Form]} />} />
        <Route path='/projeto' element={<Box element={[FormProject]} />} />
        <Route path='/listas' element={<Box element={[Listas]} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>

)
