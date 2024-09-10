import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from "react-router-dom"
import  "../App.css"



const Header = () => {
  return (
    <div style={{position:"sticky", top:"0",zIndex:"1000"}}> 
      <nav className="navbar " style={{backgroundColor: 'var(--main-header-color-1)' }} data-bs-theme="dark">  
      <ul className="nav">
  <li className="nav-item">
    <NavLink className="nav-link active " aria-current="page" to="/">Home Page</NavLink>
  </li>
  </ul>
      <ul className="nav justify-content-end">
  {/* <li className="nav-item">
    <NavLink className="nav-link" to="/signup">SignUp</NavLink>
  </li> */}
  <li className="nav-item">
    <NavLink className="nav-link" to="/">Login</NavLink>
  </li>
 
</ul>
</nav>
      
    </div>
  )
}

export default Header