import { useState } from 'react'
import './App.css'
import { ConnectWallet } from './components/connectWallet'
import Navbar from './components/navbar'
import  QuizTab  from './pages/quizzes'
import Quiz from './components/quiz'
import QuizComponent from './components/quiz'
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  {
    question: "What is the largest planet in our Solar System?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter",
  },
];

const handleQuizComplete = (score: number) => {
  alert(`Quiz Complete! Your score is ${score}/${questions.length}`);
};
const handleSubmit = (answers: Record<string, string>) => {
  console.log('Submitted answers:', answers);
  // Handle submission logic here
};
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <QuizComponent questions={questions} onQuizComplete={handleQuizComplete} />
    </>
  )
}

export default App
