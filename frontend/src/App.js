import { useContext} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
import Header from "./shared/Header";
import Dashboard from "./component/dashboard/Dashboard";
import HrHomePage from "./departments/hrDpartment/HrHomePage";
// import ItHomePage from "./departments/it/ItHomePage";
// import MarketingHP from "./departments/marketing/MarketingHP"; 
import StoreHP from "./departments/storeDepartment/StoreHP";
import Register from "./component/register/Register";
import Login from "./component/login/Login";
import Logout from "./component/logout/Logout";
import DepartmentDocuments from "./component/dashboard/DepartmentDocuments";
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
import Footer from "./shared/Footer";
import { AppContext } from "./appContext/AppContext";



function App() {
  const {department , designation} = useContext(AppContext);
  
  // const department = localStorage.getItem("department");
    // const  role = localStorage.getItem("designation");

  return (
    
    <Router>
      <Header/>

    <Routes>

    <Route path='/signup' element={<Register/>}></Route>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/logout' element={<Logout/>}></Route>

     {/* Admin Access */}
     {designation === "Admin" && (
      <>
       <Route path='/Admin' element={<Dashboard/>}></Route>
       <Route path="/Admin/:departmentName" element={<DepartmentDocuments />} />
      </>
     )}

     {/* Department Access */}
     {department === "HR" && (
       <Route path='/HR' element={<HrHomePage/>}></Route>
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
