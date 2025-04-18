import React, { useState } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';
import quizData from '../data/quizData';

interface QuizState {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  selectedAnswer: string | null
  score: number
}

const Quiz: React.FC = () => {
  const initialQuestions: QuizQuestion[] = quizData.map((item) => ({
    question: item.question,
    options: item.options,
    correctAnswer: item.correctAnswer,
  })
);
  const [state, setState] = useState<QuizState>({
    questions: initialQuestions,
    currentQuestionIndex: 0,  // Initialize the current question index.
    selectedAnswer: null,  // Initialize the selected answer.
    score: 0,  // Initialize the score.
  });

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  }
  const hasNextQuestion = (): boolean => {
    return state.currentQuestionIndex < state.questions.length - 1;
  };
  
  const getScore = (): number => {
    const currentQ = state.questions[state.currentQuestionIndex];
    return state.selectedAnswer === currentQ.correctAnswer
      ? state.score + 1
      : state.score;
  };
  


  const handleButtonClick = (): void => {
    const newScore = getScore();
  
    if (hasNextQuestion()) {
      setState((prevState) => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        selectedAnswer: null,
        score: newScore,
      }));
    } else {
      // Асуулт дууссан — төгсгөл рүү шилжүүлнэ.
      setState((prevState) => ({
        ...prevState,
        score: newScore,
        currentQuestionIndex: prevState.currentQuestionIndex + 1, 
      }));
    }
  };
  
  const { questions, currentQuestionIndex, selectedAnswer, score } = state;
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {questions.length}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>
  {hasNextQuestion() ? 'next question' : 'Submit'}
</button>

    </div>
  );
};

export default Quiz;