import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {AppContext} from "../appContext/AppContext"

function PersonalDatail() {
  const [empData, setEmpData] = useState([])

  const {token,employeeId} = useContext(AppContext)
  console.log(employeeId);
  

  useEffect(()=>{
    const fetchEmpData = async()=>{
      try{
        const response = await axios.get("http://localhost:8080/joining/",{
          headers:{
            Authorization:`Bearer ${token}`

          }
        })
        if(response.status === 200){
          setEmpData(response.data)
          
        }
        console.log(response.data);
        if(response.status === 200){
          setEmpData(response.data)
          
        }

      }catch(err){
        console.log(err);
        
      }
    }
    fetchEmpData();
  },[token])

 const filterEmpData = (employee) => {
    return empData.filter((emp) => emp.employeeID === employeeId);
  };
  console.log(filterEmpData(empData));
  const personalEmpData = filterEmpData(empData)[0];
  

  return (
    <>
    <div className=' m-5'>
      <h3 className="title border-bottom border-2 border-dark">
        Personal Details
      </h3>
    </div>
    <div className="card mb-4 m-2 shadow-sm " >
 
 <div className=" d-flex justify-content-evenly  align-items-center">
   <div className="d-flex align-items-center">
 <img src={personalEmpData?.photo_url} className="img-fluid rounded-start w-25   rounded  " alt="Profile Pic"/>
  
   <div className='px-5'>
   <p className="lh-1">Name: {personalEmpData?.full_name}</p>
   <p className="lh-1">Father's Name: {personalEmpData?.fathers_name}</p>
   <p className="lh-1">Employee ID: {personalEmpData?.employeeID}</p>
   </div>
   </div>
   <div className=' pt-2'>
   <p className="lh-1">Gender: {personalEmpData?.gender}</p>
   <p className="lh-1">Marital Status: {personalEmpData?.marital_status}</p>
   <p className="lh-1">Blood Group: {personalEmpData?.blood_group}</p>
   <p className="lh-1">Date of Birth: {personalEmpData?.date_of_birth}</p>
   </div>
   <div className='px-5 pt-2'>
   <p className="lh-1">Official Contact Number: {personalEmpData?.official_contact_no}</p>
   <p className="lh-1">Official Email ID: {personalEmpData?.official_mail_id}</p>
   <p className="lh-1">Personal Contact Number: {personalEmpData?.personal_contact_no}</p>
   <p className="lh-1">Personal Email ID: {personalEmpData?.personal_mail_id}</p>
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
        <p className="lh-1">Name:{personalEmpData?.present_address_name}, Relation: {personalEmpData?.present_address_relation}, Contact: {personalEmpData?.present_address_contact_no}</p>
        <p className="lh-1">Full Address: {personalEmpData?.present_address_full_address}</p> 
        <p className="lh-1">State: {personalEmpData?.present_address_state}, District/City: {personalEmpData?.present_address_district_city} </p>
        <p className="lh-1">Pincode: {personalEmpData?.present_address_pin_code}</p>
        </div>
                <div className='px-5'>
                  <h5 className='border-bottom border-dark text-center mb-3'>Permanent Address</h5>
        <p className="lh-1">Name: {personalEmpData?.present_address_name}, Relation: {personalEmpData?.present_address_relation}, Contact: {personalEmpData?.present_address_contact_no}</p>
        <p className="lh-1">Full Address: {personalEmpData?.present_address_full_address}</p> 
        <p className="lh-1">State: {personalEmpData?.present_address_state}, District/City: {personalEmpData?.present_address_district_city} </p>
        <p className="lh-1">Pincode: {personalEmpData?.present_address_pin_code}</p>
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
                <p className="lh-1">Date Of Interview: {personalEmpData?.date_of_interview} </p>
        <p className="lh-1">Date of Joining: {personalEmpData?.date_of_joining}</p> 
        <p className="lh-1">Company Name: {personalEmpData?.company_name} </p>
        <p className="lh-1">Department: {personalEmpData?.department}</p>
        </div>
                <div className="px-5">
                <p className="lh-1">Designation: {personalEmpData?.designation} </p>
        <p className="lh-1">Employee Type: {personalEmpData?.employee_type}</p> 
        <p className="lh-1">Mode Of Recruitment: {personalEmpData?.mode_of_recruitment} </p>
        <p className="lh-1">Reference/Consultency: {personalEmpData?.reference_consultency}</p>
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
                <p className="lh-1">PAN No.: {personalEmpData?.pan_no}, </p>
        <p className="lh-1">Aadhar No.: {personalEmpData?.adhar_no}</p> 
        <p className="lh-1">Bank Name: {personalEmpData?.bank} </p>
        <p className="lh-1">Account No.: {personalEmpData?.account_no}</p>
                </div>
                <div className="px-5">
                <p className="lh-1">IFSC Code: {personalEmpData?.designation}, </p>
        <p className="lh-1">Branch Address: {personalEmpData?.branch_address}</p> 
        <p className="lh-1">UAN No.: {personalEmpData?.mode_of_recruitment} </p>
        
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
                  <p className="lh-1 ">Name: {personalEmpData?.e_name1} </p>
                  <p className="lh-1">Relation: {personalEmpData?.e_relation1} </p>
                  <p className="lh-1">Address: {personalEmpData?.e_address1}  </p>
                </div>
                <div className="px-5">
                  <p className="lh-1">Form Submission Date: {personalEmpData?.date} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
  </div>
    </>
  )
}

export default PersonalDatail