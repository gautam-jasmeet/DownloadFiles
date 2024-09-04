import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Header from '../../shared/Header'
import Register from '../register/Register'
import Login from '../login/Login'
import HrHomePage from '../../departments/hrDpartment/HrHomePage'
import Logout from '../logout/Logout'

import Dashboard from '../dashboard/Dashboard'
import ItHomePage from '../../departments/it/ItHomePage'
import MarketingHP from '../../departments/marketing/MarketingHP'
import SaleHP from '../../departments/sales/SaleHP'
import Sidebar from '../dashboard/Sidebar'


const HomePage = () => {
  return (
    <>
    
  <Router>
      <Header/>
    
      {/* <Sidebar/> */}
        
      {/* <div style={{marginLeft:"220px", padding:"20px" ,width:"100%"}}> */}
      <Routes>
     
      <Route path='/800' element={<Dashboard/>}></Route>
        <Route path='/520' element={<HrHomePage/>}></Route>
      <Route path='/it' element={<ItHomePage/>}></Route>
      <Route path='/marketing' element={<MarketingHP/>}></Route>
      <Route path='/sales' element={<SaleHP/>}></Route>
    <Route path='/signup' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/logout' element={<Logout/>}></Route>
    </Routes>
    
    {/* </div> */}
  </Router>
    
  </>
   
  )
}

export default HomePage