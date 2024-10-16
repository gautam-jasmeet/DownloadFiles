import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from "react-router-dom"
import GSolarLogo from "../images/GSolarLogo.png"
import  "../App.css"



const Header = () => {
  return (
    <div style={{position:"sticky", top:"0",zIndex:"1000" ,width:"100%" }}> 
      <nav className="navbar  navbar-expand-lg" 
      style={{backgroundColor: 'var(--main-header-color)' }} 
      data-bs-theme="dark">  
      {/* <ul className="nav">
  <li className="nav-item"> */}
  <div className="container-fluid">
    <NavLink className="nav-link active" aria-current="page" to="/" 
    style={{ color:"var(--light-color)",fontWeight:"500"}}>
      <img src={GSolarLogo} alt='Gautam Solar Logo' width={"15%"} 
       />
    </NavLink>
    
    </div>
  {/* </li>
  </ul> */}
      <ul className="nav justify-content-end">
   {/* <li className="nav-item">
    <NavLink className="nav-link" to="/signup">SignUp</NavLink>
  </li>  */}
  <li className="d-flex">
    {/* <NavLink className="nav-link" to="/"  style={{color:"var(--light-color)", fontWeight:"500"}}>Logout</NavLink> */}
    <NavLink className="nav-link active " aria-current="page" to={"/signup"} 
    style={{ color:"var(--light-color)",fontWeight:"600"}}>
      <span className=' border-bottom border-2 border-light'>SignUp</span>
        </NavLink> 
    <NavLink className="nav-link active " aria-current="page" to={"/"} 
    style={{ color:"var(--light-color)",fontWeight:"600"}} >
      <span className=' border-bottom border-2 border-light'>LogOut</span>
      </NavLink> 
  </li> 
 
</ul>
</nav>
      
    </div>
  )
}

export default Header