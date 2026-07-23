
import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './Pages/public/Home.jsx'

import Navbar from './components/layout/Navbar.jsx'
import Login from './Pages/auth/Login.jsx'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
           <Route path="/" element={<Home />} />
           <Route path='/login' element={<Login/>}/>
    </Routes>
     
    </BrowserRouter>
  )
}

export default App