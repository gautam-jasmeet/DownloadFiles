import {createContext, useEffect,useState} from "react";


// Creating a context
export const AppContext = createContext();

export const AppProvider =({children}) => {
       const [token, setToken] = useState(localStorage.getItem("authToken"));
       const [designation, setDesignation] = useState(localStorage.getItem("designation"));
       const [department, setDepartment] = useState(localStorage.getItem("department"));
       const [employeeId, setEmployeeId] = useState(localStorage.getItem("employeeId"));

       useEffect(()=>{
        // Sync localStorage with state whenever the state changes
        localStorage.setItem("authToken", token);
        localStorage.setItem("designation", designation);
        localStorage.setItem("department", department);
        localStorage.setItem("employeeId", employeeId);
       },[token,designation,department,employeeId]);

       return (
            <AppContext.Provider value={{token, setToken,
             designation, setDesignation, department, setDepartment,
             employeeId, setEmployeeId,}}>
                {children}
            </AppContext.Provider>
       )
}
