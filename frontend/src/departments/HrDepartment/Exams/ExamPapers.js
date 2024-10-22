import React from 'react';
import useGet from '../../../customHooks/useGet';

function ExamPapers() {
  const { data: questionPaper, loading, error } = useGet('http://srv617987.hstgr.cloud:8080/hr/question-papers');
  console.log(questionPaper);
  
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">Error: {error}</div>;
  }

  return (
    <div className="container mt-5 p-4 bg-light rounded shadow-lg">
      <h1 className="text-center mb-4 fw-bold display-5">Temporary Question Papers</h1>
      {questionPaper && questionPaper.length > 0 ? (
        questionPaper.map((paper) => (
          <div key={paper.paperNo} className="mb-4 p-3 bg-white rounded shadow-sm">
            <h2 className="h4 fw-semibold mb-3">Paper No: {paper.paperNo}</h2>
                {/* <div key={paper.questionNo} className="mb-3 border-bottom pb-3"> */}
                  <p className="fw-medium">Q{paper.questionNo}: {paper.question}</p>
                  <ul className="list-unstyled ms-3">
                    <li>{paper.option1 || 'No option provided'}</li>
                    <li>{paper.option2 || 'No option provided'}</li>
                    <li>{paper.option3 || 'No option provided'}</li>
                    <li>{paper.option4 || 'No option provided'}</li>
                  </ul>
                  <p className="mt-2 fw-bold">Correct Option: {paper.correctOption || 'N/A'}</p>
                </div>
             
           
        //   </div>
        ))
      ) : (
        <div className="text-center">No question papers available.</div>
      )}
    </div>
  );
}

export default ExamPapers;
