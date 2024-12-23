import React from 'react'
import { NavLink } from 'react-router-dom'
import "./HrSidebar.css"

function HrSidebar() {
  return (
    <div className="hrSidebar-container">
    <div className="hrSidebar">
      
      <h4 className="title text-center"
      ><i className="bi bi-person-fill fs-3"></i> HR <br /> Dashboard</h4>
      <ul>
        <li className="text-center">
          <NavLink to="jform"> Joining Form</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="/signup"> SignUp</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="documents"> Documents</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="emp"> Employee Details</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="training"> Training Videos</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="examPapers">Create Exam's Papers</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="createExamPapers"> Exam's Papers</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="assign"> Assign Test</NavLink>
        </li>
        <li className="text-center">
          <NavLink to="performance"> Performance</NavLink>
        </li>
      </ul>
      </div>
    </div>
  )
}

export default HrSidebar