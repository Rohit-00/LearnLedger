import React, { useState } from 'react';
import { Link } from 'react-router';

interface Quiz {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number;
  category: string;
  participants: number;
}

const QuizTab = () => {
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
      id: '1',
      title: 'Introduction to Blockchain',
      difficulty: 'Easy',
      timeLimit: 15,
      category: 'Blockchain',
      participants: 1234
    },
    {
      id: '2',
      title: 'Advanced Smart Contracts',
      difficulty: 'Hard',
      timeLimit: 30,
      category: 'Smart Contracts',
      participants: 856
    },
    {
      id: '3',
      title: 'DeFi Fundamentals',
      difficulty: 'Medium',
      timeLimit: 20,
      category: 'DeFi',
      participants: 2145
    },
    {
      id: '4',
      title: 'NFT Marketplace',
      difficulty: 'Easy',
      timeLimit: 15,
      category: 'NFTs',
      participants: 1567
    },
    {
      id: '5',
      title: 'Web3 Authentication',
      difficulty: 'Medium',
      timeLimit: 25,
      category: 'Web3',
      participants: 987
    },
  ];

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredQuizzes = activeCategory === 'All' 
    ? quizzes 
    : quizzes.filter(quiz => quiz.category === activeCategory);

  const getDifficultyColor = (difficulty: Quiz['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-500 dark:text-green-400';
      case 'Medium':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'Hard':
        return 'text-red-500 dark:text-red-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

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
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {quiz.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
              <span className={getDifficultyColor(quiz.difficulty)}>
                {quiz.difficulty}
              </span>
              <span>{quiz.timeLimit} mins</span>
              <span>{quiz.participants.toLocaleString()} participants</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {quiz.category}
              </span>
              <Link to={`/quiz/${1}`}>
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