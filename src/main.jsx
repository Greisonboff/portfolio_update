import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Box from './components/box_grup/box'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Listas from './components/listas/Listas';
import Form from './components/form_certification/Form_certification';
import FormProject from './components/form_project/FormProject';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Box element={[Form, FormProject]} />} />
        <Route path='/listas' element={<Box element={[Listas]} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>

)
