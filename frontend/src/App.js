import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./shared/Header";
import Dashboard from "./component/dashboard/Dashboard";
import HrHomePage from "./departments/hrDpartment/HrHomePage";
import ItHomePage from "./departments/it/ItHomePage";
import MarketingHP from "./departments/marketing/MarketingHP";
import StoreHP from "./departments/storeDepartment/StoreHP";
import Register from "./component/register/Register";
import Login from "./component/login/Login";
import Logout from "./component/logout/Logout";



function App() {
  const depart = localStorage.getItem("department");
  const  role = localStorage.getItem("designation");
  console.log(role);
  
  return (
    <>
    <Router>
      <Header/>

    <Routes>

    <Route path='/signup' element={<Register/>}></Route>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/logout' element={<Logout/>}></Route>

     {/* Admin Access */}
     {role === "Admin" && (
      <>
       <Route path='/Admin' element={<Dashboard/>}></Route>
       <Route path='/HR' element={<HrHomePage/>}></Route>
       <Route path='/Store' element={<StoreHP/>}></Route>
      </>
     )}

     {/* Department Access */}
     {depart === "HR" && (
       <Route path='/HR' element={<HrHomePage/>}></Route>
     )}
    
    {depart === "Store" && (

    <Route path='/Store' element={<StoreHP/>}></Route>
    )}
   
    </Routes>
    </Router>
    
   
    </>
  );
}

export default App;
