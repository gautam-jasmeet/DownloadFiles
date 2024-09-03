import React from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.css'

function Sidebar() {
  return (
    <div className='sidebar'>
      <h3>Admin Dashboard</h3>
      <ul>
        <li>
          <NavLink to={"/hr"}>HR Department</NavLink>
        </li>
        <li>
          <NavLink to={"/marketing"}>Marketing Department</NavLink>
        </li>
        <li>
          <NavLink to={"/it"}>IT Department</NavLink>
        </li>
        <li>
          <NavLink to={"/sales"}>Sales Department</NavLink>
        </li>
      </ul>

    </div>
  )
}

export default Sidebar