import { useEffect } from 'react';
import useGet from '../../../customHooks/useGet';

function ExamPapers() {
  const { data, loading, error } = useGet('http://srv617987.hstgr.cloud:8000/hr/get-question-paper');
  const baseURL = 'http://srv617987.hstgr.cloud:8000'

  // Log the fetched data to inspect its structure
  // useEffect(() => {
  //   if (data) {
  //     console.log('Fetched Data:', data);
  //   }
  // }, [data]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">Error: {error}</div>;
  }

  return (
    <div className="container mt-5 p-4 bg-light rounded shadow-lg">
      <h1 className="text-center mb-4 fw-bold display-5">Question Papers</h1>
      {data.data && data.data.length > 0 ? (
        data.data.map((paper) => (
          <div key={paper.PaperId} className="mb-4 p-3 bg-white rounded shadow-sm">
            <h2 className="h4 fw-semibold mb-3">Paper No: {paper.PaperId}</h2>

            {paper.Questions.map((question,index) => (
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
                  <li>1.  {question.option1 || 'No option provided'}
                    {question.option1Img && (
                      <img
                      src={`${baseURL}${question.option1Img}`}
                      alt='Option Image - 1 '
                      className="img-fluid mb-2 m-2"
                      style={{ maxHeight: '200px',height:'150px', width:"150px", objectFit: 'contain' }}
                      />
                    )}
                  </li>
                  <li>2. {question.option2 || 'No option provided'}
                  {question.option1Img && (
                      <img
                      src={`${baseURL}${question.option2Img}`}
                      alt='Option Image - 2 '
                      className="img-fluid mb-2 m-2"
                      style={{ maxHeight: '200px',height:'150px', width:"150px", objectFit: 'contain' }}
                      />
                    )}
                  </li>
                  <li>3. {question.option3 || 'No option provided'}
                  {question.option1Img && (
                      <img
                      src={`${baseURL}${question.option3Img}`}
                      alt='Option Image - 3 '
                      className="img-fluid mb-2 m-2"
                      style={{ maxHeight: '200px',height:'150px', width:"150px", objectFit: 'contain' }}
                      />
                    )}
                  </li>
                  <li>4. {question.option4 || 'No option provided'}
                  {question.option1Img && (
                      <img
                      src={`${baseURL}${question.option4Img}`}
                      alt='Option Image - 4 '
                      className="img-fluid mb-2 m-2"
                      style={{ maxHeight: '200px',height:'150px', width:"150px", objectFit: 'contain' }}
                      />
                    )}
                  </li>
                </ul>
                <p className="mt-2 fw-bold">Correct Option: {question.correctOption || 'N/A'}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="text-center">No question papers available.</div>
      )}
    </div>
  );
}

export default ExamPapers;
