import {useEffect,useState} from 'react'
import { submitTest } from './ExamApi'

function TestPage({employeeId,testId}) {
    const [answers, setAnswers] = useState({})

    const handleSubmit = async()=>{
      try{
        await submitTest(employeeId,testId,answers)
        alert("Test submitted successfully")
      }catch(error){
        console.error('Error submitting test:', error);
      }
    }

    const handleAnswerChange = (questionId,answer)=>{
      setAnswers({
        ...answers,
        [questionId]:answer
      })
    }

  return (
    <div>
      <h2>Test Paper</h2>
      {/* Render questions here */}
      <div>
        <label>Question 1:</label>
        <input
          type="text"
          onChange={(e) => handleAnswerChange(1, e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>Submit Test</button>
    </div>
  )
}

export default TestPage