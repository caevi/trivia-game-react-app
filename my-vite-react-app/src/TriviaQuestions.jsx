import React, { useState, useEffect } from 'react';

function TriviaQuestions({ categoryURL, setQuizComplete, score, setScore }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch trivia questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(categoryURL);
        const data = await response.json();

        console.log('Fetched Data:', data);
        console.log('Fetched Questions (data.results):', data.results);

        if (data.results && Array.isArray(data.results)) {
          const shuffledQuestions = data.results.map((question) => {
            const shuffledAnswers = getShuffledAnswers(question);
            return { ...question, shuffledAnswers };
          });
          setQuestions(shuffledQuestions);
        } else {
          console.error('No valid questions found in the API response.');
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [categoryURL]);

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);

    // Check if the selected answer is correct and update score
    if (answer === questions[currentIndex].correct_answer) {
      setScore(score + 1); // Increment score
    }
  };

  // Move to the next question
  const handleNextQuestion = () => {
    setSelectedAnswer('');
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1); // Move to the next question
    } else {
      setQuizComplete(true); // Complete the quiz when all questions are answered
    }
  };

  // Shuffle answers for each question
  const getShuffledAnswers = (question) => {
    const answers = [...question.incorrect_answers, question.correct_answer];
    return answers.sort(() => Math.random() - 0.5);
  };

  if (isLoading) return <div>Loading questions...</div>;

  if (!questions.length) return <div>No questions available.</div>;

  const currentQuestion = questions[currentIndex];
  const answerChoices = currentQuestion.shuffledAnswers; // Use shuffled answers stored in state

  return (
    <div>
      <h2>Question {currentIndex + 1} / {questions.length}</h2>
      <p dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

      <div className="answer-choices">
        {answerChoices.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(answer)}
            className={selectedAnswer === answer ? 'selected' : ''}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>

     
      <button
        onClick={handleNextQuestion}
        disabled={!selectedAnswer} // Disable if no answer is selected
        className="next-button"
      >
        Continue
      </button>
    </div>
  );
}

export default TriviaQuestions;
