import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { quizABI } from '../web3/quizABI';
import Web3 from 'web3';

interface Question {
  questionText: string;
  options: [string, string, string, string];
  correctOption: number; // Index of the correct answer (0-3)
}

interface Quiz {
  title: string;
  category: string;
  questions: Question[];
  isActive: boolean;
  creator: string;
  reward: number;
}

const QuizTab = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [web3, setWeb3] = useState<any>(null);
    const [contract, setContract] = useState<any | null>(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts: string[] = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const contractInstance = new web3Instance.eth.Contract(
            quizABI,
            "0x2d8f7Defb1a8B2A315125cE51fb91AAE9F2e89Da"
          );
          setContract(contractInstance);
          try{
           const data = await contractInstance.methods
            .getAllQuizzes()
            .call()

         console.log(data)
          }
          catch(err){
            console.log(err)
          }
          console.log("Contract Instance:", contractInstance);
        }
      }
    };

    initializeWeb3();
  }, []);


  const categories = [
    'All',
    'Blockchain',
    'Web3',
    'Smart Contracts',
    'DeFi',
    'NFTs',
  ];

  const quizzes: Quiz[] = [
    {
      title: 'Introduction to Blockchain',
      category: 'Blockchain',
      questions: [
        {
          questionText: 'What is Blockchain?',
          options: [
            'A distributed ledger technology',
            'A type of cryptocurrency',
            'A programming language',
            'An application framework',
          ],
          correctOption: 0,
        },
        {
          questionText: 'Who invented Bitcoin?',
          options: [
            'Elon Musk',
            'Vitalik Buterin',
            'Satoshi Nakamoto',
            'Mark Zuckerberg',
          ],
          correctOption: 2,
        },
      ],
      isActive: true,
      creator: '0x123...456',
      reward: 100,
    },
    {
      title: 'Advanced Smart Contracts',
      category: 'Smart Contracts',
      questions: [
        {
          questionText: 'Which language is used for Ethereum smart contracts?',
          options: [
            'Python',
            'Solidity',
            'C++',
            'Java',
          ],
          correctOption: 1,
        },
        {
          questionText: 'What does "gas" refer to in Ethereum?',
          options: [
            'The fuel for smart contracts',
            'Transaction fees',
            'Blockchain power source',
            'A type of token',
          ],
          correctOption: 1,
        },
      ],
      isActive: true,
      creator: '0x789...abc',
      reward: 200,
    },
  ];

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredQuizzes = activeCategory === 'All'
    ? quizzes
    : quizzes.filter((quiz) => quiz.category === activeCategory);

  return (
    <div className="max-w-screen mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Category Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-4 py-2 text-sm font-medium whitespace-nowrap
                ${activeCategory === category
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {quiz.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Category: {quiz.category}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Reward: {quiz.reward} ETH
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Created by: {quiz.creator}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {quiz.isActive ? 'Active' : 'Inactive'}
              </span>
              <Link to={`/quiz/${index}`}>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                  Start Quiz
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredQuizzes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No quizzes found for this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizTab;
