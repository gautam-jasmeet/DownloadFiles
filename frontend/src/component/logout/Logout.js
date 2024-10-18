import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {

    const navigate = useNavigate();
    
    const handleLogout = () => {
      // Removing token from localStorage
      localStorage.removeItem("authToken");
      
      // Redirect to login page
      navigate('/',{replace:true}); // Replace history to prevent going back
  
       // Optional: reload the page to ensure the old state is fully cleared
       window.location.reload();
     }
  
  return (
    <div>
        <button onClick={handleLogout}>LogOut</button>
    </div>
  )
}

export default Logout