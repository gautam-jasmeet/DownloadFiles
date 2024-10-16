import React  from 'react'
// import { useNavigate} from 'react-router-dom'
import "../App.css"
// import { AppContext } from '../appContext/AppContext';

function DeptHeader({header}) {
  // const {token} = useContext(AppContext)
 
  //  const navigate = useNavigate();
  //  const handleLogout = () => {

  //   // Removing token from localStorage
  //   localStorage.removeItem("authToken");

  //   navigate("/")
  //  }

    return (
      <div style={{backgroundColor:'var( --main-Dept-header-color)', position:"sticky", top:"56px",zIndex:"999",
      width:"100%",
      }}>
          <nav className="navbar"  >
    <div className="container-fluid" >
      <h2 className="navbar-brand"
     
       >
       <span className=" title fs-4" style={{color:"var(--primary-color)"}}>{header}</span> 
        </h2>
      {/* <NavLink to={"/"} style={{color:"var(--primary-color)", fontWeight:"500"}}>Logout</NavLink> */}
      {/* <button type="button" className="btn btn-primary mt-3 card_btn "
      style={{
        width:"5%",
      }}  
      onClick={handleLogout}>Logout</button> */}
      
    </div>
  </nav>
      </div>
    )
  }

export default DeptHeader