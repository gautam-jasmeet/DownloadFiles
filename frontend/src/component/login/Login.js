import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData]= useState({
        employeeId:"",
        password:"",

    });

    const [error, setError] = useState("");
    const navigate = useNavigate();


    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        })
    } 

   const handleSubmit = async (e)=> {
        e.preventDefault();
        // console.log(formData);
        setError("");

        try{

          const resposne = await axios.post('http://localhost:8080/api/auth/login', formData);
          if(resposne.status === 2000){
            const {token} = resposne.data;
            
            // Storing token in localStorage
            localStorage.setItem("authToken", token)


            navigate("/")

          }
        }catch(err){
          if(err.resposne){
            // if server responded with status other than 200
            setError(err.resposne.data.message || "Login failed")
          }else if(err.request){
            // if resposne was made but getting no response 
            setError("Not getting response from server. Please try again later.")
          }else{
            setError("Somthing went wrong. Please try again later.")
          }
        }
        
    }

    
  return (
    <div className="container mt-5 w-25 p-3">
      <h2>Login</h2>
      {error && <div className="alert alert-danger bs-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            className="form-control border border-black"
            name="employeeId"
            value={formData.empId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control border border-black"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
      </form>
    </div>
  )
  
}

export default Login