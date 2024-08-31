import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from "react-router-dom"


const Header = () => {
  return (
    <div>
      <nav className="navbar bg-primary" data-bs-theme="dark">
      <ul className="nav">
  <li className="nav-item">
    <NavLink className="nav-link active " aria-current="page" to="/">HomePage</NavLink>
  </li>
  </ul>
      <ul className="nav justify-content-end">
  <li className="nav-item">
    <NavLink className="nav-link" to="/signup">SignUp</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to="/login">Login</NavLink>
  </li>
</ul>
</nav>
      
    </div>
  )
}

export default Header