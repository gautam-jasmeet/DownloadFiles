import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../dashboard/ViewFiles.css';
import Footer from '../../shared/Footer';

function Login() {
  const [employeeID, setEmployeeID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  // useEffect(()=>{

  // })

  const handleChangeEmployeeID = (e) => {
    setEmployeeID(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log('Employee ID:', employeeID);
    console.log('Password:', password);

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        employeeID,
        password,
      });

      if (response.status === 200) {
        const { token, department, designation } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('designation', designation);
        localStorage.setItem('department', department);

        console.log('Response:', response.data);
        console.log("Department:", department);
        

       // Redirecting  based on the role 
       console.log('Navigating to:', designation === "Admin" ? '/Admin' : `/${department}`);
       if(designation === "Admin"){
        navigate('/Admin');
       }else{
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

    
    <div className="container mt-5 w-25 p-3" >
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
    <Footer/>
    </div>
  );
}

export default Login;
