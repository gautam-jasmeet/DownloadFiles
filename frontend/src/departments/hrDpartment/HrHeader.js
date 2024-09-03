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
    <div>
        <nav className="navbar" style={{backgroundColor: "#e3f2fd"}}>
  <div className="container-fluid">
    <h2 className="navbar-brand">{props.header}</h2>
    {/* <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success" type="submit">Search</button> */}
    {/* </form> */}
    <button type="button" className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
  </div>
</nav>
    </div>
  )
}

export default HrHeader;