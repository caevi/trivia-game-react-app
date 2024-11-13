import React, { useState } from 'react';
import CategorySelection from './CategorySelection';
import TriviaQuestions from './TriviaQuestions';
import Results from './Results';
import logo from './assets/logo.png';
function App() {
  const [categoryURL, setCategoryURL] = useState('');
  const [startQuiz, setStartQuiz] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  // Reset the quiz states
  const resetQuiz = () => {
    setCategoryURL('');
    setStartQuiz(false);
    setQuizComplete(false);
    setScore(0);
  };

  const handleCategorySelect = (apiUrl) => {
    setCategoryURL(apiUrl);
    setStartQuiz(true);
    setQuizComplete(false);
    setScore(0); // Reset score when a new quiz is started
  };

  return (
    <div>
      <header className="header">
        <img src={logo} alt="Trivia App Logo" className="logo" />
      </header>
      {!startQuiz && <CategorySelection setCategoryURL={setCategoryURL} setStartQuiz={setStartQuiz} />}
      {startQuiz && !quizComplete && (
        <TriviaQuestions 
          categoryURL={categoryURL} 
          setQuizComplete={setQuizComplete} 
          score={score} 
          setScore={setScore} 
        />
      )}
      {quizComplete && (
        <Results 
          questions={[]} 
          selectedAnswers={[]} 
          setQuizComplete={setQuizComplete} 
          setCurrentCategory={resetQuiz} 
          score={score} 
        />
      )}
    </div>
  );
}

export default App;
