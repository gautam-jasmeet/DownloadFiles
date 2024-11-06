import {createContext, useContext, useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";


// Creating a context
export const AppContext = createContext();

// Custom hook for accessing context 
// export const useAppContext = () =>useContext(AppContext)

export const AppProvider =({children}) => {
       const [token, setToken] = useState(localStorage.getItem("authToken"));
       const [designation, setDesignation] = useState(localStorage.getItem("designation"));
       const [department, setDepartment] = useState(localStorage.getItem("department"));
       const [employeeId, setEmployeeId] = useState(localStorage.getItem("employeeId"));

       // Sync localStorage with state whenever the state changes
       useEffect(()=>{
          if(token !== localStorage.getItem('authToken')){
               localStorage.setItem("authToken", token);
          }
          if(designation !== localStorage.getItem('designation')){
               localStorage.setItem("designation", designation);
          }
          if(department !== localStorage.getItem('department')){
               localStorage.setItem("department", department);
          }
          if(employeeId !== localStorage.getItem('employeeId')){
               localStorage.setItem("employeeId", employeeId);
          } 
       },[token,designation,department,employeeId]);

       // Logout function to clear context and localStorage
     //   const navigate = useNavigate();
     //   const logOut = ()=>{
     //      setToken(null);
     //      setDesignation(null);
     //      setDepartment(null);
     //      setEmployeeId(null);
     //      localStorage.clear();
     //      navigate('/')
     //   }

       return (
            <AppContext.Provider value={{
               token, setToken,
             designation, setDesignation,
              department, setDepartment,
             employeeId, setEmployeeId,
             }}>
                {children}
            </AppContext.Provider>
       )
}
