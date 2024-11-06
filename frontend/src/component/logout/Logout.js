import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {

    const navigate = useNavigate();
    
    const handleLogout = () => {
      // Removing token from localStorage
      localStorage.removeItem("authToken");
      localStorage.clear();
      
      // Redirect to login page
      navigate('/',{replace:true}); // Replace history to prevent going back
  
       // Optional: reload the page to ensure the old state is fully cleared
       window.location.reload();
     }
  
  return (
    <div>
        <button className="btn btn-primary mt-3 card_btn p-1 rounded-4 fs-5 "
         onClick={handleLogout}
         style={{
          width:"80%",
          height:"10%",
        }}  
         >
         <b className="border-bottom border-light border-2 rounded-pill p-1"> LogOut </b>
          </button>
    </div>
  )
}

export default Logout