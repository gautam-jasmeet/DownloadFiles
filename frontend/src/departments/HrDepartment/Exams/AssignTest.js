import React, { useContext, useEffect, useState } from 'react'
import useGet from '../../../customHooks/useGet';
import axios from 'axios';
import { AppContext } from '../../../appContext/AppContext';
// let assignTestPaper ; /// this is api u have to fetch it

async function assignTestPaper(employeeId,paperId,token,setSuccessMessage,setError){
    
    try{
        const response = await axios.post("http://srv617987.hstgr.cloud:8080/hr/assign-paper",{
            employeeId,paperId
        },{hearders:{
            Authorization:`Bearer ${token}`

        }})
        if(response.status === 201){
           setSuccessMessage(`Test paper -${paperId} assign  successfully to employee - ${employeeId}.`);  
        }
        else{
            setError(`Fail to assign Test paper -${paperId} to employee - ${employeeId}.`)
        }
    }catch(err){
        console.error("Error in assigning", err);
        setError("Error in assigning", err)
        
    }

}

function AssignTest() {
    // const [employees,setEmployees] = useState([])
    // const [testPapers, setTestPapers] = useState([])
    const [selectedEmployee,setSelectedEmployee] = useState('')
    const [selectedTestPaper,setSelectedTestPaper] = useState('')
    const [successMessage,setSuccessMessage] = useState('')
    const [error,setError] = useState('')

    const {token} = useContext(AppContext)

   
    const {data:employees ,loading: loadingEmployees, error: errorEmployees } = useGet("http://srv617987.hstgr.cloud:8080/joining/");

    const { data:testPapers, loading: loadingTestPapers, error:errorTestPapers } = useGet('http://srv617987.hstgr.cloud:8080/hr/get-question-paper');
    
// console.log(employees);

    const handleAssign= async()=>{
        if(selectedEmployee && selectedTestPaper){
            try{
                await assignTestPaper(selectedEmployee,selectedTestPaper,token,setError,setSuccessMessage)
                // alert('Test paper assigned successfully')
                // setSuccessMessage('Test paper assigned successfully')
                setSelectedEmployee('')
                setSelectedTestPaper('')
                
            }catch(error){
                console.error('Error assigning test:', error);
                setError('Error assigning test:', error)
                
            }
        }else{
            alert('Please select both employee and test paper');
        }

    }


  return (
    <div>
        <h3 className='text-center m-2  mb-4'> <b className="border-bottom border-dark border-2">
        Assign Test Paper</b> </h3>
        <label className='m-2'>Employee :</label>
        <select onChange={(e)=>setSelectedEmployee(e.target.value)}>
            <option value=''>Select employee</option>
            {employees?.map((emp)=>(
                <option key={emp.id} value={emp.employeeID}>{emp.employeeID} {emp.full_name}</option>
            ))}
        </select>
        <label className='m-2'>Test Paper :</label>
        <select onChange={(e)=>setSelectedTestPaper(e.target.value)}>
        <option value=''>Select test paper</option>
                {errorTestPapers ? (
                    <option disabled>Error loading test papers</option>
                ) : (
                    Array.isArray(testPapers?.data) && testPapers.data.length > 0 ? (
                        testPapers.data.map((test) => (
                            <option key={test.PaperId} value={test.PaperId}>{test.PaperId} {test.Department}</option>
                        ))
                    ) : (
                        <option disabled>No test papers available</option>
                    )
                )}
        </select>
        <button 
        className='m-2'
        onClick={handleAssign}
        >
            Assign Test
            </button>
            <div>
                {successMessage && <p  className='alert alert-success bg-success-subtle'>{successMessage}</p>}
                {error && <p  className='alert alert-danger'>{error}</p>}
            </div>
    </div>
  )
}

export default AssignTest