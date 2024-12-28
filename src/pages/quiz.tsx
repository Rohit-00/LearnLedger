import QuizComponent from "../components/quiz";

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
export const QuizPage = () => {
  const handleQuizComplete = (score: number) => {
    alert(`Quiz Complete! Your score is ${score}/${questions.length}`);
  };
  return(
    <QuizComponent questions={questions} onQuizComplete={handleQuizComplete} />

  )
}