import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../../appContext/AppContext';
import useGet from '../../../customHooks/useGet';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const { token } = useContext(AppContext);

  const departments =["HR","Store","Production","Machine","Maintance","SOP|WI","Logistics",
    "Quality","Calibration","FQC","IQC","IPQC","EHS"]
  

  // Function to group employees by department
  const groupByDepartment = (data) => {
    return data.reduce((acc, employee) => {
      const dept = employee.department || 'Others';
      if (!acc[dept]) {
        acc[dept] = [];
      }
      acc[dept].push(employee);
      
      return acc;
    }, {});
  };

  // Fetch employee data

  const {data, error,loading} = useGet("http://srv617987.hstgr.cloud:8080/joining/");

  // useEffect(() => {
  //   const fetchEmpData = async () => {
  //     setLoading(true); // Start loading
  //     setError(null);   // Reset previous errors

  //     try {
  //       const response = await axios.get("http://srv617987.hstgr.cloud:8080/joining/", { 
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       });

  //       // console.log(response.data);

  //       if (response.status === 200) {
  //         setEmployees(response.data);
  //         // setDepartments(groupByDepartment(response.data));
  //         setFilteredEmployees(response.data); // Initialize filteredEmployees
        
  //       } else {
  //         // Handle non-200 responses
  //         setError(`Unexpected response status: ${response.status}`);
  //       }
  //     } catch (err) {
  //       // Handle errors (network issues, server errors, etc.)
  //       console.error('Error fetching employee data:', err);
  //       setError(err.response?.data?.message || err.message || 'An error occurred');
  //     } finally {
  //       // Stop loading in both success and error cases
  //       setLoading(false);
  //     }
  //   };

  //   // Only fetch if token is available
  //   if (token) {
  //     fetchEmpData();
  //   } else {
  //     setError('Authentication token is missing.');
  //     setLoading(false);
  //   }
  // }, [token]); // Add token as a dependency


  // Handle employee click to open modal
  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };
  // console.log(selectedEmployee);
  // console.log(selectedEmployee.full_name);

  

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

   // Edit employee's data
   const handleEditClick = () =>{
    setIsEditing(true);
    setUpdatedEmployee({...selectedEmployee});
  }

  // handle input change
  const handleInputChange = (event)=>{
    const {name,value} = event.target;
    setUpdatedEmployee((prev)=>({...prev,
      [name]:value
    }));
  }

  // Save Changes
  const handleSaveClick = async()=>{
    try{
      const response = await axios.put(`http://srv617987.hstgr.cloud:8080/joining/${updatedEmployee.id}`,updatedEmployee,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(response.status === 200){
        setEmployees((prevEmployees)=>prevEmployees.map((emp)=>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
        ))
        setSelectedEmployee(updatedEmployee);
        setIsEditing(false);
      }else{
        alert("Fail to update employee details");
      }
    }catch(error){
      console.log(error);
      alert("An error occurred while updating employee details.");
    }
  }

  // handel cancel edit
  const handleCancelEdit = ()=>{
    setIsEditing(false);
    setUpdatedEmployee(null);
  }
  
  // handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }
  
  // Filter employees based on selected category
  useEffect(() => {
    if(selectedCategory ===""){
      setFilteredEmployees(data);
    }else{
      const filtered = data.filter((emp)=>emp.department === selectedCategory)
      setFilteredEmployees(filtered);
    }
  }, [data, selectedCategory]);
  
  // Conditional Rendering based on state
  if (loading) {
    return <p>Loading employees...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div className='m-1 '>
      <div  style={{position:"sticky", top:"140px",zIndex:"998", backgroundColor:"var(--main-Dept-header-color)"}}>
      <h3 className='title border-2 border-bottom border-black mx-5' >
        Employee Directory
        </h3>
        </div>
       {/* Category Selection */}
      <div className='cat'  style={{position:"sticky", top:"170px",zIndex:"997", backgroundColor:"var(--main-Dept-header-color)"}}>
      <div className="navbar cat-1">
        <div className="container-fluid cat-2">
          <ul className="cat-ul">
            <li className="nav-item cat-list">
              <button
                className={`nav-link ${selectedCategory === "" ? "active" : ""}  border-2 border-bottom border-black`}
                onClick={() => handleCategoryChange({ target: { value: "" } })}
              >
                All Categories
              </button>
            </li>
            {departments.map((category) => (
              <li className="nav-item cat-list" key={category}>
                <button
                  className={`nav-link ${selectedCategory === category ? "active" : ""} 
                   `}
                  onClick={() => handleCategoryChange({ target: { value: category } })}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
     
       {/* Employee List */}
       <div style={{marginTop:"20px", marginLeft:"20px"}}>
        {filteredEmployees.length === 0 ?(
          <p>No employees found</p>
        ):(
          Object.keys(groupByDepartment(filteredEmployees)).map((dept) => (
            <div key={dept} style={{ marginBottom: '20px' }}>
              <div >
              <h5 ><span className='m-2 border-2 border-bottom border-black fw-bold'
              style={{color:"var(--primary-color)"}}
              >{dept}</span></h5>
              <ol >
                {groupByDepartment(filteredEmployees)[dept].map((emp) => (
                  <li key={emp.id} 
                  onClick={() => handleEmployeeClick(emp)}
                  >
                   <a href='#' >{emp.full_name}</a> 
                  </li>
                ))}
              </ol>
              </div>
            </div>
          ))
        )
        }
      </div>

      {/* Modal for Employee Details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Employee Details"
        style={{
          content: {
            maxWidth: '80%',
            margin: 'auto',
            marginLeft: '15%',
            marginTop: '16rem',
            padding: '0.5rem',
          },
        }}
      >
        {selectedEmployee && (
         
             <div className="card mb-4 m-2 shadow-sm "  >
 
 <div className=" d-flex justify-content-between  align-items-center">
   <div className="d-flex align-items-center">
 <img src={`http://srv617987.hstgr.cloud:8080${selectedEmployee.photo_url}`} 
 className='rounded-3'
  alt="Profile Pic"
 style={{width:"200px", height:"150px", margin:"2px"}}
 />
  
   <div className='px-5'>
     {/* Name */}
     {isEditing ?(
      <div>
      <label>Name: </label>
      <input
      className="form-control"
      type='text'
      name='full_name'
      value={updatedEmployee.full_name}
      onChange={handleInputChange}
      /> 
      </div>):(
        <p className="lh-1">Name: {selectedEmployee.full_name}</p>
      )
  }
     {/* Father Name */}
     {isEditing ?(
      <div>
      <label> Father's Name: </label>
      <input
      className="form-control"
      type='text'
      name='fathers_name'
      value={updatedEmployee.fathers_name}
      onChange={handleInputChange}
      /> 
      </div>):(
        <p className="lh-1">Father's Name: {selectedEmployee.fathers_name}</p>
      )
  }
     {/* Employee ID */}
     {isEditing ?(
      <div>
      <label>Employee ID: </label>
      <input
      className="form-control"
      type='text'
      name='employeeID'
      value={updatedEmployee.employeeID}
      onChange={handleInputChange}
      /> 
      </div>):(
       <p className="lh-1">Employee ID: {selectedEmployee.employeeID}</p>
      )
  }
   
   </div>
   </div>
   <div>
   {isEditing ?(
      <div>
      <label>Date of Birth: </label>
      <input
      className="form-control"
      type='text'
      name='date_of_birth'
      value={updatedEmployee.date_of_birth}
      onChange={handleInputChange}
      /> 
      </div>):(
      <p className="lh-1">Date of Birth: {selectedEmployee.date_of_birth}</p>
      )
  }
   {isEditing ?(
      <div>
      <label>Marital Status: </label>
      <input
      className="form-control"
      type='text'
      name='marital_status'
      value={updatedEmployee.marital_status}
      onChange={handleInputChange}
      /> 
      </div>):(
       <p className="lh-1">Marital Status: {selectedEmployee.marital_status}</p>
      )
  }
   {isEditing ?(
      <div>
      <label>Gender: </label>
      <input
      className="form-control"
      type='text'
      name='gender'
      value={updatedEmployee.gender}
      onChange={handleInputChange}
      /> 
      </div>):(
      <p className="lh-1">Gender: {selectedEmployee.gender}</p>
      )
  }
   {isEditing ?(
      <div>
      <label>Blood Group: </label>
      <input
      className="form-control"
      type='text'
      name='blood_group'
      value={updatedEmployee.blood_group}
      onChange={handleInputChange}
      /> 
      </div>):(
       <p className="lh-1">Blood Group: {selectedEmployee.blood_group}</p>
      )
  }
   
  
  
  
   </div>
   <div className='px-5 pt-2'>
   {isEditing ?(
      <div>
      <label>Official Contact Number:</label>
      <input
      className="form-control"
      type='text'
      name='official_contact_no'
      value={updatedEmployee.official_contact_no}
      onChange={handleInputChange}
      /> 
      </div>):(
       <p className="lh-1">Official Contact Number: {selectedEmployee.official_contact_no}</p>
      )
  }
  {isEditing ?(
      <div>
      <label>Official Email ID: </label>
      <input
      className="form-control"
      type='text'
      name='official_mail_id'
      value={updatedEmployee.official_mail_id}
      onChange={handleInputChange}
      /> 
      </div>):(
      <p className="lh-1">Official Email ID: {selectedEmployee.official_mail_id}</p>
      )
  }
  {isEditing ?(
      <div>
      <label>Personal Contact Number:</label>
      <input
      className="form-control"
      type='text'
      name='personal_contact_no'
      value={updatedEmployee.personal_contact_no}
      onChange={handleInputChange}
      /> 
      </div>):(
       <p className="lh-1">Personal Contact Number: {selectedEmployee.personal_contact_no}</p>
      )
  }
  {isEditing ?(
      <div>
      <label>Personal Email ID: </label>
      <input
      className="form-control"
      type='text'
      name='personal_mail_id'
      value={updatedEmployee.personal_mail_id}
      onChange={handleInputChange}
      /> 
      </div>):(
       <p className="lh-1">Personal Email ID: {selectedEmployee.personal_mail_id}</p>
      )
  }
   </div>
 
 </div>

 <div className="accordion" id={`accordionExample`}>
           
            <div className="accordion-item">
              <h2 className="accordion-header" id={`headingTwo`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseTwo`}
                  aria-expanded="false"
                  aria-controls={`collapseTwo`}
                >
              Employee Address
                </button>
              </h2>
              <div
                id={`collapseTwo`}
                className="accordion-collapse collapse"
                aria-labelledby={`headingTwo`}
                data-bs-parent={`#accordionExample`}
              >
                <div className="accordion-body d-flex">
                <div className='px-5'>
                  <h5 className='border-bottom border-dark text-center mb-3'>Present Address</h5>
                  {isEditing ? (
                          <>
                          <label>Name: </label>
                            <input className="form-control"
                              type="text"
                              name="present_address_name"
                              value={updatedEmployee.present_address_name}
                              onChange={handleInputChange}
                            />
                             <label>Relation: </label>
                            <input className="form-control"
                              type="text"
                              name="present_address_relation"
                              value={updatedEmployee.present_address_relation}
                              onChange={handleInputChange}
                            />
                             <label>Contact: </label>
                            <input className="form-control"
                              type="text"
                              name="present_address_contact_no"
                              value={updatedEmployee.present_address_contact_no}
                              onChange={handleInputChange}
                            />
                             <label>Full Address: </label>
                            <input className="form-control"
                              type="text"
                              name="present_address_full_address"
                              value={updatedEmployee.present_address_full_address}
                              onChange={handleInputChange}
                            />
                             <label>State: </label>
                            <input className="form-control"
                              type="text"
                              name="present_address_state"
                              value={updatedEmployee.present_address_state}
                              onChange={handleInputChange}
                            />
                             <label>District/City: </label>
                            <input className="form-control"
                              type="text"
                              name="present_address_district_city"
                              value={updatedEmployee.present_address_district_city}
                              onChange={handleInputChange}
                            />
                             <label>Pincode: </label>
                            <input className="form-control"
                              type="text"
                              name="present_address_pin_code"
                              value={updatedEmployee.present_address_pin_code}
                              onChange={handleInputChange}
                            />
                           
                          </>
                        ) : (
                          <>
                            <p className="lh-1">
                              Name: {selectedEmployee.present_address_name}, Relation:{' '}
                              {selectedEmployee.present_address_relation}, Contact:{' '}
                              {selectedEmployee.present_address_contact_no}
                            </p>
                            <p className="lh-1">Full Address: {selectedEmployee.present_address_full_address}</p> 
        <p className="lh-1">State: {selectedEmployee.present_address_state}, District/City: {selectedEmployee.present_address_district_city} </p>
        <p className="lh-1">Pincode: {selectedEmployee.present_address_pin_code}</p>
                            
                          </>
                        )}
        </div>
                <div className='px-5'>
                  <h5 className='border-bottom border-dark text-center mb-3'>Permanent Address</h5>
                  {isEditing ? (
                          <>
                          <label>Name: </label>
                            <input className="form-control"
                              type="text"
                              name="permanent_address_name"
                              value={updatedEmployee.permanent_address_name}
                              onChange={handleInputChange}
                            />
                             <label>Relation: </label>
                            <input className="form-control"
                              type="text"
                              name="permanent_address_relation"
                              value={updatedEmployee.permanent_address_relation}
                              onChange={handleInputChange}
                            />
                             <label>Contact: </label>
                            <input className="form-control"
                              type="text"
                              name="permanent_address_contact_no"
                              value={updatedEmployee.permanent_address_contact_no}
                              onChange={handleInputChange}
                            />
                             <label>Full Address: </label>
                            <input className="form-control"
                              type="text"
                              name="permanent_address_full_address"
                              value={updatedEmployee.permanent_address_full_address}
                              onChange={handleInputChange}
                            />
                             <label>State: </label>
                            <input className="form-control"
                              type="text"
                              name="permanent_address_state"
                              value={updatedEmployee.permanent_address_state}
                              onChange={handleInputChange}
                            />
                             <label>District/City: </label>
                            <input className="form-control"
                              type="text"
                              name="permanent_address_district_city"
                              value={updatedEmployee.permanent_address_district_city}
                              onChange={handleInputChange}
                            />
                             <label>Pincode: </label>
                            <input className="form-control"
                              type="text"
                              name="permanent_address_pin_code"
                              value={updatedEmployee.permanent_address_pin_code}
                              onChange={handleInputChange}
                            />
                           
                          </>
                        ) : (
                          <>
                            <p className="lh-1">Name: {selectedEmployee.permanent_address_name}, 
                              Relation: {selectedEmployee.permanent_address_relation},
                               Contact: {selectedEmployee.permanent_address_contact_no}</p>
        <p className="lh-1">Full Address: {selectedEmployee.permanent_address_full_address}</p> 
        <p className="lh-1">State: {selectedEmployee.permanent_address_state},
           District/City: {selectedEmployee.permanent_address_district_city} </p>
        <p className="lh-1">Pincode: {selectedEmployee.permanent_address_pin_code}</p>
                            
                          </>
                        )}
        
        </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id={`headingThree`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseThree`}
                  aria-expanded="false"
                  aria-controls={`collapseThree`}
                >
                  Joining Details
                </button>
              </h2>
              <div
                id={`collapseThree`}
                className="accordion-collapse collapse"
                aria-labelledby={`headingThree`}
                data-bs-parent={`#accordionExample`}
              >
                 <div className="accordion-body d-flex">
                <div className="px-5">
                  {isEditing ? (
                          <>
                          <label>Date Of Interview: </label>
                         <input
                          className="form-control"
                           type="text"
                           name="date_of_interview"
                           value={updatedEmployee.date_of_interview}
                           onChange={handleInputChange}
                         />
                          <label>Joining Date: </label>
                            <input
                             className="form-control"
                              type="text"
                              name="date_of_joining"
                              value={updatedEmployee.date_of_joining}
                              onChange={handleInputChange}
                            />
                             <label>Company Name: </label>
                            <input
                             className="form-control"
                              type="text"
                              name="company_name"
                              value={updatedEmployee.company_name}
                              onChange={handleInputChange}
                            />
                             <label>Department:  </label>
                            <input
                             className="form-control"
                              type="text"
                              name="department"
                              value={updatedEmployee.department}
                              onChange={handleInputChange}
                            />
                            
                          </>
                        ) : (
                          <>
                           <p className="lh-1">Date Of Interview: {selectedEmployee.date_of_interview} </p>
        <p className="lh-1">Date of Joining: {selectedEmployee.date_of_joining}</p> 
        <p className="lh-1">Company Name: {selectedEmployee.company_name} </p>
        <p className="lh-1">Department: {selectedEmployee.department}</p>
        </>
                  )}
               
        </div>
                <div className="px-5">
                {isEditing ? (
                          <>
                          <label>Designation: </label>
                         <input
                          className="form-control"
                           type="text"
                           name="designation"
                           value={updatedEmployee.designation}
                           onChange={handleInputChange}
                         />
                          <label>Employee Type: </label>
                            <input
                             className="form-control"
                              type="text"
                              name="employee_type"
                              value={updatedEmployee.employee_type}
                              onChange={handleInputChange}
                            />
                             <label>Mode Of Recruitment: </label>
                            <input
                             className="form-control"
                              type="text"
                              name="mode_of_recruitment"
                              value={updatedEmployee.mode_of_recruitment}
                              onChange={handleInputChange}
                            />
                             <label>Reference/Consultency:  </label>
                            <input
                             className="form-control"
                              type="text"
                              name="reference_consultency"
                              value={updatedEmployee.reference_consultency}
                              onChange={handleInputChange}
                            />
                            
                          </>
                        ) : (
                          <>
                           <p className="lh-1">Designation: {selectedEmployee.designation} </p>
        <p className="lh-1">Employee Type: {selectedEmployee.employee_type}</p> 
        <p className="lh-1">Mode Of Recruitment: {selectedEmployee.mode_of_recruitment} </p>
        <p className="lh-1">Reference/Consultency: {selectedEmployee.reference_consultency}</p>
        </>
                  )}
               
                </div>
              </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id={`headingFour`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseFour`}
                  aria-expanded="false"
                  aria-controls={`collapseFour`}
                >
                  Bank Details
                </button>
              </h2>
              <div
                id={`collapseFour`}
                className="accordion-collapse collapse"
                aria-labelledby={`headingFour`}
                data-bs-parent={`#accordionExample`}
              >
                <div className="accordion-body d-flex">
                <div className="px-5">
                {isEditing ? (
                          <>
                          <label>PAN No.: </label>
                         <input
                          className="form-control"
                           type="text"
                           name="pan_no"
                           value={updatedEmployee.pan_no}
                           onChange={handleInputChange}
                         />
                          <label>Aadhar No.: </label>
                            <input
                             className="form-control"
                              type="text"
                              name="adhar_no"
                              value={updatedEmployee.adhar_no}
                              onChange={handleInputChange}
                            />
                             <label>Bank Name: </label>
                            <input
                             className="form-control"
                              type="text"
                              name="bank"
                              value={updatedEmployee.bank}
                              onChange={handleInputChange}
                            />
                             <label>Account No.:  </label>
                            <input
                             className="form-control"
                              type="text"
                              name="account_no"
                              value={updatedEmployee.account_no}
                              onChange={handleInputChange}
                            />
                            
                          </>
                        ) : (
                          <>
                           <p className="lh-1">PAN No.: {selectedEmployee.pan_no}, </p>
        <p className="lh-1">Aadhar No.: {selectedEmployee.adhar_no}</p> 
        <p className="lh-1">Bank Name: {selectedEmployee.bank} </p>
        <p className="lh-1">Account No.: {selectedEmployee.account_no}</p>
        </>
                  )}
               
                </div>
                <div className="px-5">
                {isEditing ? (
                          <>
                          <label>IFSC Code: </label>
                         <input
                          className="form-control"
                           type="text"
                           name="ifsc_code"
                           value={updatedEmployee.ifsc_code}
                           onChange={handleInputChange}
                         />
                          <label>Branch Address: </label>
                            <input
                             className="form-control"
                              type="text"
                              name="branch_address"
                              value={updatedEmployee.branch_address}
                              onChange={handleInputChange}
                            />
                             <label>UAN No.:</label>
                            <input
                             className="form-control"
                              type="text"
                              name="uan_no"
                              value={updatedEmployee.uan_no}
                              onChange={handleInputChange}
                            />
                            
                          </>
                        ) : (
                          <>
                          <p className="lh-1">IFSC Code: {selectedEmployee.ifsc_code}, </p>
        <p className="lh-1">Branch Address: {selectedEmployee.branch_address}</p> 
        <p className="lh-1">UAN No.: {selectedEmployee.uan_no} </p>
        </>
                  )}
               
                </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id={`headingFive`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseFive`}
                  aria-expanded="false"
                  aria-controls={`collapseFive`}
                >
                 Others
                </button>
              </h2>
              <div
                id={`collapseFive`}
                className="accordion-collapse collapse"
                aria-labelledby={`headingFive`}
                data-bs-parent={`#accordionExample`}
              >
                <div className="accordion-body d-flex ">
                <div className="px-5">
                  <h5 className='border-bottom border-dark text-center mb-3'>Contact Details in Case of Emergency<br/>
                  (Family Member Only)</h5>
                  {isEditing ? (
                          <>
                          <label>Name: </label>
                         <input
                          className="form-control"
                           type="text"
                           name="e_name1"
                           value={updatedEmployee.e_name1}
                           onChange={handleInputChange}
                         />
                          <label>Relation: </label>
                            <input
                             className="form-control"
                              type="text"
                              name="e_relation1"
                              value={updatedEmployee.e_relation1}
                              onChange={handleInputChange}
                            />
                             <label>Address:</label>
                            <input
                             className="form-control"
                              type="text"
                              name="e_address1"
                              value={updatedEmployee.e_address1}
                              onChange={handleInputChange}
                            />
                            
                          </>
                        ) : (
                          <>
                         <p className="lh-1 ">Name: {selectedEmployee.e_name1} </p>
                  <p className="lh-1">Relation: {selectedEmployee.e_relation1} </p>
                  <p className="lh-1">Address: {selectedEmployee.e_address1}  </p>
        </>
                  )}
               
                 
                </div>
                <div className="px-5">
                {isEditing ? (
                  <>
                         <label>Form Submission Date: </label>
                         <input
                             className="form-control"
                              type="text"
                              name="date"
                              value={updatedEmployee.date}
                              onChange={handleInputChange}
                            />
                         </>
                        ) : (
                          <p className="lh-1">Form Submission Date: {selectedEmployee.date} </p>
                        )
                }
                 
                  </div>
                </div>
              </div>
           
</div>
{/* Save and Cancel Button */}
{isEditing && (
  <div className='d-flex justify-content-center mb-1'>
    <button onClick={handleSaveClick} 
    className='rounded-2 w-50  '
    >
      Save
    </button>
    <button onClick={handleCancelEdit}
     className=' rounded-2 w-50 '
     >
      Cancel
      </button>
  </div>
)}
 <div className='d-flex justify-content-center'>

<button 
  className='rounded-2 w-100 '
  onClick={closeModal} >
    Close
</button>

{/* Edit Button */}
{!isEditing &&(
        <button 
        className='rounded-2 w-100'
        onClick={handleEditClick} >
          Edit
        </button>

)}
</div>       

          </div>
          {/* <button onClick={closeModal} style={{ marginTop: '20px' }}>Close</button> */}
          </div>
        )}
      </Modal>
    </div>
   
  );
};

export default EmployeeList;
