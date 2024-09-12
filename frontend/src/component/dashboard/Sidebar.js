import React from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.css'


function Sidebar() {
  return (
    <div className='sidebar'>
      <h3>Admin Dashboard</h3>
      <ul>
        <li>
          <NavLink to={"/Admin"}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to={"/HR"}>HR</NavLink>
        </li>
        <li>
          <NavLink to={"/Store"}>Store</NavLink>
        </li>
        <li>
          <NavLink to={"/Production"}>Production</NavLink>
        </li>
        <li>
          <NavLink to={"/Machine"}>Machine</NavLink>
        </li>
        <li>
          <NavLink to={"/Mentainance"}>Mentainance</NavLink>
        </li>
        <li>
          <NavLink to={"/SOP"}>SOP | WI</NavLink>
        </li>
        <li>
          <NavLink to={"/Logistic"}>Logistic</NavLink>
        </li>
        <li>
          <NavLink to={"/Calibration"}>Calibration</NavLink>
        </li>
        <li>
          <NavLink to={"/EHS"}>EHS</NavLink>
        </li>
        <li>
          <NavLink to={"/Quality"}>Quality</NavLink>
        </li>
        <li>
          <NavLink to={"/signup"}>Sign Up</NavLink>
        </li>
      <li className="nav-item">
    <NavLink className="nav-link" to="/">Logout</NavLink>
  </li>
      </ul>


 
    </div>
  )
}

export default Sidebar