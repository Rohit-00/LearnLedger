import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const QuizPlay = () => {
  const { id } = useParams<{ id: string }>(); // Extract quiz index from the query parameter

  const [contract, setContract] = useState<any | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAttempted,setHasAttempted] = useState<any>(null)

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);

          // Request account access
          await window.ethereum.request({ method: "eth_requestAccounts" });

          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]); // Set the first account as the active account

          const contractInstance = new web3Instance.eth.Contract(
            quizABI,
            "0x79855544e506B849206AaacB73274720f8E5d7c0" // Replace with your deployed contract address
          );
          setContract(contractInstance);

          const data : any = await contractInstance.methods.getAllQuizzes().call();
          const selectedQuiz = data[parseInt(id || "0", 10)]; // Get quiz by index
          
          const formattedQuiz: Quiz = {
            title: selectedQuiz.title,
            category: selectedQuiz.category,
            questions: selectedQuiz.questions.map((q: any) => ({
              questionText: q.questionText,
              options: q.options,
              correctOption: q.correctOption,
            })),
            isActive: selectedQuiz.isActive,
            creator: selectedQuiz.creator,
            reward: Number(Web3.utils.fromWei(selectedQuiz.reward, "ether")), // Convert reward to ETH
          };

          setQuiz(formattedQuiz);
          try{
          const attempted = await contractInstance.methods.hasParticipated(id,accounts[0]).call()
          setHasAttempted(Boolean(attempted))
          if(Boolean(attempted)===true){
            try{
            const score : any= await contractInstance.methods.getUserScore(id,accounts[0]).call()
            console.log(parseInt(score))
            setScore(parseInt(score))
            }catch(err){
              console.log(err)
            }
            
          }
          }catch(err){
            console.log(err)
          }

        } catch (error) {
          console.error("Error fetching quiz:", error);
        }
      }
    };

    initializeWeb3();
  }, [id]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = async () => {
    if (quiz) {
      
      if (selectedOption === quiz.questions[currentQuestion].correctOption) {

        setScore(score + 1);
      }
      try {
        const data = await contract.methods.submitAnswer(parseInt(id!), currentQuestion, selectedOption).send({from:account});
      } catch (err) {
        console.log(err);
      }
      setSelectedOption(null);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  if (!quiz) {
    return <div>Loading quiz...</div>;
  }
  if(hasAttempted===true) {
    return (<div>already attempted!  your score {score}</div>)
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{quiz.title}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Category: {quiz.category}</p>

      {account && <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Account: {account}</p>}

      {currentQuestion < quiz.questions.length && (
        <div>
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            {quiz.questions[currentQuestion].questionText}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-md border ${
                  selectedOption === index
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                } hover:bg-blue-600 hover:text-white`}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={selectedOption === null}
            >
              Next
            </button>
          </div>
        </div>
      ) }
    </div>
  );
};

export default QuizPlay;
