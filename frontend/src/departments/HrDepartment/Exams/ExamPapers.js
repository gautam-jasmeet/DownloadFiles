import { useEffect, useState } from 'react';
import useGet from '../../../customHooks/useGet';
import Modal from 'react-modal';

function ExamPapers() {
  const { data, loading, error } = useGet('http://srv617987.hstgr.cloud:8080/hr/get-question-paper');
  const baseURL = 'http://srv617987.hstgr.cloud:8080'

  const [isModalOpen,setIsModalOpen] = useState(false)
  const [selectedTestPaper,setSelectedTestPaper] = useState(null)
  console.log(data);
  // console.log(data.data[0].Department);
  // console.log(data.data[0].PaperId);
  

// Handle TestPaper click to open
const handleTestPaperClick = (paper)=>{
setSelectedTestPaper(paper)
setIsModalOpen(true)
}

// Close Modal
const closeModal = ()=>{
  setIsModalOpen(false)
  setSelectedTestPaper(null)
}


  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">Error: {error}</div>;
  }

  return (
    <div>
    <Modal
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    contentLabel="Test Papers Modal"
    style={{content: {
      maxWidth: '80%',
      margin: 'auto',
      marginLeft: '15%',
      marginTop: '10rem',
      padding: '0.5rem',
    },}}
    >
     {selectedTestPaper ? (
  <div>
    <h3 className='text-center'>Paper ID: {selectedTestPaper.PaperId}</h3>
    <h4 className='text-center'>Department: {selectedTestPaper.Department}</h4>
    <div className='mt-3 p-4'>
      {selectedTestPaper.Questions.map((question, index) => (
        <div key={question.id} className="mb-3 border-bottom pb-3">
          <p className="fw-medium">Q{question.questionNo}: {question.question || 'No question provided'}</p>
          {question.questionImg && (
            <img
              src={`${baseURL}${question.questionImg}`}
              alt={`Question${question.questionNo}`}
              className="img-fluid mb-2"
              style={{ maxHeight: '200px', objectFit: 'contain' }}
            />
          )}
          
          <ul className="list-unstyled ms-3">
            <li>1. {question.option1 }
              {question.option1Img && (
                <img
                  src={`${baseURL}${question.option1Img}`}
                  alt='Option Image - 1 '
                  className="img-fluid mb-2 m-2"
                  style={{ maxHeight: '200px', height: '150px', width: "150px", objectFit: 'contain' }}
                />
              )}
            </li>
            <li>2. {question.option2 }
              {question.option2Img && (
                <img
                  src={`${baseURL}${question.option2Img}`}
                  alt='Option Image - 2 '
                  className="img-fluid mb-2 m-2"
                  style={{ maxHeight: '200px', height: '150px', width: "150px", objectFit: 'contain' }}
                />
              )}
            </li>
            <li>3. {question.option3 }
              {question.option3Img && (
                <img
                  src={`${baseURL}${question.option3Img}`}
                  alt='Option Image - 3 '
                  className="img-fluid mb-2 m-2"
                  style={{ maxHeight: '200px', height: '150px', width: "150px", objectFit: 'contain' }}
                />
              )}
            </li>
            <li>4. {question.option4 }
              {question.option4Img && (
                <img
                  src={`${baseURL}${question.option4Img}`}
                  alt='Option Image - 4 '
                  className="img-fluid mb-2 m-2"
                  style={{ maxHeight: '200px', height: '150px', width: "150px", objectFit: 'contain' }}
                />
              )}
            </li>
          </ul>
          <p className="mt-2 fw-bold">Correct Option: {question.correctOption || 'N/A'}</p>
        </div>
      ))}
    </div>
  </div>
) : (
  <p>Loading...</p>
)}


    </Modal>
    <div className="container mt-5 p-4 bg-secondary-subtle rounded shadow-lg">
        <h6 className="text-center mb-4 fw-bold display-5">Question Papers</h6>
        <div className='d-flex  '>
        {data.data && data.data.length > 0 ? (
          data.data.map((paper) => (
            <div
              key={paper.PaperId}
              className="mb-4 p-3 bg-white rounded shadow-sm bg-dark-subtle m-2"
              onClick={() => handleTestPaperClick(paper)}
            >
              <h2 className="h4 fw-semibold mb-3 text-center">Paper No: {paper.PaperId}</h2>
              <p className='text-center'>Department: {paper.Department}</p>
            </div>
          ))
        ) : (
          <div className="text-center">No question papers available.</div>
        )}
      </div>
      </div>
    </div>
  );
}

export default ExamPapers;
