import React, { useState } from "react";

interface QuizData {
  title: string;
  questionTexts: string[];
  options: string[][];
  correctOptions: number[];
  reward: number;
}

const CreateQuiz: React.FC = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<string[]>([""]);
  const [options, setOptions] = useState<string[][]>([["", "", "", ""]]);
  const [correctOptions, setCorrectOptions] = useState<number[]>([0]);
  const [reward, setReward] = useState<number>(0);

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
    setOptions([...options, ["", "", "", ""]]);
    setCorrectOptions([...correctOptions, 0]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[qIndex][optIndex] = value;
    setOptions(updatedOptions);
  };

  const handleCorrectOptionChange = (qIndex: number, value: number) => {
    const updatedCorrectOptions = [...correctOptions];
    updatedCorrectOptions[qIndex] = value;
    setCorrectOptions(updatedCorrectOptions);
  };

  const handleSubmit = () => {
    const quizData: QuizData = {
      title,
      questionTexts: questions,
      options,
      correctOptions,
      reward,
    };

    console.log("Quiz Data:", quizData);
    alert("Quiz created successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Create a Quiz</h1>

      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Quiz Title</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter quiz title"
        />
      </div>

      {/* Questions */}
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Question {qIndex + 1}
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            value={question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            placeholder="Enter question text"
          />

          <div className="mt-4">
            {options[qIndex].map((option, optIndex) => (
              <div key={optIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                  placeholder={`Option ${optIndex + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Correct Option
            </label>
            <select
              value={correctOptions[qIndex]}
              onChange={(e) => handleCorrectOptionChange(qIndex, Number(e.target.value))}
              className="px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            >
              {options[qIndex].map((_, optIndex) => (
                <option key={optIndex} value={optIndex}>
                  Option {optIndex + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddQuestion}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Another Question
      </button>

      {/* Reward Input */}
      <div className="my-4">
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Reward</label>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          value={reward}
          onChange={(e) => setReward(Number(e.target.value))}
          placeholder="Enter reward value"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Create Quiz
      </button>
    </div>
  );
};

export default CreateQuiz;
