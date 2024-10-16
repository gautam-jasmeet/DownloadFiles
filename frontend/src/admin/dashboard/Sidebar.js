import React from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.css'


function Sidebar() {
  return (
    <div className='sidebar'>
      <h3 className='title'> <i className="bi bi-person-fill-gear fs-3"></i> Admin <br /> Dashboard</h3>
      <ul className='mb-5'>
        <li className='text-center  '>
          <NavLink to={"/Admin/HR"}> HR</NavLink>
        </li>
        <li className='text-center'>
          <NavLink to={"/Admin/Store"}>Store</NavLink>
        </li>
        <li className='text-center'>
          <NavLink to={"/Admin/Production"}>Production</NavLink>
        </li>
        <li className='text-center'>
          <NavLink to={"/Admin/Machine"}>Machine</NavLink>
        </li>
        <li className='text-center'>
          <NavLink to={"/Admin/Maintance"}>Maintance</NavLink>
        </li>
        <li className='text-center'>
          <NavLink to={"/Admin/SOP-WI"}>SOP|WI</NavLink>
        </li>
        <li className='text-center'>
          <NavLink to={"/Admin/Logistics"}>Logistic</NavLink>
        </li>
        <li className='text-center'>
          <NavLink to={"/Admin/Calibration"}>Calibration</NavLink>
        </li>
        <li className='text-center'>
          <NavLink to={"/Admin/EHS"}>EHS</NavLink>
        </li>
        <li className='text-center'>
          <NavLink to={"/Admin/Quality"}>Quality</NavLink>
        </li>
        <li className='text-center'>
          <NavLink to={"/Admin/FQC"}>FQC</NavLink>
        </li>
        <li className='text-center'>
          <NavLink to={"/Admin/IQC"}>IQC</NavLink>
        </li>
        <li className='text-center'>
          <NavLink to={"/Admin/IPQC"}>IPQC</NavLink>
        </li>
        <li className='text-center'>
          <NavLink to={"/signup"}>Sign Up</NavLink>
        </li>
        
      <li className="nav-item text-center">
    <NavLink className="nav-link" to="/">Logout</NavLink>
  </li>
      </ul>


 
    </div>
  )
}

export default Sidebar