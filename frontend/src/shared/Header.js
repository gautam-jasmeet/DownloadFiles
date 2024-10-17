import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from "react-router-dom"
import GSolarLogo from "../images/GSolarLogo.png"
import  "../App.css"



const Header = () => {
  return (
    <div style={{position:"sticky", top:"0",zIndex:"1000" ,width:"100%" }}> 
      <nav className="navbar  navbar-expand-lg " 
      style={{backgroundColor: 'var(--main-header-color)' }} 
      data-bs-theme="dark">  
     
  <div className=" m-1" 
  style={{ color:"var(--light-color)",fontWeight:"500"}}>
    <img src={GSolarLogo} alt='Gautam Solar Logo' width={"15%"} />
    
    </div>
 
</nav>
      
    </div>
  )
}

export default Header