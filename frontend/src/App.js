import { useContext} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
import Header from "./shared/Header";
import Dashboard from "./admin/dashboard/Dashboard";

// import ItHomePage from "./departments/it/ItHomePage";
// import MarketingHP from "./departments/marketing/MarketingHP"; 
import StoreHP from "./departments/storeDepartment/StoreHP";
import Register from "./component/register/Register";
import Login from "./component/login/Login";
import Logout from "./component/logout/Logout";
import DepartmentDocuments from "./admin/department/DepartmentDocuments";
import ProductionHP from "./departments/Production/ProductionHP";
import MachineHP from "./departments/Machine/MachineHP";
import MentainanceHP from "./departments/Mentainance/MentainanceHP";
import SopHP from "./departments/SOP/SopHP";
import LogisticHP from "./departments/Logistic/LogisticHP";
import CalibrationHP from "./departments/Calibration/CalibrationHP";
import EhsHP from "./departments/EHS/EhsHP";
import QualityHP from "./departments/Quality/QualityHP";
import FocHP from "./departments/FOC/FocHP";
import IocHP from "./departments/IOC/IocHP";
import IpocHP from "./departments/IPOC/IpocHP";
// import Footer from "./shared/Footer";
import { AppContext } from "./appContext/AppContext";
import HrHomePage from "./departments/HrDepartment/HrDashboard/HrHomePage";
import JoiningForm1 from "./departments/HrDepartment/JoiningForm/JoiningForm1";
// import JoiningForm2 from "./departments/HrDepartment/JoiningForm/JoiningForm2";
// import Employee from "./departments/HrDepartment/Employee Details/Employee";
import EmpDashboard from "./employee/empDashboard/EmpDashboard";
import PersonalDatail from "./employee/PersonalDatail";
import Training from "./departments/HrDepartment/Training/Training";
import Exams from "./departments/HrDepartment/Exams/Exams";
import Performance from "./departments/HrDepartment/Performance/Performance";
import FileUpload from "./departments/sharedDept/FileUpload";
import EmployeeList from "./departments/HrDepartment/Employee Details/Employee1";
// import Employee from "./departments/HrDepartment/Employee Details/Employee";
import TrainingVideo from "./employee/TrainingVideo";
import AdEmployee from "./admin/employee/AdEmployee";






function App() {
  const {department , designation} = useContext(AppContext);
  
  // console.log("designation:",designation);
  


  return (
    
    <Router>
      <Header/>

    <Routes>

    <Route path='/signup' element={<Register />}></Route>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/logout' element={<Logout/>}></Route>

     {/* Admin Access */}
     {designation === "Admin" && (
      <>
       <Route path='/Admin' element={<Dashboard/>}></Route>
       <Route path="/Admin/:departmentName" element={<DepartmentDocuments />} />
       {/* <Route path="/Admin/Emp" element={<AdEmployee />} /> */}

       
      </>
     )}

     {/* Employee Access */}
     {designation === "Worker" &&(
      <>
       <Route path='/Worker' element={<EmpDashboard/>}>
       <Route path='personal' element={<PersonalDatail/>}></Route>
       <Route path='documents' element={<FileUpload/>}></Route>
       <Route path='tvideo' element={<TrainingVideo/>}></Route>
       </Route>
      </>
     )

     }

     {/* Department Access */}
     {department === "HR" && (
      <>
       <Route path='/HR' element={<HrHomePage/>}>
       <Route path="jform" element={<JoiningForm1/>}></Route>
       <Route path="documents" element={<FileUpload/>}></Route>
       <Route path="emp" element={<EmployeeList/>}></Route>
       {/* <Route path="emp" element={<Employee/>}></Route> */}
       <Route path="training" element={<Training/>}></Route>
       <Route path="exam" element={<Exams/>}></Route>
       <Route path="performance" element={<Performance/>}></Route>
       </Route>
       </>
     )}
    
    {department === "Store" && (
    <Route path='/Store' element={<StoreHP/>}></Route>
    )}
    {department === "Production" && (
    <Route path='/Production' element={<ProductionHP/>}></Route>
    )}
    {department === "Machine" && (
    <Route path='/Machine' element={<MachineHP/>}></Route>
    )}
    {department === "Maintance" && (
    <Route path='/Maintance' element={<MentainanceHP/>}></Route>
    )}
    {department === "SOP|WI" && (
    <Route path='/SOP-WI' element={<SopHP/>}></Route>
    )}
    {department === "Logistics" && (
    <Route path='/Logistics' element={<LogisticHP/>}></Route>
    )}
    {department === "Calibration" && (
    <Route path='/Calibration' element={<CalibrationHP/>}></Route>
    )}
    {department === "EHS" && (
    <Route path='/EHS' element={<EhsHP/>}></Route>
    )}
    {department === "Quality" && (
    <Route path='/Quality' element={<QualityHP/>}></Route>
    )}
    {department === "FQC" && (
    <Route path='/FQC' element={<FocHP/>}></Route>
    )}
    {department === "IQC" && (
    <Route path='/IQC' element={<IocHP/>}></Route>
    )}
   
    {department === "IPQC" && (
    <Route path='/IPQC' element={<IpocHP/>}></Route>
    )}
   
    {/* Default route */}
    {/* <Route path="*" element={<NotFound />} /> */}
    </Routes >
    {/* <Footer /> */}
    </Router>
    
  );
}


// Component for 404 Not Found
// function NotFound() {
//   return <div>Page Not Found</div>;
// }

export default App;
