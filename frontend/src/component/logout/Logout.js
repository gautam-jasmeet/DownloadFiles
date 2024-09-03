import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {

    const navigate = useNavigate();
    
    const handleLogout = () => {

    // Removing token from localStorage
    localStorage.removeItem("authToken");

    navigate("/login")

    }

  return (
    <div>
        <button onClick={handleLogout}></button>
    </div>
  )
}

export default Logout