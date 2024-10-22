import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { AppContext } from '../../appContext/AppContext';
// import Footer from '../../shared/Footer';

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

  // const { token } = useContext(AppContext);
  // console.log(token);
  


  const departments =["HR","Store","Production","Machine","Maintance","SOP|WI","Logistics",
    "Quality","Calibration","FQC","IQC","IPQC","EHS"]
    const shifts = ["A","B"]
    
    // Default Designations
    const defaultDesignations = ["Admin","Supervisor","Worker"]
    const [filteredDesignations,setFilteredDesignations] = useState(defaultDesignations)
    
    // Handle Department Change
    const handleDepartmentChange = (e)=>{
      const selectedDepartment = e.target.value;
      setDepartment(selectedDepartment);

      if(selectedDepartment === 'Quality'){
        setFilteredDesignations(["Admin","Supervisor"])
      }else if(["FQC","IQC","IPQC"].includes(selectedDepartment)){
        setFilteredDesignations(["Worker"])
      }else{
        setFilteredDesignations(defaultDesignations)
      }
    };

  const handleSubmit = async(e) => {
    e.preventDefault();
  //  console.log(name,employeeID,department,designation,password,shift);
   
    
    try{
      
      const resposne = await axios.post('http://srv617987.hstgr.cloud:8080/auth/signup',{
        name,
        employeeID,
        department,
        designation,
        password,
        shift
      });
      // console.log(resposne);
      // console.log(resposne.data);
      
      
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

<section className="background-radial-gradient overflow-hidden ">
  <div className="container  text-center text-lg-start my-4 ">
    <div className="row gx-lg-5 align-items-center mb-5">
    <div className="col-lg-6 mb-5 mb-lg-0" style={{zIndex: "10"}}>
        <h1 className="my-5 display-5 fw-bold ls-tight" style={{color:"hsl(218, 81%, 95%)"}}>
         Document Management Application <br />
          {/* <span style={{color:"  hsl(218, 81%, 75%)"}}>for your business</span> */}
        </h1>
        <p className="mb-4 opacity-70" style={{color:" hsl(218, 81%, 85%)"}}>
        Gautam Solar (www.gautamsolar.com). <br/>
        Leading Solar Module Manufacturer using cutting-edge, automated machinery to manufacture
         high-efficiency Solar Modules & Provider of Solar Power Plants.
        </p>
        {/* <img src={DocController} alt="DocController" style={{opacity:"0.4",borderRadius:"50%"}} /> */}
      </div>
      <div className="col-lg-6 mb-1 mb-lg-0 position-relative " >
        {/* <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div> */}
        {/* <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div> */}
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="card bg-glass" >
          <div className="card-body px-2 pt-4 px-md-5 ">
          <h3 style={{textAlign:"center", color:"var(--primary-color)", 
            borderBottom:"1px solid var(--primary-color)",
            fontWeight:"700",
            }} >Sign Up</h3>
            <form onSubmit={handleSubmit} >
              <div className="row "  >
                <div className="col-md-6 mb-1">
                  <div className="form-outline" >
                   
                  </div>
                </div>
              </div>

              <div className="form-outline mb-2  ">
                <label className="form-label  fw-semibold lh-1 ml-2 " htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="form-control  " 
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-outline mb-2 ">
                <label className="form-label fw-semibold lh-1 ml-2 " htmlFor="empId">Employee ID</label>
                <input 
                  type="text" 
                  id="empId" 
                  className="form-control" 
                  name="employeeID"
                  value={employeeID}
                  onChange={(e)=>setEmployeeId(e.target.value)}
                  required
                />
              </div>
              <div className="form-outline mb-2 ">
                <label className="form-label fw-semibold lh-1  ml-2" htmlFor="form3Example3">Department</label>
                <select
          className="form-control "
          name="department"
          value={department}
          onChange={handleDepartmentChange}
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

              <div className="form-outline mb-2">
                <label className="form-label fw-semibold lh-1 ml-2" htmlFor="designation">Designation</label>
                <select
          className="form-control"
          name="designation"
          value={designation}
          onChange={(e)=>setDesignation(e.target.value)}
          required
          
        >
          <option value="">Select Designation</option>
          {filteredDesignations.map((des) => (
            <option key={des} value={des}>
              {des}
            </option>
          ))}
        </select>
              </div>
              <div className="form-outline mb-2">
                <label className="form-label fw-semibold lh-1 ml-2" htmlFor="password">Password</label>
                <input 
                  type="password" 
                  className="form-control " 
                  name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label fw-semibold lh-1 ml-2" htmlFor="shift">Shift</label>
                <select
          className="form-control"
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
              

              <div className="text-center pt-1 mb-5 pb-1">
                    <button data-mdb-button-init data-mdb-ripple-init 
                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 card_btn" type="submit">
                      Sign Up</button>
                    {/* <a className="text-muted" href="#!">Forgot password?</a> */}
                  </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  </div>
  )
}

export default Register