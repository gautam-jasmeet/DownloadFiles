import React, { useState,useContext } from "react";
import axios from 'axios';
import {AppContext} from "../../../appContext/AppContext"

const TestPaperForm = () => {
  const [testName, setTestName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const departments =["HR","Store","Production","Machine","Maintance","SOP|WI","Logistics",
    "Quality","Calibration","FQC","IQC","IPQC","EHS"]

    const {token} = useContext(AppContext)


  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', image: '', options: [{ text: '', image: '' },{ text: '', image: '' },
      { text: '', image: '' },{ text: '', image: '' }
    ],correctAnswer: ''  }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex,oIndex,field,value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex][field]=value;
    setQuestions(updatedQuestions);
  };

   // handle the selection of currect answer
   const handleCurrectAnswerChange =(qIndex,value)=>{
    const updatedQuestions =[...questions];
    updatedQuestions[qIndex].correctAnswer = value;
    setQuestions(updatedQuestions);
  }
  

  const handleSubmit = async(e) => {
    e.preventDefault()
    // console.log("Final Paper Submitted", { selectedDepartment, questions });

    const formData = new FormData()
    formData.append('paperId',testName)
    formData.append('department',selectedDepartment)
    formData.append('questionNo',questionNumber)
    questions.forEach((que,index)=>{
      // formData.append('questionNo',`${index + 1}`)
      formData.append('correctOption',que.correctAnswer)
      if(que.text){
        formData.append('question',que.text )
      };
      if(que.image){
        formData.append('questionImg', que.image)
      };

      que.options.forEach((option,optIndex)=>{
        if(option.text){
          formData.append(`option${optIndex + 1}`,option.text)
        };
        if(option.image){
          formData.append(`option${optIndex + 1}Img`, option.image)
        }
      })
       

    })

    try{
        const response = await axios.post('http://srv617987.hstgr.cloud:8080/hr/create-question-paper',formData,
            {
                headers:{
                    Authorization:`Bearer${token}`
                }
            }
    )
    console.log(response);
    
    }catch(err){
        console.error("Error",err);
        
    }

  };

  return (
    <div className="container mt-5">
    {!previewMode ? (
      <>
        <h3 className="text-center mb-4"> <b className="border-bottom border-dark border-2">
          Generate Test Paper </b></h3>
        <div className="mb-3">
        <label className="form-label" >Test Name :</label>
      <input
        type="text"
        className="form-control"
        value={testName}
        onChange={(e) => setTestName(e.target.value)}
        required
      />
      </div>
        <div className="mb-3">
        <label className="form-label">Department : </label>
          <select
           className="form-select"
          value={selectedDepartment}
          onChange={(e)=>setSelectedDepartment(e.target.value)}
          >
              <option value=""> Select Department</option>
             {departments.map((dept,index)=>(
               <option key={index} value={dept}>{dept}</option>
             ))}
          </select>
     
      </div>
        {questions.map((question, qIndex) => (
          <div  className="card mb-4" key={qIndex}>
            <div className="card-body">
            <label  className="form-label ">Question Number</label>
            <input
             className="form-control mb-3"
              value={questionNumber}
              placeholder="Enter question Number"
              onChange={(e) => setQuestionNumber( e.target.value)}
            />
            {/* <label  className="form-label ">Question {qIndex + 1}</label> */}
            <label  className="form-label ">Question </label>
            <textarea
             className="form-control mb-3"
              value={question.text}
              placeholder="Enter question text"
              onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
            />
            <div className="mb-3">
            <label className="form-label">Upload Question Image (optional) :</label>
            <input
            className="form-control"
              type="file"
              onChange={(e) => handleQuestionChange(qIndex, 'image', e.target.files[0])}
            />
            </div>
          
           
            <label  className="form-label ">Options :</label>
            {question.options.map((option, oIndex) => (
              <div className="mb-3" key={oIndex}>
                <label>{oIndex+1}.</label>
                <textarea
                 className="form-control mb-2"
                  value={option.text}
                  placeholder={`Option ${oIndex + 1}`}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, 'text', e.target.value)}
                />
                <input
                className="form-control"
                  type="file"
                  onChange={(e) => handleOptionChange(qIndex, oIndex, 'image', e.target.files[0])}
                />                 
              </div>
            ))}

            <div className="mb-3">
          <label className="form-label">Correct Answer :</label>
          <select
           className="form-select"
          value={question.correctAnswer}
          onChange={(e)=>handleCurrectAnswerChange(qIndex,e.target.value)}
          required
          >
              <option value=''>Select Currect Answer</option>
              {question.options.map((opt,optIndex)=>(
                  <option key={optIndex} value={optIndex + 1}>
                     {`Option ${optIndex + 1}`}
                  </option>
              ))}
          </select>
          </div>
          </div>
          </div>
        ))}
        <div className="mb-3">
        <button className="btn btn-primary" onClick={handleAddQuestion}>Add Question</button>
        <button className="btn btn-secondary ms-2" onClick={() => setPreviewMode(true)}>Preview</button>
        </div>
      </>
    ) : (
      <>
         <h3 className="text-center mb-4"> <b className="border-bottom border-dark border-2">
         Preview Test Paper </b></h3>
        <p><strong>Test Name:</strong> {testName}</p>
        <p><strong>Department:</strong> {selectedDepartment}</p>
        {questions.map((question, qIndex) => (
          <div className="card mb-4" key={qIndex}>
            <h5 className="card-title">Question {qIndex + 1}</h5>
            <p>{question.text}</p>
            {question.image && <img src={URL.createObjectURL(question.image)} alt="Question" 
            style={{height:"200px", width:"350px", margin:"4px", borderRadius:"10px"}}
            />}
            <h5>Options</h5>
            {question.options.map((option, oIndex) => (
              <div key={oIndex}>
                <p>{oIndex +1}. {option.text}</p>
                {option.image && <img src={URL.createObjectURL(option.image)} alt="Option" 
                 style={{height:"200px", width:"350px", margin:"4px", borderRadius:"10px"}}
                />}
              </div>
            ))}
             <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
          </div>
        ))}

        <button className="btn btn-secondary"  onClick={() => setPreviewMode(false)}>Back to Edit</button>
        <button className="btn btn-success ms-2" onClick={handleSubmit}>Submit Final Paper</button>
      </>
    )}
  </div>
);
};

export default TestPaperForm;
