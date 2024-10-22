import React from 'react'
import { NavLink } from 'react-router-dom'
import "../../HrDepartment/HrDashboard/HrSidebar.css"

function QualitySidebar() {
  return (
    <div className="hrSidebar-container">
    <div className="hrSidebar">
      
      <h4 className="title text-center"
      ><i className="bi bi-person-fill fs-3"></i> Quality <br /> Dashboard</h4>
      <ul>
        <li className="text-center">
          <NavLink to="QualityFile">FileUpload</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="QualityHead">Quality</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="FQC">FQC</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="IQC"> IQC</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="IPQC">IPQC</NavLink>
        </li>
        
      </ul>
      </div>
    </div>
  )
}

export default QualitySidebar