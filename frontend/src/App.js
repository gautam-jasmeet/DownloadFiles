import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./shared/Header";
import Dashboard from "./admin/dashboard/Dashboard";
import EmpDashboard from "./employee/empDashboard/EmpDashboard";
import HrHomePage from "./departments/HrDepartment/HrDashboard/HrHomePage";
import Login from "./component/login/Login";
import Logout from "./component/logout/Logout";
import Register from "./component/register/Register";
import DepartmentDocuments from "./admin/department/DepartmentDocuments";
import ProductionHP from "./departments/Production/ProductionHP";
import MachineHP from "./departments/Machine/MachineHP";
import MentainanceHP from "./departments/Mentainance/MentainanceHP";
import SopHP from "./departments/SOP/SopHP";
import LogisticHP from "./departments/Logistic/LogisticHP";
import CalibrationHP from "./departments/Calibration/CalibrationHP";
import EhsHP from "./departments/EHS/EhsHP";
import StoreHP from "./departments/storeDepartment/StoreHP";
// import HrHomePage from "./departments/HrDepartment/HrDashboard/HrHomePage";
import JoiningForm1 from "./departments/HrDepartment/JoiningForm/JoiningForm1";
import EmployeeList from "./departments/HrDepartment/Employee Details/Employee1";
import Training from "./departments/HrDepartment/Training/Training";
import Exams from "./departments/HrDepartment/Exams/Exams";
import Performance from "./departments/HrDepartment/Performance/Performance";
import FileUpload from "./departments/sharedDept/FileUpload";
import TrainingVideo from "./employee/TrainingVideo";
import QualityDashboard from "./departments/Quality/QualityDashboard/QualityDashboard";
import QualityFileUpload from "./departments/Quality/SharedQualityDept/QualityFileUpload";
import Quality from "./departments/Quality/QualityHead/Quality";
import Fqc from "./departments/Quality/FQC/Fqc";
import Ipqc from "./departments/Quality/IPQC/Ipqc";
import Iqc from "./departments/Quality/IQC/Iqc";
import ExamPapers from "./departments/HrDepartment/Exams/ExamPapers";
import TestPaperForm from "./departments/HrDepartment/Exams/TestPaperForm";
import AssignTest from "./departments/HrDepartment/Exams/AssignTest";
import AssignedTests from "./employee/empDashboard/AssignedTests";
import TestPage from "./departments/HrDepartment/Exams/TestPage";
import PrivateRoute from "./component/routes/PrivateRoute";
import PersonalDatail from "./employee/PersonalDatail";
import { AppContext } from "./appContext/AppContext";

function App() {
  const { department, designation, token, setToken } = useContext(AppContext);

  useEffect(()=>{
      // Clearing token on initial load to ensure login is always the first page
    setToken(null)
  },[setToken])
  const getDashboardRoute = () => {
    if (designation === "Admin") return <Dashboard />;
    if (designation === "Worker") return <EmpDashboard />;
    if (department === "HR") return <HrHomePage />;
    return <Navigate to="/login" />;
  };

  return (
    <Router>
      <Header />
      <Routes>

        <Route path='/signup' element={
          <PrivateRoute>
            <Register />
          </PrivateRoute>
        }>
        </Route>
        {/* <Route path='assignedTests' element={<PrivateRoute> <AssignedTests /> </PrivateRoute>}></Route> */}
        
        <Route path='/' element={token ? <Navigate to="/dashboard" /> : <Login />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/test/:testPaperId' element={<TestPage />}></Route>

        {designation === "Admin" && (
          <>
            <Route path='/Admin' element={<PrivateRoute> <Dashboard /> </PrivateRoute>}>
            <Route path="/Admin/:departmentName" element={<PrivateRoute> <DepartmentDocuments /> </PrivateRoute>} />
            </Route>
          </>
        )}

        {designation === "Worker" && (
          <>
            <Route path='/Worker' element={<PrivateRoute> <EmpDashboard /> </PrivateRoute>}>
              <Route path='personal' element={<PrivateRoute> <PersonalDatail /> </PrivateRoute>}></Route>
              <Route path='documents' element={<PrivateRoute> <FileUpload /> </PrivateRoute>}></Route>
              <Route path='tvideo' element={<PrivateRoute> <TrainingVideo /> </PrivateRoute>}></Route>
              {/* <Route path='assignedTests' element={<PrivateRoute> <AssignedTests /> </PrivateRoute>}></Route> */}
            </Route>
              <Route path='/assignedTests' element={<PrivateRoute> <AssignedTests /> </PrivateRoute>}></Route>
          </>
        )}

        {department === "HR" && (
          <>
            <Route path='/HR' element={<PrivateRoute> <HrHomePage /> </PrivateRoute>}>
              <Route path="jform" element={<PrivateRoute> <JoiningForm1 /> </PrivateRoute>}></Route>
              <Route path="documents" element={<PrivateRoute> <FileUpload /> </PrivateRoute>}></Route>
              <Route path="emp" element={<PrivateRoute> <EmployeeList /> </PrivateRoute>}></Route>
              <Route path="training" element={<PrivateRoute> <Training /> </PrivateRoute>}></Route>
              <Route path="createExamPapers" element={<PrivateRoute> <ExamPapers /> </PrivateRoute>}></Route>
              <Route path="assign" element={<PrivateRoute> <AssignTest /> </PrivateRoute>}></Route>
              <Route path="examPapers" element={<PrivateRoute> <TestPaperForm /> </PrivateRoute>}></Route>
              <Route path="performance" element={<PrivateRoute> <Performance /> </PrivateRoute>}></Route>
            </Route>
          </>
        )}

        {department === "Quality" && (
          <Route path='/Quality' element={<PrivateRoute> <QualityDashboard /> </PrivateRoute>}>
            <Route path='QualityFile' element={<PrivateRoute> <QualityFileUpload /> </PrivateRoute>}></Route>
            <Route path='QualityHead' element={<PrivateRoute> <Quality /> </PrivateRoute>}></Route>
            <Route path='FQC' element={<PrivateRoute> <Fqc /> </PrivateRoute>}></Route>
            <Route path='IQC' element={<PrivateRoute> <Iqc /> </PrivateRoute>}></Route>
            <Route path='IPQC' element={<PrivateRoute> <Ipqc /> </PrivateRoute>}></Route>
          </Route>
        )}
        
        {department === "Store" && (
          <Route path='/Store' element={<PrivateRoute> <StoreHP /> </PrivateRoute>}></Route>
        )}
        {department === "Production" && (
          <Route path='/Production' element={<PrivateRoute> <ProductionHP /> </PrivateRoute>}></Route>
        )}
        {department === "Machine" && (
          <Route path='/Machine' element={<PrivateRoute> <MachineHP /> </PrivateRoute>}></Route>
        )}
        {department === "Maintance" && (
          <Route path='/Maintance' element={<PrivateRoute> <MentainanceHP /> </PrivateRoute>}></Route>
        )}
        {department === "SOP|WI" && (
          <Route path='/SOP-WI' element={<PrivateRoute> <SopHP /> </PrivateRoute>}></Route>
        )}
        {department === "Logistics" && (
          <Route path='/Logistics' element={<PrivateRoute> <LogisticHP /> </PrivateRoute>}></Route>
        )}
        {department === "Calibration" && (
          <Route path='/Calibration' element={<PrivateRoute> <CalibrationHP /> </PrivateRoute>}></Route>
        )}
        {department === "EHS" && (
          <Route path='/EHS' element={<PrivateRoute> <EhsHP /> </PrivateRoute>}></Route>
        )}
        
        <Route path="/dashboard" element={<PrivateRoute>{getDashboardRoute()}</PrivateRoute>} />
        
      </Routes>
    </Router>
  );
}

export default App;
