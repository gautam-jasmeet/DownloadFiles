import React, { useContext, useEffect, useState } from 'react'
import useGet from '../../../customHooks/useGet';
import axios from 'axios';
import { AppContext } from '../../../appContext/AppContext';
// let assignTestPaper ; /// this is api u have to fetch it

async function assignTestPaper(employeeId,paperId,token){
    
    try{
        const response = await axios.post("http://srv617987.hstgr.cloud:8080/hr/assign-paper",{
            employeeId,paperId
        },{hearders:{
            Authorization:`Bearer ${token}`

        }})
        if(response.status === 201){
            console.log("Test paper assygn  successfully to empl.");
            
        }
    }catch(err){
        console.error("Error in assigning", err);
        
    }

}

function AssignTest() {
    // const [employees,setEmployees] = useState([])
    // const [testPapers, setTestPapers] = useState([])
    const [selectedEmployee,setSelectedEmployee] = useState('')
    const [selectedTestPaper,setSelectedTestPaper] = useState('')

    const {token} = useContext(AppContext)

   
    const {data:employees ,loading: loadingEmployees, error: errorEmployees } = useGet("http://srv617987.hstgr.cloud:8080/joining/");

    const { data:testPapers, loading: loadingTestPapers, error:errorTestPapers } = useGet('http://srv617987.hstgr.cloud:8080/hr/get-question-paper');
    
// console.log(employees);

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
            {employees?.map((emp)=>(
                <option key={emp.id} value={emp.id}>{emp.employeeID}</option>
            ))}
        </select>
        <label>Test Paper :</label>
        <select onChange={(e)=>setSelectedTestPaper(e.target.value)}>
        <option value=''>Select test paper</option>
                {errorTestPapers ? (
                    <option disabled>Error loading test papers</option>
                ) : (
                    Array.isArray(testPapers?.data) && testPapers.data.length > 0 ? (
                        testPapers.data.map((test) => (
                            <option key={test.PaperId} value={test.PaperId}>{test.PaperId}</option>
                        ))
                    ) : (
                        <option disabled>No test papers available</option>
                    )
                )}
        </select>
        <button onClick={handleAssign}>Assign Test</button>
    </div>
  )
}

export default AssignTest