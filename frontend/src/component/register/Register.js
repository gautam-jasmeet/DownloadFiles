import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Footer from '../../shared/Footer';

function Register() {
  const [name, setName] = useState('');
  const [employeeID, setEmployeeId] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [password, setPassword] = useState('');
  const [shift, setShift] = useState('');

  const [success, setSuccess] = useState("");
  const [error,setError] = useState("")


  const navigate = useNavigate();


  const departments =["HR","Store","Production","Machine","Maintance","SOP|WI","Logistics",
    "Quality","Calibration","FQC","IQC","IPQC","EHS"]
  const designations = ["Admin","Supervisor","Worker"]
  const shifts = ["A","B"]

 

  const handleSubmit = async(e) => {
    e.preventDefault();
  //  console.log(name,employeeID,department,designation,password,shift);
   
    
    try{
      
      const resposne = await axios.post('http://localhost:8080/auth/signup',{
        name,
        employeeID,
        department,
        designation,
        password,
        shift
      });
      // console.log(resposne);
      console.log(resposne.data);
      
      
      if(resposne.status === 201){

        setSuccess("Signup successful!");
        setError("");
        navigate("/");
      }

    }catch(err){
      setError("Signup failed. Please try again.")
      setSuccess("");

    }
   
  };

  return (
    <div>
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
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
          
        />
      </div>

      <div className="form-group">
        <label>Employee ID</label>
        <input
          type="number"
          className="form-control border border-black"
          name="employeeID"
          value={employeeID}
          onChange={(e)=>setEmployeeId(e.target.value)}
          required
         
        />
      </div>

      <div className="form-group">
        <label>Department</label>
        <select
          className="form-control border border-black"
          name="department"
          value={department}
          onChange={(e)=>setDepartment(e.target.value)}
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
          value={designation}
          onChange={(e)=>setDesignation(e.target.value)}
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
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
          
        />
      </div>

      <div className="form-group ">
        <label>Shift</label>
        <select
          className="form-control border border-black"
          name="shift"
          value={shift}
          onChange={(e)=>setShift(e.target.value)}
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
  <Footer/>
  </div>
  )
}

export default Register