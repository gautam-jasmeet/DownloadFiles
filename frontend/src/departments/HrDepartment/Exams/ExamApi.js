import React from 'react'
import axios from 'axios'


const API_URL = 'http://localhost:8080';


// Assign test paper to employee
export const assignTestPaper = async (employeeId, testPaperId) => {
    return await axios.post(`${API_URL}/assignTest`, {
      employeeId,
      testPaperId
    });
  };
  
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