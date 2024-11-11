import React from 'react'
import {  NavLink } from 'react-router-dom'
import "../../departments/HrDepartment/HrDashboard/HrSidebar.css"

function EmpSidebar() {
  return (
    <div className="sidebar" style={{position:"sticky", top:"60px",zIndex:"999",
     height:"calc(100vh - 60px)",
     width:"100%",
     overflowY:"auto",
     border: "1px solid #ccc",
     borderRight: "1px solid var(--primary-color)",
     padding: "10px",
     borderRadius: "4px",
    }}>
    <h4 className="title text-center"
     > <i className="bi bi-person-fill fs-3"></i> Employee Dashboard</h4>
    <ul>
      <li className="text-center">
        <NavLink to="personal"> Personal Details</NavLink>
      </li>
      <li className="text-center">
        <NavLink to="documents"> Documents</NavLink>
      </li>
      <li className="text-center">
        <NavLink to="tvideo"> Training Videoes</NavLink>
      </li>
      <li className="text-center">
        <NavLink to="/assignedTests"> Assigned Tests</NavLink>
      </li>
     
    </ul>
  </div>
  )
}

export default EmpSidebar