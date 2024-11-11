import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import './sidebar.css'
import Logout from '../../component/logout/Logout'


function Sidebar() {

  // const navigate = useNavigate()

  // const handleQualityChange = (e)=>{
  //     const value = e.target.value
  //     if(value){
  //       navigate(`/Admin/${value}`)
  //     }
  // }

  return (
    <div className='sidebar'>
    <NavLink to={"/Admin"}  style={{backgroundColor:"var( --secondary-color)"}}>
      <h3 className='title' > <i className="bi bi-person-fill-gear fs-3"> </i> Admin <br /> Dashboard  </h3>
      </NavLink>
      <div className='scrollable-links'>
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
          {/* <label htmlFor='quality'>Quality: </label>
          <select name='quality' id='quality' onChange={handleQualityChange}>
            <option>select:</option>
            <option value="FQC">
            FQC
            </option>
            <option value="FQC">
            FQC
            </option>
            <option value="IPQC">
            IPQC
            </option>
          </select>*/} 
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
        
      {/* <li className=" text-center">

    <Logout className="btn card_btn"/>
  </li> */}
      </ul>

      </div>
 
    </div>
  )
}

export default Sidebar