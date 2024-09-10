import React  from 'react'
import { NavLink,} from 'react-router-dom'
import "../App.css"

function DeptHeader({header}) {
 

    return (
      <div style={{backgroundColor:'var( --main-header-color-3)', position:"sticky", top:"55px",zIndex:"999"}}>
          <nav className="navbar" >
    <div className="container-fluid">
      <h2 className="navbar-brand">{header}</h2>
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="text" 
        placeholder="Search files..."
        value={searchTerm} 
        onChange={handleSearchTerm} 
        aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button> 
      </form> */}
       {/* <button type="button" className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button> */}
      <NavLink to={"/"}>Logout</NavLink>
    </div>
  </nav>
      </div>
    )
  }

export default DeptHeader