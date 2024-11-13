import React from 'react';

function Results({ questions, selectedAnswers, setQuizComplete, setCurrentCategory, score }) {
  const totalQuestions = questions.length;

  // Handle "Play Again" button
  const handlePlayAgain = () => {
    setQuizComplete(false); // Reset quiz completion state
    setCurrentCategory();  // Trigger the reset of category and other states
  };

  return (
    <div className="results-container">
      <h2>Quiz Completed!</h2>
      <p>You answered {score} out of 5 questions correctly.</p>
      <button className="play-again-button" onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
}

export default Results;
