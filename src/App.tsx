import { useState } from 'react'
import './App.css'
import { ConnectWallet } from './components/connectWallet'
import Navbar from './components/navbar'
import  QuizTab  from './pages/quizzes'
import { QuizPage } from './pages/quiz'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    </>
  )
}

export default App
