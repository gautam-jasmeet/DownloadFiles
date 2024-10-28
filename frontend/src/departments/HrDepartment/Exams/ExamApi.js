import React, { useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../../../appContext/AppContext';


const API_URL = 'http://localhost:8080';


// const {token} = useContext(AppContext)
// Assign test paper to employee
// export const assignTestPaper = async (employeeId, testPaperId) => {
//     // return await axios.post(`${API_URL}/assignTest`, {
//     //   employeeId,
//     //   testPaperId
//     // });
//     try{
//       const response = await axios.post(`${API_URL}/hr/assign-paper`,{
//         employeeId,
//         testPaperId},
//         {headers:{
//           Authorization:`Bearer ${token}`
//         }
//       }
      
//     )
//     }catch(err){
//       console.error(`Error assigning test paper`, err);
      
//     }
//   };
  
  // Get assigned tests for a specific employee
  export const getAssignedTests = async (employeeId) => {
    return await axios.get(`${API_URL}/assignedTests/${employeeId}`);
  };
  
  // Submit test
  export const submitTest = async (employeeId, testPaperId, answers) => {
    return await axios.post(`${API_URL}/submitTest`, {
      employeeId,
      testPaperId,
      answers
    });
  };