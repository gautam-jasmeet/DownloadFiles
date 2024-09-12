import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
// import {jwtDecode} from "jwt-decode";

function Login() {
    const [formData, setFormData]= useState({
        employeeID:"",
        password:"",

    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    // const departments =["Admin","HR","Sales","Finance","Marketing","BPO"]

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

          const response = await axios.post('http://localhost:8080/login', formData);
          // console.log(response.data);
          
          
          //When you make an HTTP request using axios, the response typically contains several properties,
          //  such as status, statusText, headers, and data.
          //  The data property holds the actual content returned by the API, often in JSON format
        //  const data = await response.data;
          // if(response.status === 200){
          //   // object destructuring.
          //   const {token} = response.data;
          //   // Storing token in localStorage
          //   localStorage.setItem("authToken", token)
          //   // navigate("/HR")
          //   console.log("Login successful");
            
          //   // // Decode the token
          //   // const decodedToken = jwtDecode(token);
          //   // console.log(decodedToken);
          //   // const department = decodedToken.department;
          //   // console.log(department);
            
          //   // navigate(`/${department}`)
            
          // }else{
          //   setError(response.data.message || "Login failed")
          // }

          if(response.status === 200){
             const { token,department,designation} = response.data;
             localStorage.setItem("authToken", token)
             localStorage.setItem("designation",designation);
             localStorage.setItem("department",department);
            //  console.log(department);
             
             navigate(`/${department}`)
          // const {token} = response.data
          // console.log(token);
          
          // localStorage.setItem("authToken", token)
          // navigate("/HR")
          // console.log("Login successful");
          
          }else{
            setError(response.data.message || "Login failed")
          }

        }catch(err){
          if(err.response){
            // if server responded with status other than 200
            setError(err.response.data.message || "Login failed")
          }else if(err.request){
            // if response was made but getting no response 
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
            name="employeeID"
            value={formData.employeeID}
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

        {/* <div className="form-group">
        <label>Department</label>
        <select
          className="form-control border border-black"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
         
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div> */}

        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
      </form>
      {/* <p>Don't have an account? <NavLink to="/signup">SignUp</NavLink></p> */}
    </div>
  )
  
}

export default Login