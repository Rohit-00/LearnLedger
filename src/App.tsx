import { useState } from 'react'
import './App.css'
import { ConnectWallet } from './components/connectWallet'
import Navbar from './components/navbar'
import  QuizTab  from './pages/quizzes'
import { QuizPage } from './pages/quiz'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './layout'

const router = createBrowserRouter([
  {
    path : '/',
    element : <Layout/>,
    children: [
      {
        path : "/quiz",
        element : <QuizPage/>
      },
    
      {
        path : "/quizzes",
        element : <QuizTab/>
      },


    ]

  },

])


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
