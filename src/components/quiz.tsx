import React, { useState } from "react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizProps {
  questions: Question[];
  onQuizComplete: (score: number) => void;
}

const QuizComponent: React.FC<QuizProps> = ({ questions, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    setSelectedOption(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onQuizComplete(score + 1);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">
      <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {questions[currentQuestionIndex].question}
        </p>
        <div className="flex flex-col gap-4 mb-6">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`py-2 px-4 border rounded-md text-left transition-all duration-200 ${
                selectedOption === option
                  ? "bg-blue-500 text-white dark:bg-blue-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              } hover:bg-blue-100 dark:hover:bg-blue-600`}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed dark:bg-blue-400 dark:hover:bg-blue-500"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;
