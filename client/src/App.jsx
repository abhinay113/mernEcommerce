
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './components/Register'
import Navbar from './components/Navbar'
export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
    </BrowserRouter>
  )
}
