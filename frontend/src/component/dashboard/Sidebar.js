import React from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.css'


function Sidebar() {
  return (
    <div className='sidebar'>
      <h3 className='title'>Admin Dashboard</h3>
      <ul>
        <li>
          <NavLink to={"/Admin"}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to={"/Admin/HR"}>HR</NavLink>
        </li>
        <li>
          <NavLink to={"/Admin/Store"}>Store</NavLink>
        </li>
        <li>
          <NavLink to={"/Admin/Production"}>Production</NavLink>
        </li>
        <li>
          <NavLink to={"/Admin/Machine"}>Machine</NavLink>
        </li>
        <li>
          <NavLink to={"/Admin/Maintance"}>Maintance</NavLink>
        </li>
        <li>
          <NavLink to={"/Admin/SOP|WI"}>SOP|WI</NavLink>
        </li>
        <li>
          <NavLink to={"/Admin/Logistics"}>Logistic</NavLink>
        </li>
        <li>
          <NavLink to={"/Admin/Calibration"}>Calibration</NavLink>
        </li>
        <li>
          <NavLink to={"/Admin/EHS"}>EHS</NavLink>
        </li>
        <li>
          <NavLink to={"/Admin/Quality"}>Quality</NavLink>
        </li>
        <li>
          <NavLink to={"/Admin/FQC"}>FQC</NavLink>
        </li>
        <li>
          <NavLink to={"/Admin/IQC"}>IQC</NavLink>
        </li>
        <li>
          <NavLink to={"/Admin/IPQC"}>IPQC</NavLink>
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