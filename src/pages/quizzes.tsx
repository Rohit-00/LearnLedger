import  { useEffect, useState } from "react";
import { Link } from "react-router";
import { quizABI } from "../web3/quizABI";
import Web3 from "web3";

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
  const [quizzes, setQuizzes] = useState<Quiz[]>([]); // State for quizzes
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
    

        const accounts: string[] = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {

          const contractInstance = new web3Instance.eth.Contract(
            quizABI,
            "0x79855544e506B849206AaacB73274720f8E5d7c0" // Replace with your deployed contract address
          );
         
          try {
            const data : any = await contractInstance.methods.getAllQuizzes().call();
            
            // Transform data to match Quiz interface if needed
            const formattedQuizzes = data.map((quiz: any) => ({
              title: quiz.title,
              category: quiz.category,
              questions: quiz.questions,
              isActive: quiz.isActive,
              creator: quiz.creator,
              reward: Web3.utils.fromWei(quiz.reward, "ether"), // Convert reward to ETH
            }));
            setQuizzes(formattedQuizzes);
            console.log(formattedQuizzes)
          } catch (err) {
            console.error("Error fetching quizzes:", err);
          }
        }
      }
    };

    initializeWeb3();
  }, []);

  const categories = [
    "All",
    "Blockchain",
    "Web3",
    "Smart Contracts",
    "DeFi",
    "NFTs",
  ];

  const filteredQuizzes =
    activeCategory === "All"
      ? quizzes
      : quizzes.filter((quiz) => quiz.category === activeCategory);

  return (
    <div className="max-w-screen mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Category Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex overflow-x-auto no-scrollbar">
          {categories.map((category) =>
          
          (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeCategory === category
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz, index) => 
        {
        return(
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
                {quiz.isActive ? "Active" : "Inactive"}
              </span>
              <Link to={`/quiz/${index}`}>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                  Start Quiz
                </button>
              </Link>
            </div>
          </div>
        )})}
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
