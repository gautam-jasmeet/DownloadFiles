import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../appContext/AppContext';

function AssignedTests() {
  const [testPaper, setTestPaper] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [startTime, setStartTime] = useState(null);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [showFullscreenReminder, setShowFullscreenReminder] = useState(false);
  const { token, employeeId } = useContext(AppContext);
  const baseURL = `http://srv617987.hstgr.cloud:8080`;

  // Open Full-Screen Mode
  const fullScreenMode = () => {
    const elm = document.documentElement;
    if (elm.requestFullscreen){
      elm.requestFullscreen()
    };
  };

  // Start Test
  const startTest = async () => {
    try {
      const response = await axios.get(`${baseURL}/hr/assign-paper/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setTestPaper(response.data);
        setStartTime(Date.now());
        setTestSubmitted(false);
        fullScreenMode();
      } else {
        console.log("Error fetching test data.");
      }
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  // Handle full-screen exit and re-entry prompt
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        alert("You have exited full-screen mode. Please re-enter to continue the exam.");
        setShowFullscreenReminder(true); // Show re-entry reminder
      } else {
        setShowFullscreenReminder(false); // Hide reminder if back in full screen
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Inactivity & tab visibility checks
  useEffect(() => {
    let idleTimer;

    const resetTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        alert("You have been logged out due to inactivity.");
        closeTest(); // Close test and stop timer
      }, 10 * 60 * 1000); // 10 minutes
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("Please stay on the exam page!");
      }
    };

    const handleContextMenu = (e)=>e.preventDefault();
    const handleCopyPaste = (e)=> e.preventDefault();

    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keydown", resetTimer);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    document.addEventListener("contextmenu",handleContextMenu)
    document.addEventListener('copy',handleCopyPaste)
    document.addEventListener('paste',handleCopyPaste)
    document.addEventListener('cut',handleCopyPaste)

    return () => {
      clearTimeout(idleTimer);
      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("keydown", resetTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener('contextmenu',handleContextMenu);
      document.removeEventListener('copy',handleCopyPaste)
      document.removeEventListener('paste',handleCopyPaste)
      document.removeEventListener('cut',handleCopyPaste)
    };
  }, [startTime]);

  const handleOptionChange = (questionNo, selectedOptionIndex) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionNo]: selectedOptionIndex,
    }));
  };

  // Calculate Score
  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;

    testPaper.data.Papers.forEach((paper) => {
      paper.Questions.forEach((question) => {
        const selectedAnswer = selectedAnswers[question.questionNo];
        const correctAnswer = parseInt(question.correctOption, 10);
        if (selectedAnswer === correctAnswer) correct++;
        else if (selectedAnswer !== undefined) incorrect++;
      });
    });

    const totalTime = Date.now() - startTime;
    setTotalTimeTaken(Math.floor(totalTime / 1000));
    setScore({ correct, incorrect });
    setTestSubmitted(true);
  };

  // Close Test
  const closeTest = () => {
    setTestPaper(null);
    setStartTime(null);
  };

  return (
    <div className="container mt-2 m-5">
      {!testSubmitted && !testPaper && (
        <button onClick={startTest} className="btn btn-primary mt-3">
          Start the test (Enter Full-Screen Mode)
        </button>
      )}

      {showFullscreenReminder && (
        <div className="alert alert-warning mt-3">
          You are no longer in full-screen mode. Please{" "}
          <button onClick={fullScreenMode} className="btn btn-link p-0 m-0">
            click here
          </button>{" "}
          to re-enter full-screen mode.
        </div>
      )}

      {testPaper && !testSubmitted && (
        <div>
          {testPaper.data.Papers.map((paper) => (
            <div key={paper.PaperId}>
              <h4 className="text-center">Test Paper: {paper.PaperId}</h4>
              {paper.Questions.map((question) => (
                <div key={question.questionNo}>
                  <p>Q{question.questionNo}: {question.questionText}</p>
                  {question.questionImg && (
                    <img
                      src={`${baseURL}${question.questionImg}`}
                      alt={`Question ${question.questionNo}`}
                      className="img-fluid mb-2"
                      style={{ maxHeight: "200px", objectFit: "contain" }}
                    />
                  )}
                  <ul className="list-unstyled ms-3">
                    {['option1text', 'option2text', 'option3text', 'option4text'].map((option, index) => (
                      <li key={option}>
                        <input
                          type="radio"
                          name={`question${question.questionNo}`}
                          checked={selectedAnswers[question.questionNo] === index + 1}
                          onChange={() => handleOptionChange(question.questionNo, index + 1)}
                        />
                        {index + 1}. {question.options[option]}
                        {question.options[`${option}img`] && (
                          <img
                            src={`${baseURL}${question.options[`${option}img`]}`}
                            alt={`Option Image - ${index + 1}`}
                            className="img-fluid"
                            style={{ maxHeight: "200px", height: "150px", width: "150px", objectFit: "contain" }}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
          <button onClick={calculateScore} className="btn btn-primary mt-3">Submit</button>
        </div>
      )}

      {testSubmitted && (
        <div className="p-5">
          <h4>Performance Summary</h4>
          <p>Correct Attempts: {score.correct}</p>
          <p>Incorrect Attempts: {score.incorrect}</p>
          <p>Total Attempts: {score.correct + score.incorrect}</p>
          <p>Total Time Taken: {Math.floor(totalTimeTaken / 60)} minutes {totalTimeTaken % 60} seconds</p>
        </div>
      )}
    </div>
  );
}

export default AssignedTests;

