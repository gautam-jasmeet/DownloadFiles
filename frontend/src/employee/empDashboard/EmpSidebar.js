import React from 'react'
import {  NavLink } from 'react-router-dom'
import "../../departments/HrDepartment/HrDashboard/HrSidebar.css"

function EmpSidebar() {
  return (
    <div className="sidebar">
    <h4 className="title text-center"
     style={{ fontWeight:"500" , fontSize:"1.2rem" ,
      display:"inline-block",
      borderBottom:"2px solid #000"
     }}> Dashboard</h4>
    <ul>
      <li className="text-center">
        <NavLink to="personal"> Personal Details</NavLink>
      </li>
      <li className="text-center">
        <NavLink to="documents"> Documents</NavLink>
      </li>
     
    </ul>
  </div>
  )
}

export default EmpSidebar