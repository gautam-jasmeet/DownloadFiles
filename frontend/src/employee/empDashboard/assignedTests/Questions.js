import React from 'react'

function Questions({question,onAnswer}) {
    const handleAnswer = (option) => {
        onAnswer(question.questionNo, option);
    };

  return (
    <div>
    <h4>{question.questionText}</h4>
    {question.options &&
        Object.entries(question.options).map(([key, value], index) => (
            <button key={key} onClick={() => handleAnswer(index + 1)}>
                {value}
            </button>
        ))}
</div>
  )
}

export default Questions