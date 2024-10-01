import {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../../appContext/AppContext';
import "./JoiningForm.css"

function JoiningForm1() {
    const [step, setStep] = useState(1);
    const [fullName, setFullName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [officialContactNo, setOfficialContactNo] = useState("");
    const [officeEmail, setOfficeEmail] = useState("");
    const [personalContactNo, setPersonalContactNo] = useState("");
    const [personalEmail, setPersonalEmail] = useState("");
    const [presentAddress, setPresentAddress] = useState({
      name: "",
      relation: "",
      contactNo: "",
      fullAddress: "",
      state: "",
      city: "",
      pinCode: "",
    });
    const [permanentAddress, setPermanentAddress] = useState({
      name: "",
      relation: "",
      contactNo: "",
      fullAddress: "",
      state: "",
      city: "",
      pincode: "",
    });
  
    const [isSameAddress, setIsSameAddress] = useState(false);
    const [dateOfInterview, setDateOfInterview] = useState("");
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [companyName, setCompanyName] = useState("Udamandi Services Pvt. Ltd");
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const [employeeType, setEmployeeType] = useState("");
    const [modeOfRecruitment, setModeOfRecruitment] = useState("");
    const [referenceName, setReferenceName] = useState("");
    const [panNo, setPanNo] = useState("");
    const [aadharNo, setAadharNo] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNo, setAccountNo] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [bankBranch, setBankBranch] = useState("");
    const [uanNo, setUanNo] = useState("");
    const [emergencyContact, setEmergencyContact] = useState({
      name: "",
      relation: "",
      address: "",
      contactNo: "",
    });
    const [photo, setPhoto] = useState("");
    const [date, setDate] = useState("");
  
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
  
    const navigate = useNavigate();

    const {token} = useContext(AppContext)
  
    // Function to handle Next button
    const handleNext = () => {
      setStep(step + 1);
      // const newErrors = validateForm();
      // setErrors(newErrors);
      // if (Object.keys(newErrors).length === 0) {
      //   setStep(step + 1);
      // } else {
      //   alert("Please fill all the required fields");
      // }
    };
    // Function to handle Previous button
    const handlePrevious = () => {
      setStep(step - 1);
    };
    // const handlePart2 = () => {
    //   alert("Are you sure? You will be redirected to part 2");
    //   navigate("/HR/form2");
    // };
  
    // Function to handle htmlForm submission
    const handleSubmit = async(e) => {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append("full_name",fullName);
      formData.append("father_name",fatherName);
      formData.append("date_of_birth",dob); 
      formData.append("gender",gender);
      formData.append("marital_status",maritalStatus);
      formData.append("blood_group",bloodGroup);
      formData.append("official_contact_no",officialContactNo);
      formData.append("official_mail_id",officeEmail);
      formData.append("personal_contact_no",personalContactNo);
      formData.append("personal_mail_id",personalEmail);
      formData.append("present_address_name",presentAddress.name);
      formData.append("present_address_relation",presentAddress.relation);
      formData.append("present_address_contact_no",presentAddress.contactNo);
      formData.append("present_address_full_address",presentAddress.fullAddress);
      formData.append("present_address_state",presentAddress.state);
      formData.append("present_address_district_city",presentAddress.city);
      formData.append("present_address_pin_code",presentAddress.pinCode);
      formData.append("permanent_address_name",permanentAddress.name);
      formData.append("permanent_address_relation",permanentAddress.relation);
      formData.append("permanent_address_contact_no",permanentAddress.contactNo);
      formData.append("permanent_address_full_address",permanentAddress.fullAddress);
      formData.append("permanent_address_state",permanentAddress.state);  
      formData.append("permanent_address_district_city",permanentAddress.city);
      formData.append("permanent_address_pin_code",permanentAddress.pincode);
      // formData.append("is_same_address",isSameAddress);
      formData.append("date_of_interview",dateOfInterview);
      formData.append("date_of_joining",dateOfJoining);
      formData.append("department",department);
      formData.append("designation",designation);
      formData.append("employee_type",employeeType);
      formData.append("company_name",companyName);
      formData.append("mode_of_recruitment",modeOfRecruitment);
      formData.append("reference_consultancy",referenceName);
      formData.append("pan_no",panNo);
      formData.append("bank",bankName);
      formData.append("adhar_no",aadharNo);
      formData.append("account_no",accountNo);
      formData.append("ifsc_code",ifscCode);
      formData.append("branch_address",bankBranch);
      formData.append("uan_no",uanNo);  
      formData.append("e_name1",emergencyContact.name);
      formData.append("e_relation1",emergencyContact.relation);
      formData.append("e_address1",emergencyContact.address);
      formData.append("e_contact_no1",emergencyContact.contactNo);
      formData.append("photo",photo);
      formData.append("date",date);

      try{
        const response = await axios.post("http://localhost:8080/joining/fill",formData,{
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        console.log(response);
        
        if(response.status === 201){
          setMessage("Form submitted successfully");
      }else{
        setMessage("Form submission failed");
      }

    }catch(error){
      setMessage("Form submission failed" , `${error.message}`);
    }

    };
  
    // Function to handle input change
    const presentAddressOnChange = (e) => {
      const { name, value } = e.target;
      setPresentAddress({
        ...presentAddress,
        [name]: value,
      });
      //// If checkbox is checked, auto-fill Permanent Address
      if (isSameAddress) {
        setPermanentAddress(e.target.value);
      }
    };
    const permanentAddressOnChange = (e) => {
      const { name, value } = e.target;
      setPermanentAddress({
        ...permanentAddress,
        [name]: value,
      });
    };
  
    // Function to handle checkbox change
    const handleCheckboxChange = (e) => {
      setIsSameAddress(e.target.checked);
      // Auto-fill Present Address if checked
      if (e.target.checked) {
        setPermanentAddress(presentAddress);
      } else {
        setPermanentAddress("");
      }
    };

     // Function to handle input change
     const emergencyContactOnChange = (e) => {
      const { name, value } = e.target;
      setEmergencyContact({
        ...emergencyContact,
        [name]: value,
      });
    };
  
    // Function to handle photo upload
    const photoUploadOnChange = (e) => {
      setPhoto(e.target.files[0]);
    };
  
    // Form Validation
    const validateForm = () => {
      const errors = {};
      if (!fullName) {
        errors.fullName = "Full Name is required";
      } else if (fullName.length < 4) {
        errors.fullName = "Full Name should be atleast 4 characters";
      }
      if (!fatherName) {
        errors.fatherName = "Father Name is required";
      } else if (fatherName.length < 4) {
        errors.fatherName = "Father Name should be atleast 4 characters";
      }
      if (!dob) {
        errors.dob = "Date of Birth is required";
      }
      if (!gender) {
        errors.gender = "Gender is required";
      }
      if (!maritalStatus) {
        errors.maritalStatus = "Marital Status is required";
      }
      // if (!bloodGroup) {
      //   errors.bloodGroup = "Blood Group is required";
      // }
      // if (!officeEmail) {
      //   errors.officeEmail = "Office Email is required";
      // }
      if (!personalEmail) {
        errors.personalEmail = "Personal Email is required";
      }
      if (!personalContactNo) {
        errors.personalContactNo = "Personal Contact No. is required";
      }
      // if (!officialContactNo) {
      //   errors.officialContactNo = "Official Contact No. is required";
      // }
      // if (!presentAddress.name) {
      //   errors.presentAddress = "Name is required";
      // }
      // if (!permanentAddress) {
      //   errors.permanentAddress = "Permanent Address is required";
      // }
      return errors;
    };
  
    return (
      <div>
        <form className="gradient-custom " onSubmit={handleSubmit}>
          <section>
            <div className="container py-5 h-100">
              <div className="row justify-content-center align-items-center h-100">
                <div className="col-12 col-lg-9 col-xl-7 ">
                  {/* <h2
                    className="text-center mb-2 fw-semibold"
                    style={{
                      display: "inline-block",
                      borderBottom: "3px solid ",
                    }}
                  >
                    Part- l
                  </h2> */}
                  <div
                    className="card shadow-2-strong card-registration"
                    style={{
                      bordeRradius: " 15px",
                      // border: "1px solid black",
                    }}
                  >
                    {step === 1 && (
                      <>
                        <div className="card-body ">
                          <h4 className="mb-4 pb-2 pb-md-0 mb-md-5 border_bottom text-center">
                            {" "}
                            <b> Employee Personal Infomation</b>
                          </h4>
  
                          <div className="row mb-3">
                            <label
                              htmlFor="fullname"
                              className="col-sm-3 col--label text-secondary-emphasis fw-semibold"
                            >
                              Full Name
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                id="fullname"
                                className="form-control "
                                placeholder="Enter your Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                              />
                              {errors.fullName && (
                                <span className="error-message text-danger">
                                  {errors.fullName}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="fatherName"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Father's Name
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                id="fatherName"
                                placeholder="Enter your Father's Name"
                                value={fatherName}
                                onChange={(e) => setFatherName(e.target.value)}
                              />
                              {errors.fatherName && (
                                <span className="error-message text-danger ">
                                  {errors.fatherName}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="dob"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Date Of Birth
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="date"
                                className="form-control"
                                id="dob"
                                placeholder="Enter your Date Of Birth"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                              />
                              {errors.dob && (
                                <span className="error-message text-danger ">
                                  {errors.dob}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="gender"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Gender
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                id="gender"
                                placeholder="Enter your gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                              />
                              {errors.gender && (
                                <span className="error-message text-danger ">
                                  {errors.gender}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="maritalStatus"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Marital Status
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                id="maritalStatus"
                                placeholder="Enter your Marital Status"
                                value={maritalStatus}
                                onChange={(e) => setMaritalStatus(e.target.value)}
                              />
                              {errors.maritalStatus && (
                                <span className="error-message text-danger ">
                                  {errors.maritalStatus}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="bloodGroup"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Blood Group
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                id="bloodGroup"
                                placeholder="Enter your Blood Group"
                                value={bloodGroup}
                                onChange={(e) => setBloodGroup(e.target.value)}
                              />
                              {errors.bloodGroup && (
                                <span className="error-message text-danger ">
                                  {errors.bloodGroup}
                                </span>
                              )}
                            </div>
                          </div>
                          <h4 className="mb-4 pb-2 pb-md-0 mb-md-5 border_bottom text-center">
                            {" "}
                            <b> Contact Details</b>
                          </h4>
  
                          <div className="row mb-3">
                            <label
                              htmlFor="officialContactNo"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Official Contact Number
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="number"
                                className="form-control"
                                id="officialContactNo"
                                placeholder="Enter your Official Contact Number"
                                value={officialContactNo}
                                onChange={(e) =>
                                  setOfficialContactNo(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="officeEmail"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Official Email ID
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="email"
                                className="form-control"
                                id="officeEmail"
                                placeholder="Enter your Official Email ID"
                                value={officeEmail}
                                onChange={(e) => setOfficeEmail(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="personalContactNo"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Personal Contact Number
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="number"
                                className="form-control"
                                id="personalContactNo"
                                placeholder="Enter your Personal Contact Number"
                                value={personalContactNo}
                                onChange={(e) =>
                                  setPersonalContactNo(e.target.value)
                                }
                              />
                              {errors.personalContactNo && (
                                <span className="error-message text-danger ">
                                  {errors.personalContactNo}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="personalEmail"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Personal Email ID
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="email"
                                className="form-control"
                                id="personalEmail"
                                placeholder="Enter your Personal Email ID"
                                value={personalEmail}
                                onChange={(e) => setPersonalEmail(e.target.value)}
                              />
                              {errors.personalEmail && (
                                <span className="error-message text-danger ">
                                  {errors.personalEmail}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
  
                    {step === 2 && (
                      <>
                        <div className="card-body ">
                          <h4 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center border_bottom">
                            {" "}
                            <b> Employee Address - I</b>
                          </h4>
                          <div>
                            <h5
                              className="text-center text-secondary-emphasis fw-semibold"
                              style={{
                                marginBottom: "20px",
                                display: "inline-block",
                                borderBottom: "2px solid black",
                              }}
                            >
                              Present Address Details:
                            </h5>
  
                            <div
                              className="row mb-3"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div style={{ flex: "1" }}>
                                <label
                                  htmlFor="name"
                                  className=" text-secondary-emphasis fw-semibold"
                                >
                                  Name
                                </label>
                                <div>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={presentAddress.name}
                                    onChange={presentAddressOnChange}
                                  />
                                </div>
                              </div>
                              <div style={{ flex: "1" }}>
                                <label
                                  htmlFor="relation"
                                  className=" text-secondary-emphasis fw-semibold"
                                >
                                  Relation
                                </label>
                                <div>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="relation"
                                    name="relation"
                                    value={presentAddress.relation}
                                    onChange={presentAddressOnChange}
                                  />
                                </div>
                              </div>
                              <div style={{ flex: "1" }}>
                                <label
                                  htmlFor="contactNo"
                                  className=" text-secondary-emphasis fw-semibold"
                                >
                                  Contact Number
                                </label>
                                <div>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="contactNo"
                                    name="contactNo"
                                    value={presentAddress.contactNo}
                                    onChange={presentAddressOnChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="fullAddress"
                              className="col-sm-2 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Fulll Address
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="fullAddress"
                                name="fullAddress"
                                value={presentAddress.fullAddress}
                                onChange={presentAddressOnChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="state"
                              className="col-sm-2 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              State
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="state"
                                name="state"
                                value={presentAddress.state}
                                onChange={presentAddressOnChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="districtCity"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              District/City
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                id="districtCity"
                                name="city"
                                value={presentAddress.city}
                                onChange={presentAddressOnChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="pinCode"
                              className="col-sm-2 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Pin Code
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="number"
                                className="form-control"
                                id="pinCode"
                                name="pinCode"
                                value={presentAddress.pinCode}
                                onChange={presentAddressOnChange}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <div className="card-body ">
                          <h4 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center border_bottom">
                            {" "}
                            <b> Employee Address - II</b>
                          </h4>
                          <div>
                            <h5
                              className="text-center text-secondary-emphasis fw-semibold border_bottom"
                              style={{
                                marginBottom: "20px",
                                display: "inline-block",
                                borderBottom: "2px solid black",
                              }}
                            >
                              Permanent Address Details:
                            </h5>
                            <div>
                              <label>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  ischecked={isSameAddress}
                                  onChange={handleCheckboxChange}
                                />
                                Permanent address same as Present address
                              </label>
                            </div>
  
                            <div
                              className="row mb-3"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div style={{ flex: "1" }}>
                                <label
                                  htmlFor="name"
                                  className=" text-secondary-emphasis fw-semibold"
                                >
                                  Name
                                </label>
                                <div>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={permanentAddress.name}
                                    onChange={permanentAddressOnChange}
                                  />
                                </div>
                              </div>
                              <div style={{ flex: "1" }}>
                                <label
                                  htmlFor="relation"
                                  className=" text-secondary-emphasis fw-semibold"
                                >
                                  Relation
                                </label>
                                <div>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="relation"
                                    name="relation"
                                    value={permanentAddress.relation}
                                    onChange={permanentAddressOnChange}
                                  />
                                </div>
                              </div>
                              <div style={{ flex: "1" }}>
                                <label
                                  htmlFor="contactNo"
                                  className=" text-secondary-emphasis fw-semibold"
                                >
                                  Contact Number
                                </label>
                                <div>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="contactNo"
                                    name="contactNo"
                                    value={permanentAddress.contactNo}
                                    onChange={permanentAddressOnChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="fullAddress"
                              className="col-sm-2 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Fulll Address
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="fullAddress"
                                name="fullAddress"
                                value={permanentAddress.fullAddress}
                                onChange={permanentAddressOnChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="state"
                              className="col-sm-2 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              State
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="state"
                                name="state"
                                value={permanentAddress.state}
                                onChange={permanentAddressOnChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="districtCity"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              District/City
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                id="districtCity"
                                name="city"
                                value={permanentAddress.city}
                                onChange={permanentAddressOnChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="pinCode"
                              className="col-sm-2 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Pin Code
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="number"
                                className="form-control"
                                id="pinCode"
                                name="pinCode"
                                value={permanentAddress.pinCode}
                                onChange={permanentAddressOnChange}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {step === 4 && (
                      <>
                        <div className="card-body ">
                          <h4
                            className="mb-4 pb-2 pb-md-0 mb-md-5 text-center"
                            style={{ borderBottom: "1px solid black" }}
                          >
                            {" "}
                            <b>Joining Details</b>
                          </h4>
  
                          <div className="row mb-3">
                            <label
                              htmlFor="dateOfInterview"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Date of Interview
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="date"
                                className="form-control"
                                id="dateOfInterview"
                                name="dateOfInterview"
                                placeholder="Enter date of interview"
                                value={dateOfInterview}
                                onChange={(e) =>
                                  setDateOfInterview(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="dateOfJoining"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Date of Joining
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="date"
                                className="form-control"
                                id="dateOfJoining"
                                name="dateOfJoining"
                                placeholder="Enter date of joining"
                                value={dateOfJoining}
                                onChange={(e) => setDateOfJoining(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="companyName"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Company Name
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                id="companyName"
                                name="companyName"
                                placeholder="Enter company name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="department"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Department
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control text-secondary-emphasis fw-semibold"
                                id="department"
                                name="department"
                                placeholder="Enter department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="designation"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Designation
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control text-secondary-emphasis fw-semibold"
                                id="designation"
                                name="designation"
                                placeholder="Enter designation"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="employeeType"
                              className="col-sm-3 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Employee Type
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                id="employeeType"
                                name="employeeType"
                                placeholder="Enter employee type"
                                value={employeeType}
                                onChange={(e) => setEmployeeType(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="ModeOfRecruitment"
                              className="col-sm-4 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Mode Of Recruitment
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                className="form-control"
                                id="ModeOfRecruitment"
                                name="ModeOfRecruitment"
                                placeholder="Enter mode of recruitment"
                                value={modeOfRecruitment}
                                onChange={(e) =>
                                  setModeOfRecruitment(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="referenceName"
                              className="col-sm-4 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Reference/Consultency
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                className="form-control"
                                id="referenceName"
                                name="referenceName"
                                placeholder="Enter reference name"
                                value={referenceName}
                                onChange={(e) => setReferenceName(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {step === 5 && (
                      <>
                        <div className="card-body ">
                          <h4
                            className="mb-4 pb-2 pb-md-0 mb-md-5 text-center"
                            style={{ borderBottom: "2px solid black" }}
                          >
                            {" "}
                            <b> Bank Details </b>
                          </h4>
  
                          <div className="row mb-3">
                            <label
                              htmlFor="panNo"
                              className="col-sm-2 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              PAN No.
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="panNo"
                                name="panNo"
                                placeholder="Enter pan no"
                                value={panNo}
                                onChange={(e) => setPanNo(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="addharNo"
                              className="col-sm-2 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Aadhar No.
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="password"
                                className="form-control"
                                id="addharNo"
                                name="addharNo"
                                placeholder="Enter aadhar no"
                                value={aadharNo}
                                onChange={(e) => setAadharNo(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="bankName"
                              className="col-sm-2 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Bank Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="bankName"
                                name="bankName"
                                placeholder="Enter bank name"
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="accountNo"
                              className="col-sm-2 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Account No.
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="accountNo"
                                name="accountNo"
                                placeholder="Enter account no"
                                value={accountNo}
                                onChange={(e) => setAccountNo(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="ifscCode"
                              className="col-sm-2 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              IFSC Code
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="ifscCode"
                                name="ifscCode"
                                placeholder="Enter ifsc code"
                                value={ifscCode}
                                onChange={(e) => setIfscCode(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="branchAddress"
                              className="col-sm-2 col-form-label text-secondary-emphasis fw-semibold"
                            >
                              Branch Address
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="branchAddress"
                                name="branchAddress"
                                placeholder="Enter branch address"
                                value={bankBranch}
                                onChange={(e) => setBankBranch(e.target.value)}
                              />
                            </div>
                          </div>
                          <div>
                            <h6
                              className="text-center"
                              style={{
                                display: "inline-block",
                                borderBottom: "2px solid black",
                              }}
                            >
                              {" "}
                              <b>ESI and PF Details</b>
                            </h6>
                            <div className="row mb-3 mt-2">
                              <label
                                htmlFor="uanNo"
                                className="col-sm-2 col-form-label text-secondary-emphasis fw-semibold"
                              >
                                UAN No.
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="uanNo"
                                  name="uanNo"
                                  placeholder="Enter uan no"
                                  value={uanNo}
                                  onChange={(e) => setUanNo(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {step === 6 && (
                      <>
                        <div className="card-body ">
                          <h4 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center border_bottom">
                            {" "}
                            <b>
                              Contact Details in Case of Emergency
                              <br />
                              (Family Member Only)
                            </b>
                          </h4>
                          <div
                            className="row mb-3"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div style={{ flex: "1" }}>
                              <label
                                htmlFor="name"
                                className=" text-secondary-emphasis fw-semibold"
                              >
                                Name
                              </label>
                              <div>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  name="name"
                                  value={emergencyContact.name}
                                  onChange={emergencyContactOnChange}
                                />
                              </div>
                            </div>
                            <div style={{ flex: "1" }}>
                              <label
                                htmlFor="relation"
                                className=" text-secondary-emphasis fw-semibold"
                              >
                                Relation
                              </label>
                              <div>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="relation"
                                  name="relation"
                                  value={emergencyContact.relation}
                                  onChange={emergencyContactOnChange}
                                />
                              </div>
                            </div>
                            <div style={{ flex: "1" }}>
                              <label
                                htmlFor="e_address"
                                className=" text-secondary-emphasis fw-semibold"
                              >
                                Address
                              </label>
                              <div>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="e_address"
                                  name="address"
                                  value={emergencyContact.address}
                                  onChange={emergencyContactOnChange}
                                />
                              </div>
                            </div>
                            <div style={{ flex: "1" }}>
                              <label
                                htmlFor="contactNo"
                                className=" text-secondary-emphasis fw-semibold"
                              >
                                Contact Number
                              </label>
                              <div>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="contactNo"
                                  name="contactNo"
                                  value={emergencyContact.contactNo}
                                  onChange={emergencyContactOnChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <h4 className="mb-4 pb-2 pb-md-0 border_bottom text-center">
                            {" "}
                            <b>Photo And Declaration</b>
                          </h4>
                          <div>
                            <div className="mb-3">
                              <label
                                htmlFor="uploadPhoto"
                                className="form-label text-secondary-emphasis fw-semibold"
                              >
                                Upload Photo Here
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                id="uploadPhoto"
                                name="photo"
                                onChange={photoUploadOnChange}
                              />
                            </div>
                            <div>
                              <p>
                                <strong className="text-secondary-emphasis fw-semibold">
                                  Declaration:{" "}
                                </strong>
                                I hereby declare that the details furnished above
                                are true and correct to the best of my knowledge
                                and belief and I undertake to inform you of any
                                changes therein, immediately. In the case of the
                                above information is found to be false or untrue
                                or misleading or misrepresenting, I am aware that
                                I may be held liable for it.
                              </p>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="date"
                                className="col-sm-2 col-form-label text-secondary-emphasis fw-semibold"
                              >
                                Date :
                              </label>
                              <div className="col-sm-5">
                                <input
                                  type="date"
                                  className="form-control"
                                  id="date"
                                  name="date"
                                  value={date}
                                  onChange={(e) => setDate(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
  
  
                    <div className="d-flex justify-content-end mb-1 mx-1">
                      {step > 1 && (
                        <button
                          type="button"
                          className="btn btn-primary btn-lg mx-1"
                          onClick={handlePrevious}
                        >
                          Previous
                        </button>
                      )}
                      {step < 6 && (
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={handleNext}
                        >
                          {/* {step < 3 ? "Next" : " Part-2"} */}
                          Next
                        </button>
                      )}
                      {step === 6 && (
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={handleSubmit}
                        >
                         Submit
                        </button>
                       
                      )}
                            </div>
                            </div>
                            <div style={{ marginTop: '10px', position:"sticky", top:"43rem",zIndex:"997" }}>
            {message && <p className='alert alert-success'>{message}</p>}
          </div>

                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    );
}

export default JoiningForm1