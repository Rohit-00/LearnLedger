import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { quizABI } from "../web3/quizABI";

const CreateQuiz: React.FC = () => {
  const [web3, setWeb3] = useState<any | null>(null);
  const [contract, setContract] = useState<any | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState<string[]>([""]);
  const [options, setOptions] = useState<string[][]>([["", "", "", ""]]);
  const [correctOptions, setCorrectOptions] = useState<number[]>([0]);
  const [reward, setReward] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Web3 and contract
  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Request account access
          await window.ethereum.request({ method: "eth_requestAccounts" });

          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]); // Set the first account as the active account

          const contractInstance = new web3Instance.eth.Contract(
            quizABI,
            "0x79855544e506B849206AaacB73274720f8E5d7c0" // Replace with your contract address
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("Error initializing Web3:", error);
        }
      } else {
        alert("Please install MetaMask!");
      }
    };

    initializeWeb3();
  }, []);

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

  const handleSubmit = async () => {
    if (!web3 || !contract || !account) {
      alert("Web3 or contract is not initialized.");
      return;
    }

    setIsLoading(true); // Show loading spinner
    try {
      const weiReward = web3.utils.toWei(reward.toString(), "ether");
      await contract.methods
        .createQuiz(title, category, questions, options, correctOptions, weiReward)
        .send({ from: account });

      alert("Quiz created successfully!");
      setTitle("");
      setCategory("");
      setQuestions([""]);
      setOptions([["", "", "", ""]]);
      setCorrectOptions([0]);
      setReward(0);
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz. Check the console for details.");
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="w-full mx-auto p-4 bg-white dark:bg-gray-900 rounded ">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Create a Quiz</h1>

      {isLoading && <div className="text-center mb-4">Creating quiz, please wait...</div>}

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

      {/* Category Input */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Category</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter quiz category"
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
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Reward (ETH)</label>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          value={reward}
          onChange={(e) => setReward(Number(e.target.value))}
          placeholder="Enter reward value in ETH"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        disabled={isLoading}
      >
        Create Quiz
      </button>
    </div>
  );
};

export default CreateQuiz;
