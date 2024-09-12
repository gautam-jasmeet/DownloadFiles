import React from 'react'
import { useNavigate } from 'react-router-dom'

function HrHeader(props) {

  const navigate = useNavigate();
  const handleLogout = () => {

    // Removing token from localStorage
    localStorage.removeItem("authToken");

    navigate("/login")

    }
  return (
    <div style={{color:"var(--primary-color)"}}>
        <nav className="navbar"  >
  <div className="container-fluid" >
    <h2 className="navbar-brand" >{props.header}</h2>
    <button type="button" className="btn btn-outline-secondary"  
    onClick={handleLogout}>Logout</button>
  </div>
</nav>
    </div>
  )
}

export default HrHeader;