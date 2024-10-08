import React from 'react'
import { NavLink } from 'react-router-dom'

function HrSidebar() {
  return (
    <div className="sidebar">
      <h4 className="title text-center"
       style={{ fontWeight:"500" , fontSize:"1.2rem" ,
        display:"inline-block",
        borderBottom:"2px solid #000"
       }}> Dashboard</h4>
      <ul>
        <li className="text-center">
          <NavLink to="form1"> Joining Form</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="documents"> Documents</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="emp"> Employee Details</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="training"> Training</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="exam"> Exams</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="performance"> Performance</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default HrSidebar