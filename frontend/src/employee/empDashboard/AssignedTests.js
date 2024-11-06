import React, { useContext, useEffect,useState } from 'react'
// import { getAssignedTests } from '../../departments/HrDepartment/Exams/ExamApi'
// import useGet from '../../customHooks/useGet'
import axios from 'axios'
import { AppContext } from '../../appContext/AppContext'
import Questions from './assignedTests/Questions'

function AssignedTests() {
  const [testPaper, setTestPaper] = useState()
  const [selectedAnswers,setSelectedAnswers] = useState({})
  const [score, setScore] = useState({correct:0,incorrect :0 });
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
  // console.log(testPaper);

  const handleOptionChange  = (questionNo,selectedOptionIndex)=>{
    setSelectedAnswers((prevAnswer)=>({
      ...prevAnswer,
      [questionNo]:selectedOptionIndex   // Store selected option as a direct value
    }))
    // console.log(questionNo,selectedOptionIndex);
  }
  
 ///// Calculating score
 const calculateScore = ()=>{
  let correct = 0;
  let incorrect = 0;

  testPaper.data.Papers.forEach((paper)=>{
    paper.Questions.forEach((question)=>{
      const selectedAnswer = selectedAnswers[question.questionNo];
      const correctAnswer = parseInt(question.correctOption,10) 
      if(selectedAnswer === correctAnswer){
        correct += 1;
      }else if(selectedAnswer !== undefined){
        incorrect += 1;
      }
    })
  })    
setScore({correct,incorrect})

}

    
  return (
    <div className='container mt-2 m-4'> 
   {testPaper ? (testPaper.data.Papers.map((paper)=>(
    <div key={paper.PaperId}> 
    <h4 className='text-center'>Test Paper : {paper.PaperId}</h4>
    {console.log(paper)
    }
     {paper.Questions.map((question)=>(
      <div key={question.questionNo}>
      <p>Q{question.questionNo}: {question.questionText}</p>
      {question.questionImg && (
        <img
          src={`${baseURL}${question.questionImg}`}
          alt={`Question${question.questionNo}`}
          className="img-fluid mb-2"
          style={{ maxHeight: '200px', objectFit: 'contain' }}
        />
      )}
       <ul className="list-unstyled ms-3">
       {['option1text', 'option2text', 'option3text', 'option4text'].map((option,index)=>(
        <li key={option}>
          <input type='radio'
            name={`question${question.questionNo}`}
            checked ={selectedAnswers[question.questionNo] === index +1 }
           onChange={()=>handleOptionChange(question.questionNo, index + 1,question.correctOption)}
           />
           {index + 1}. {question.options[option]}
              {question.options[`${option}img`] && (
                <img
                src={`${baseURL}${question.options[`${option}img`]}`}
                alt={`Option Image - ${index + 1}`}
                className="img-fluid "
                style={{ maxHeight: '200px', height: '150px', width: "150px", objectFit: 'contain' }}
                />
              )}
              </li>
       ))}
             
          </ul>
</div>
      ))} 
    </div>
    ))
  ):(
      <p>Loding ...</p>
    )}
     <button onClick={calculateScore} className="btn btn-primary mt-3">Submit </button>
     {score.correct + score.incorrect > 0 && (
      <div className='p-5'>
        <p>Correct Attempts: {score.correct}</p>
        <p>Incorrect Attempts: {score.incorrect}</p>
      </div>
     )}
  </div>
  )
}

export default AssignedTests