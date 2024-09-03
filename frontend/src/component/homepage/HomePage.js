import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Header from '../../shared/Header'
import Register from '../register/Register'
import Login from '../login/Login'
import HrHomePage from '../../departments/hrDpartment/HrHomePage'
import Logout from '../logout/Logout'
import Sidebar from '../dashboard/Sidebar'


// import Dashboard from '../dashboard/Dashboard'


const HomePage = () => {
  return (
    <>
  <Router>
    <div>
      <Header/>
      
      <div>
      <Sidebar/>
      <div style={{marginLeft:"220px", padding:"20px" }}>
    <Routes>
      {/* <Route path='/' element={<Dashboard/>}></Route> */}
      <Route path='/hr' element={<HrHomePage/>}></Route>

    <Route path='/signup' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/logout' element={<Logout/>}></Route>
    </Routes>
    </div>
    </div>
    </div>
  </Router>
  </>
   
  )
}

export default HomePage