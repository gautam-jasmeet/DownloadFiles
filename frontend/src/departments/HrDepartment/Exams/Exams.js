import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../../../appContext/AppContext';
import "../../HrDepartment/JoiningForm/JoiningForm.css"


function Exams() {
  const [paperNo,setPaperNo] = useState("")
  const [questionNo,setQuestionNo] = useState("")
  const [question,setQuestion] = useState("")
  const [option1,setOption1] = useState("")
  const [option2,setOption2] = useState("")
  const [option3,setOption3] = useState("")
  const [option4,setOption4] = useState("")
  const [correctOption,setCorrectOption] = useState("")
  const [success,setSuccess] = useState("")
  const [error,setError] = useState("")

  const {token} = useContext(AppContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      
      const resposne = await axios.post('http://srv617987.hstgr.cloud:8080/hr/question-paper',{
        questionNo,
        question,
        option1,
        option2,
        option3,
        option4,
        paperNo,
        correctOption
      },{
        headers:{
          Authorization: `Bearer ${token}`
      }});
      console.log(resposne);
      
      
      if(resposne.status === 201){

        setSuccess("Quetion Submitted Successfully.");
        setError("");
       
      }

    }catch(err){
      setError("Quetion Submittion failed. Please try again.")
      setSuccess("");

    }
   
  };
  return (
    <div className='gradient-custom' >
      <form  className=' d-flex ' onSubmit={handleSubmit}>
         <div 
          className=' p-5'
          style={{width:"10%"}}>
        <h2
                    className="text-center mb-2 fw-semibold lh-base"
                    style={{
                      display: "inline-block",
                      // borderBottom: "3px solid ",
                      borderColor: "var(--primary-color)",
                      // color: "var(--primary-color)",
                       position:"sticky", top:"198px",zIndex:"998"
                    }}
                  >
                    <span className='title fs-2 border-3 '>Create Exam's Papers <br/> 
                   
                    <i className="bi bi-arrow-right"></i>
                    </span>
                  </h2>
                  </div>
        <div style={{width:"90%"}}>
          <div className='container p-3 w-50 '>
        <div  className="row mt-3">
        <label  className="col-sm-12 col--label text-secondary-emphasis fw-semibold ">Quetion No. :</label>
        
        <div className="col-sm-12">
        <input 
        className='form-control '
        type='number'
        value={questionNo}
        onChange={(e)=>setQuestionNo(e.target.value)}
        >
        </input>
        </div>
        </div>
        <div className="row mt-3">
          <label  className="col-sm-12 col--label text-secondary-emphasis fw-semibold ">Quetion :</label>
          
          <div className="col-sm-12">
          <textarea type="text"
           className='form-control'
          value={question}
          onChange={(e)=>setQuestion(e.target.value)}
          ></textarea>
        </div>
        </div>
        <div className="row mt-3">
          <label  className="col-sm-12 col--label text-secondary-emphasis fw-semibold ">option 1 :</label>
          
          <div className="col-sm-12">
          <input 
           className='form-control'
          type='text'
          value={option1}
          onChange={(e)=>setOption1(e.target.value)}
          ></input>
        </div>
        </div>
        <div className="row mt-3">
          <label  className="col-sm-12 col--label text-secondary-emphasis fw-semibold ">option 2 :</label>
         
          <div className="col-sm-12">
          <input 
           className='form-control'
          type='text'
          value={option2}
           onChange={(e)=>setOption2(e.target.value)} 
          ></input>
          </div>
        </div>
        <div className="row mt-3">
          <label  className="col-sm-12 col--label text-secondary-emphasis fw-semibold ">option 3 :</label>
         
          <div className="col-sm-12">
          <input 
           className='form-control'
          type='text'
          value={option3}
          onChange={(e)=>setOption3(e.target.value)}
          ></input>
        </div>
        </div>
        <div className="row mt-3">
          <label  className="col-sm-12 col--label text-secondary-emphasis fw-semibold ">option 4 :</label>
        
          <div className="col-sm-12">
          <input 
           className='form-control'
          type='text'
          value={option4}
          onChange={(e)=>setOption4(e.target.value)}
          ></input>
        </div>
        </div>
        <div className="row mt-3">
          <label  className="col-sm-12 col--label text-secondary-emphasis fw-semibold ">Correct Option :</label>
         
          <div className="col-sm-12">
          <input 
           className='form-control'
          type='text'
          value={correctOption}
          onChange={(e)=>setCorrectOption(e.target.value)}
          ></input>
        </div>
        </div>
        <div  className="row mt-3">
        <label  className="col-sm-12 col--label text-secondary-emphasis fw-semibold ">Paper No. :</label>
      
        <div className="col-sm-12">
        <input 
        className='form-control'
        type='number'
        value={paperNo}
        onChange={(e)=>setPaperNo(e.target.value)}
        >
        </input>
        </div>
        </div>
        <div className="text-center pt-1 mb-5 mt-4 pb-1">
                    <button data-mdb-button-init data-mdb-ripple-init 
                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 card_btn" type="submit">
                      Submit</button>
                    {/* <a className="text-muted" href="#!">Forgot password?</a> */}
                  </div>
         </div>
         </div>
      </form>
    </div>
  )
}

export default Exams