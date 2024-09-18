import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from "react-router-dom"
import GSolarLogo from "../images/GSolarLogo.png"
import  "../App.css"



const Header = () => {
  return (
    <div style={{position:"sticky", top:"0",zIndex:"1000" }}> 
      <nav className="navbar " style={{backgroundColor: 'var(--main-header-color)' }} data-bs-theme="dark">  
      <ul className="nav">
  <li className="nav-item">
    <NavLink className="nav-link active " aria-current="page" to="/" 
    style={{ color:"var(--light-color)",fontWeight:"500"}}>
      <img src={GSolarLogo} alt='Gautam Solar Logo' width={"15%"} 
       />
    </NavLink>
  </li>
  </ul>
      <ul className="nav justify-content-end">
   {/* <li className="nav-item">
    <NavLink className="nav-link" to="/signup">SignUp</NavLink>
  </li>  */}
  <li className="nav-item">
    {/* <NavLink className="nav-link" to="/"  style={{color:"var(--light-color)", fontWeight:"500"}}>Logout</NavLink> */}
    <NavLink to={"/signup"} >Signup</NavLink> 
  </li> 
 
</ul>
</nav>
      
    </div>
  )
}

export default Header