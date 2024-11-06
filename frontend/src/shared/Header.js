import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from "react-router-dom"
import GSolarLogo from "../images/GSolarLogo.png"
import  "../App.css"
import Logout from '../component/logout/Logout';
import { AppContext } from '../appContext/AppContext';



const Header = () => {
  const {token} = useContext(AppContext)
  return (
    <div style={{position:"sticky", top:"0",zIndex:"1000" ,width:"100%" ,height:"60px"}}> 
      <nav className="navbar  navbar-expand-lg d-flex justify-content-between" 
      style={{backgroundColor: 'var(--main-header-color)',height:"100%" }} 
      data-bs-theme="dark">  
     
  <div className=" m-1" 
  style={{ color:"var(--light-color)",fontWeight:"500"}}>
    <img src={GSolarLogo} alt='Gautam Solar Logo' width={"15%"} />
    
    </div>
    <div>
     {token ? <Logout  /> : (<></>)}
    </div>
 
</nav>
      
    </div>
  )
}

export default Header