import React  from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css"
// import { AppContext } from '../appContext/AppContext';

function DeptHeader({header}) {
  // const {token} = useContext(AppContext)
 
   const navigate = useNavigate();
  // const history = useHistory();
   const handleLogout = () => {
    // Removing token from localStorage
    localStorage.removeItem("authToken");
    
    // Redirect to login page
    navigate('/',{replace:true}); // Replace history to prevent going back

     // Optional: reload the page to ensure the old state is fully cleared
     window.location.reload();
   }

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
      <button type="button" className="btn btn-primary mt-3 card_btn p-1 rounded-4"
      style={{
        width:"8%",
        height:"10%",
      }}  
      onClick={handleLogout}>LogOut</button> 
    </div>
  </nav>
      </div>
    )
  }

export default DeptHeader