import React, { useContext, useEffect,useState } from 'react'
// import { getAssignedTests } from '../../departments/HrDepartment/Exams/ExamApi'
// import useGet from '../../customHooks/useGet'
import axios from 'axios'
import { AppContext } from '../../appContext/AppContext'
import Questions from './assignedTests/Questions'

function AssignedTests() {
  const [testPaper, setTestPaper] = useState()
  const [options,setOptions] = useState([])
       const {token,employeeId} = useContext(AppContext)
       const baseURL = `http://srv617987.hstgr.cloud:8080`
//  const {data:testPaper,loading,error} = useGet(`http://srv617987.hstgr.cloud:8080/hr/assign-paper/001`)
//  console.log(testPaper);
 
  
useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get(`${baseURL}/hr/assign-paper/${employeeId}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        if(response.status === 200){
          setTestPaper(response.data)
        }else{
          console.log("Somthing wrong going with feetching data");
          
        }

      }catch(err){
        console.error("Data fetching error",err);
        
      }
    }
    fetchData();
  },[token])
  console.log(testPaper);

  const handleSubmit = ()=>{
    console.log();
    
  }
  

    
  return (
    <div className='container'> 
   {testPaper ? (testPaper.data.Papers.map((paper)=>(
    <div key={paper.PaperId}> 
    <h4 className='text-center'>Test Paper : {paper.PaperId}</h4>
     {paper.Questions.map((question)=>(
      <>
      <p>Q{question.questionNo}: {question.questionText}</p>
      {question.questionImg && (
        <img
          src={`${baseURL}${question.questionimg}`}
          alt={`Question${question.questionNo}`}
          className="img-fluid mb-2"
          style={{ maxHeight: '200px', objectFit: 'contain' }}
        />
      )}
       <ul className="list-unstyled ms-3">
       
            <li> <input type='checkbox'
             id='option1text' 
            name='option1text'
            value={question.options.option1text} /> 1. {question.options.option1text}
              {question.options.option1img && (
                <img
                  src={`${baseURL}${question.options.option1img}`}
                  alt='Option Image - 1'
                  className="img-fluid "
                  style={{ maxHeight: '200px', height: '150px', width: "150px", objectFit: 'contain' }}
                />
              )}
            </li>
           
            <li> <input type='checkbox'
             id='option1text' 
            name='option1text'
            value={question.options.option1text}/> 2. {question.options.option2text }
              {question.options.option2img && (
                <img
                  src={`${baseURL}${question.options.option2img}`}
                  alt='Option Image - 2 '
                  className="img-fluid "
                  style={{ maxHeight: '200px', height: '150px', width: "150px", objectFit: 'contain' }}
                />
              )}
            </li>
            <li> <input type='checkbox'
             id='option1text' 
            name='option1text'
            value={question.options.option1text}/> 3. {question.options.option3text }
              {question.options.option3img && (
                <img
                  src={`${baseURL}${question.options.option3img}`}
                  alt='Option Image - 3 '
                  className="img-fluid "
                  style={{ maxHeight: '200px', height: '150px', width: "150px", objectFit: 'contain' }}
                />
              )}
            </li>
            <li> <input type='checkbox'
             id='option1text' 
            name='option1text'
            value={question.options.option1text}/> 4. {question.options.option4text }
              {question.option4img && (
                <img
                  src={`${baseURL}${question.options.option4img}`}
                  alt='Option Image - 4 '
                  className="img-fluid "
                  style={{ maxHeight: '200px', height: '150px', width: "150px", objectFit: 'contain' }}
                />
              )}
            </li>
          </ul>
</>
      ))} 
    </div>
    ))):(
      <p>Loding ...</p>
    )}
     
  </div>
  )
}

export default AssignedTests