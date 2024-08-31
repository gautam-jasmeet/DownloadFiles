import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Header from '../../shared/Header'
import Register from '../register/Register'
import Login from '../login/Login'

const HomePage = () => {
  return (
    <>
  <Router>
      <Header/>
    <Routes>
    <Route path='/signup' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    </Routes>
  </Router>
  </>
   
  )
}

export default HomePage