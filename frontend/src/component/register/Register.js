import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name:"",
    employeeID:"",
    department:"",
    designation:"",
    password:"",
    shift:"",
  })

  const navigate = useNavigate();

// const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState("");
const [error,setError] = useState("")

  const departments =["HR","Sales","Finance","Marketing","BPO"]
  const designations = ["Supervisor","Workers"]
  const shifts = ["A","B"]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log('Form Data Submitted:', formData);
    
    // setLoading(true);
    // setError(null);
    
    try{
      
      const resposne = await axios.post('http://localhost:8080/api/auth/signup',formData);
      console.log(resposne);
      
      if(resposne.status === 200){

        setSuccess("Signup successful!");
        setError("");
        navigate("/login");
      }
      // setFormData({
      //   name:"",
      //   employeeId:"",
      //   department:"",
      //   designation:"",
      //   password:"",
      //   shift:"",
      // });

    }catch(err){
      setError("Signup failed. Please try again.")
      setSuccess("");

    }


   
  };

  return (
    <div className="container mt-5 w-25 p-3">
    <h2>Sign Up</h2>
    {error && <div className='alert alert-danger bs-danger'>{error}</div> }
    {success && <div className='alert alert-success'>{success}</div> }
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control border border-black"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          
        />
      </div>

      <div className="form-group">
        <label>Employee ID</label>
        <input
          type="number"
          className="form-control border border-black"
          name="employeeID"
          value={formData.employeeID}
          onChange={handleChange}
          required
         
        />
      </div>

      <div className="form-group">
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
      </div>

      <div className="form-group">
        <label>Designation</label>
        <select
          className="form-control border border-black"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          required
          
        >
          <option value="">Select Designation</option>
          {designations.map((des) => (
            <option key={des} value={des}>
              {des}
            </option>
          ))}
        </select>
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

      <div className="form-group ">
        <label>Shift</label>
        <select
          className="form-control border border-black"
          name="shift"
          value={formData.shift}
          onChange={handleChange}
          required
         
        >
          <option value="">Select Shift</option>
          {shifts.map((shift) => (
            <option key={shift} value={shift}>
              {shift}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Sign Up
      </button>
    </form>
  </div>
  )
}

export default Register