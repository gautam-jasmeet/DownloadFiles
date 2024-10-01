import {useState} from 'react'

function JoiningForm2() {
    const [step, setStep] = useState(1);
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
  
    // Function to handle Next button
    const handleNext = () => {
      setStep(step + 1);
    };
    // Function to handle Previous button
    const handlePrevious = () => {
      setStep(step - 1);
    };
  
    // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();

      // const formData = new FormData();
      // formData.append("full_name",fullName);
      
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
      setPhoto(e.target.photo);
    };
    return (
      <div className="gradient-custom">
        <form onSubmit={handleSubmit}>
          <section>
            <div className="container py-5 h-100 ">
              <div className="row justify-content-center align-items-center h-100">
                <div className="col-12 col-lg-9 col-xl-7 ">
                  <h2
                    className="text-center mb-2 fw-semibold"
                    style={{
                      display: "inline-block",
                      borderBottom: "3px solid ",
                    }}
                  >
                    Part 2
                  </h2>
                  <div
                    className="card shadow-2-strong card-registration  "
                    style={{ bordeRradius: " 15px" }}
                  >
                    {step === 1 && (
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
                    {step === 2 && (
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
                    {step === 3 && (
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
                                htmlFor="contactNo"
                                className=" text-secondary-emphasis fw-semibold"
                              >
                                Address
                              </label>
                              <div>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="contactNo"
                                  name="contactNo"
                                  value={emergencyContact.contactNo}
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
                                name="uploadPhoto"
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
                      {step < 3 && (
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={handleNext}
                        >
                          Next
                        </button>
                      )}
                      {step === 3 && (
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    );
}

export default JoiningForm2