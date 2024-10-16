import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../../../appContext/AppContext';
import axios from 'axios';


function Employee() {
  const [empData, setEmpData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const { token } = useContext(AppContext);

  const departments =["HR","Store","Production","Machine","Maintance","SOP|WI","Logistics",
    "Quality","Calibration","FQC","IQC","IPQC","EHS"]
  

   //// Grouping employees by department

       //  const array1 =[1,2,3,4,5]
       //  const initialValue = 0;
       //  array1.reduce(
       //   (accumulator, currentValue) => accumulator + currentValue,
       //   initialValue,
       // );

   const groupedByDepartment = (emplpoyees)=>{
    return emplpoyees.reduce((acc,emp)=>{
      const department = emp.department || "Other";
      // console.log(department);
      
      if(!acc[department]){
        acc[department] = [];
      }
      acc[department].push(emp);
      // console.log(acc[department]);
      
      return acc
    },{});
  } 
  
  // console.log(groupedByDepartment(empData));
  // const departmentEmployees = groupedByDepartment(empData);

  useEffect(()=>{
    const fetchEmpData = async()=>{
      try{
        const response = await axios.get("http://srv617987.hstgr.cloud:8000/joining/",{
          headers:{
            Authorization: `Bearer ${token}`}
        });
        // console.log(response.data);
        if(response.status === 200){
          setEmpData(response.data);
        }
      }catch(err){
        console.log(err);
      }
    }
    fetchEmpData();
  },[token])

  
const handleCategoryChange = (event) => {
  const category = event.target.value;
  setSelectedCategory(category);
};
 
  


  return (
    <div>
      {/* Showing and hiding categories */}
            
      <div className='cat' style={{width: '70vw'}} >
        < div className="navbar cat-1" >
  <div className="container-fluid cat-2">
     <h6>Select Category:</h6>
     <ul className=" cat-ul">
     
        <li className="nav-item cat-list "  key="all-categories">
          <button
            className={`nav-link ${selectedCategory === "" ? "active" : ""}`} 
            onClick={() => handleCategoryChange({ target: { value: "" } })}
            // role='button' //  Indicates that this anchor behaves like a button
          >
            All Categories
          </button>
        </li>
      
       {departments.map((category) => (
        <li className="nav-item cat-list" key={category}>
          <button
            // href="#"
            className={`nav-link ${selectedCategory === category ? "active" : ""}`}
            onClick={() => handleCategoryChange({ target: { value: category } })}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  </div>
  </div>
  

           
            {/* List of uploaded files */}  
           {/* style={containerStyle} */}
          
           <ol className='cat_ol'>  
          {empData.length === 0 ? (
            <p className='cat_ol-1'>No files available for the selected category.</p>
          ) : (   
            empData.map((file) => (
              <li className='cat_ol-2' key={file.id} style={{ margin: '10px' }}>
                <div className="card w-50 cat_ol-3" >
                  <div className="card-body cat_ol-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p className="card-title cat_ol-5"><b>File Name:</b> {file.full_name}</p>
                      <p className="card-text cat_ol-6" style={{ margin: "0" }}><b>Father Name:</b> {file.fathers_name}</p> 
                    </div>
                 </div>
                </div>
              </li>
            ))
            )}
          </ol> 
          </div>
           {/* </div> */}
           {/* </div>  */}
     

     {/* Employee Details Card */}
    <div>
      <ol >
        {empData.map((emp,index)=>{
          return(
            <li key={emp.id}>
              <div className="card mb-4 m-5 shadow-sm " >
 
      <div className=" d-flex justify-content-evenly  align-items-center">
        <div className="d-flex align-items-center">
      <img src={emp.photo_url} className="img-fluid rounded-start w-25   rounded  " alt="Profile Pic"/>
       
        <div className='px-5'>
        <p className="lh-1">Name: {emp.full_name}</p>
        <p className="lh-1">Father's Name: {emp.fathers_name}</p>
        <p className="lh-1">Date of Birth: {emp.date_of_birth}</p>
        </div>
        </div>
        <div>
        <p className="lh-1">Gender: {emp.gender}</p>
        <p className="lh-1">Marital Status: {emp.marital_status}</p>
        <p className="lh-1">Blood Group: {emp.blood_group}</p>
        </div>
        <div className='px-5'>
        <p className="lh-1">Official Contact Number: {emp.official_contact_no}</p>
        <p className="lh-1">Official Email ID: {emp.official_mail_id}</p>
        <p className="lh-1">Personal Contact Number: {emp.personal_contact_no}</p>
        <p className="lh-1">Personal Email ID: {emp.personal_mail_id}</p>
        </div>
      
      </div>
   
<div className="accordion" id={`accordionExample${index}`}>
           
            <div className="accordion-item">
              <h2 className="accordion-header" id={`headingTwo${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseTwo${index}`}
                  aria-expanded="false"
                  aria-controls={`collapseTwo${index}`}
                >
              Employee Address
                </button>
              </h2>
              <div
                id={`collapseTwo${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`headingTwo${index}`}
                data-bs-parent={`#accordionExample${index}`}
              >
                <div className="accordion-body d-flex">
                <div className='px-5'>
                  <h5 className='border-bottom border-dark text-center mb-3'>Present Address</h5>
        <p className="lh-1">Name:{emp.present_address_name}, Relation: {emp.present_address_relation}, Contact: {emp.present_address_contact_no}</p>
        <p className="lh-1">Full Address: {emp.present_address_full_address}</p> 
        <p className="lh-1">State: {emp.present_address_state}, District/City: {emp.present_address_district_city} </p>
        <p className="lh-1">Pincode: {emp.present_address_pin_code}</p>
        </div>
                <div className='px-5'>
                  <h5 className='border-bottom border-dark text-center mb-3'>Permanent Address</h5>
        <p className="lh-1">Name: {emp.present_address_name}, Relation: {emp.present_address_relation}, Contact: {emp.present_address_contact_no}</p>
        <p className="lh-1">Full Address: {emp.present_address_full_address}</p> 
        <p className="lh-1">State: {emp.present_address_state}, District/City: {emp.present_address_district_city} </p>
        <p className="lh-1">Pincode: {emp.present_address_pin_code}</p>
        </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id={`headingThree${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseThree${index}`}
                  aria-expanded="false"
                  aria-controls={`collapseThree${index}`}
                >
                  Joining Details
                </button>
              </h2>
              <div
                id={`collapseThree${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`headingThree${index}`}
                data-bs-parent={`#accordionExample${index}`}
              >
                 <div className="accordion-body d-flex">
                <div className="px-5">
                <p className="lh-1">Date Of Interview: {emp.date_of_interview} </p>
        <p className="lh-1">Date of Joining: {emp.date_of_joining}</p> 
        <p className="lh-1">Company Name: {emp.company_name} </p>
        <p className="lh-1">Department: {emp.department}</p>
        </div>
                <div className="px-5">
                <p className="lh-1">Designation: {emp.designation} </p>
        <p className="lh-1">Employee Type: {emp.employee_type}</p> 
        <p className="lh-1">Mode Of Recruitment: {emp.mode_of_recruitment} </p>
        <p className="lh-1">Reference/Consultency: {emp.reference_consultency}</p>
                </div>
              </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id={`headingFour${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseFour${index}`}
                  aria-expanded="false"
                  aria-controls={`collapseFour${index}`}
                >
                  Bank Details
                </button>
              </h2>
              <div
                id={`collapseFour${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`headingFour${index}`}
                data-bs-parent={`#accordionExample${index}`}
              >
                <div className="accordion-body d-flex">
                <div className="px-5">
                <p className="lh-1">PAN No.: {emp.pan_no}, </p>
        <p className="lh-1">Aadhar No.: {emp.adhar_no}</p> 
        <p className="lh-1">Bank Name: {emp.bank} </p>
        <p className="lh-1">Account No.: {emp.account_no}</p>
                </div>
                <div className="px-5">
                <p className="lh-1">IFSC Code: {emp.designation}, </p>
        <p className="lh-1">Branch Address: {emp.branch_address}</p> 
        <p className="lh-1">UAN No.: {emp.mode_of_recruitment} </p>
        
                </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id={`headingFive${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseFive${index}`}
                  aria-expanded="false"
                  aria-controls={`collapseFive${index}`}
                >
                 Others
                </button>
              </h2>
              <div
                id={`collapseFive${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`headingFive${index}`}
                data-bs-parent={`#accordionExample${index}`}
              >
                <div className="accordion-body d-flex ">
                <div className="px-5">
                  <h5 className='border-bottom border-dark text-center mb-3'>Contact Details in Case of Emergency<br/>
                  (Family Member Only)</h5>
                  <p className="lh-1 ">Name: {emp.e_name1} </p>
                  <p className="lh-1">Relation: {emp.e_relation1} </p>
                  <p className="lh-1">Address: {emp.e_address1}  </p>
                </div>
                <div className="px-5">
                  <p className="lh-1">Form Submission Date: {emp.date} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
</div>

            </li>
          )
        })}
      </ol>
    </div>

    </div>
  )
}

export default Employee