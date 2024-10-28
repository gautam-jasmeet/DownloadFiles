import React, { useEffect, useState } from 'react'
let assignTestPaper ; /// this is api u have to fetch it

function AssignTest() {
    const [employees,setEmployees] = useState([])
    const [testPapers, setTestPapers] = useState([])
    const [selectedEmployee,setSelectedEmployee] = useState('')
    const [selectedTestPaper,setSelectedTestPaper] = useState('')

    useEffect(()=>{
         // Fetch employees and test papers from the backend
    // fetchEmployees();
    // fetchTestPapers();
    },[])

    const fetchEmployees =()=>{
        // api
        setEmployees([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }])
    }
    const fetchTestPapers =()=>{
        // api
        setTestPapers([{ id: 101, title: 'Math Test' }, { id: 102, title: 'Science Test' }])
    }

    const handleAssign= async()=>{
        if(selectedEmployee && selectedTestPaper){
            try{
                await assignTestPaper(selectedEmployee,selectedTestPaper)
                alert('Test paper assigned successfully')
            }catch(error){
                console.error('Error assigning test:', error);
                
            }
        }else{
            alert('Please select both employee and test paper');
        }

    }


  return (
    <div>
        <h2>Assign Test Paper </h2>
        <label>Employee :</label>
        <select onChange={(e)=>setSelectedEmployee(e.target.value)}>
            <option value=''>Select employee</option>
            {employees.map((emp)=>(
                <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
        </select>
        <label>Test Paper :</label>
        <select onChange={(e)=>setSelectedTestPaper(e.target.value)}>
            <option value=''>Select test paper</option>
            {testPapers.map((test)=>(
                <option key={test.id} value={test.id}>{test.title}</option>
            ))}
        </select>
        <button onClick={handleAssign}>Assign Test</button>
    </div>
  )
}

export default AssignTest