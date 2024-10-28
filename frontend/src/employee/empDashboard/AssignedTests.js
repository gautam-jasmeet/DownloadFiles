import React, { useEffect,useState } from 'react'
import { getAssignedTests } from '../../departments/HrDepartment/Exams/ExamApi'
import axios from 'axios'

function AssignedTests({employeeId}) {
    const [assignedTests,setAssignedTests] = useState([])
    useEffect(()=>{
        //// fetching the test of loggedIn employee
        const fetchTests = async()=>{
            const response = await getAssignedTests(employeeId)
            setAssignedTests(response.data)
        }
        fetchTests()
    },[employeeId])
  return (
    <div>
    <h2>Assigned Tests</h2>
    <ul>
      {assignedTests.map((test) => (
        <li key={test.testPaperId}>
          {test.title} - Status: {test.status}
          <button onClick={() => window.location.href = `/test/${test.testPaperId}`}>Start Test</button>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default AssignedTests