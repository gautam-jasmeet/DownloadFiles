import React  from 'react'
import { NavLink,} from 'react-router-dom'
import "../App.css"

function DeptHeader({header}) {
 

    return (
      <div style={{backgroundColor:'var( --main-Dept-header-color)', position:"sticky", top:"55px",zIndex:"999"
      }}>
          <nav className="navbar" >
    <div className="container-fluid" >
      <h2 className="navbar-brand"
       style={{color:"var(--primary-color)", fontWeight:"500" , fontSize:"1.2rem"}}
       >
        {header}
        </h2>
      <NavLink to={"/"} style={{color:"var(--primary-color)", fontWeight:"500"}}>Logout</NavLink>
    </div>
  </nav>
      </div>
    )
  }

export default DeptHeader