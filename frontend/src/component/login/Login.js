import React, { useState , useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import '../dashboard/ViewFiles.css';
import "../login/Login.css"
// import Footer from '../../shared/Footer';
import { AppContext } from '../../appContext/AppContext';


function Login() {
  const [employeeID, setEmployeeID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  // Using the context to set token, department, and designation
  const {setToken,setDesignation,setDepartment,setEmployeeId} = useContext(AppContext);

  const handleChangeEmployeeID = (e) => {
    setEmployeeID(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // console.log('Employee ID:', employeeID);
    // console.log('Password:', password);

    try {
      const response = await axios.post('http://srv617987.hstgr.cloud:8000/auth/login', {
        employeeID,
        password,
      });

      if (response.status === 200) {
        const { token, department, designation } = response.data;
        // localStorage.setItem('authToken', token);
        // localStorage.setItem('designation', designation);
        // localStorage.setItem('department', department);
        // console.log('Response:', response.data);
        // console.log("Department:", department);

        // Setting the token, department, and designation in the context
        setToken(token);
        setDesignation(designation);
        setDepartment(department);
        setEmployeeId(employeeID);
        // console.log(response);
        // console.log(response.data);
        
        
       // Redirecting  based on the role 
           // console.log('Navigating to:', designation === "Admin" ? '/Admin' : `/${department}`);
       if(designation === "Admin"){
        navigate('/Admin');
       }else if(designation === "Worker"){
        navigate('/Worker');
       }
       else{
        navigate(`/${department}`);
       }
        } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Login failed');
      } else if (err.request) {
        setError('Not getting a response from server. Please try again later.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div>
    {/* <div className="container mt-5 w-25 p-3" >
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            className="form-control border border-black"
            value={employeeID}
            onChange={handleChangeEmployeeID}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control border border-black"
            value={password}
            onChange={handleChangePassword}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3 card_btn" style={{ width: '25%' }}>
          Login
        </button>
      </form>
    </div>
    <Footer/> */}
     {/* <!-- Section: Design Block --> */}
     <section className="background-radial-gradient overflow-hidden" >
  <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5" >
    <div className="row gx-lg-5 align-items-center mb-5">
    <div className="col-lg-6 mb-5 mb-lg-0" style={{zIndex: "10"}}>
        <h1 className="my-4 display-5 fw-bold ls-tight" style={{color:"hsl(218, 81%, 95%)"}}>
         Document Management  <br />
          <span style={{color:"  hsl(218, 81%, 90%)"}}>Application</span>
        </h1>
        <p className="mb-4 opacity-70" style={{color:" hsl(218, 81%, 85%)"}}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Temporibus, expedita iusto veniam atque, magni tempora mollitia
          dolorum consequatur nulla, neque debitis eos reprehenderit quasi
          ab ipsum nisi dolorem modi. Quos?
        </p>
        {/* <img src={DocController} alt="DocController Image" style={{opacity:"0.4" ,borderRadius:"50%"}}></img> */}
      </div>
      <div className="col-lg-6 mb-5 mb-lg-0 position-relative" >
        {/* <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div> */}
        {/* <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div> */}

        {error && <div className="alert alert-danger">{error}</div>}
        <div className="card bg-glass" style={{boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.5)"}}>
          <div className="card-body px-4 py-5 px-md-5">
          <h3 style={{textAlign:"center", color:"var(--primary-color)", 
            borderBottom:"1px solid var(--primary-color)",
            fontWeight:"700"
            }} >Log In</h3>
            <form onSubmit={handleSubmit} >
              <div className="row"  >
                <div className="col-md-6 mb-4">
                  <div className="form-outline" >
                   
                  </div>
                </div>
              </div>

              <div className="form-outline mb-4 text-center ">               
                <label className="form-label fw-semibold lh-1  " htmlFor="form3Example3">Employee ID</label>                               
                <input 
                  type="text" 
                  id="form3Example3" 
                  className="form-control  " 
                  value={employeeID}
                  onChange={handleChangeEmployeeID}
                  required 
                />                
              </div>

              <div className="form-outline mb-4 text-center">
                <label className="form-label fw-semibold lh-1" htmlFor="form3Example4">Password</label>
                <input 
                  type="password" 
                  id="form3Example4" 
                  className="form-control " 
                  value={password}
                  onChange={handleChangePassword}
                  required 
                />
              </div>

              <div className="text-center pt-1 mb-5 pb-1 ">
                    <button data-mdb-button-init data-mdb-ripple-init 
                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 card_btn" type="submit">Log
                      In</button>
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
  );
}

export default Login;
