import { useState } from "react";
import "./App.css";
import { ConnectWallet } from "./components/connectWallet";
import Navbar from "./components/navbar";
import QuizTab from "./pages/quizzes";
import { QuizPage } from "./pages/quiz";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layout";
import ArticlesTab from "./pages/articles";
import SingleArticlePage from "./pages/singleArticles";
import ArticleWritingPage from "./pages/writeArticles";
import CreateQuiz from "./pages/createQuiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/quiz/:id",
        element: <QuizPage />,
      },

      {
        path: "/quizzes",
        element: <QuizTab />,
      },

      {
        path: "/articles",
        element: <ArticlesTab />,
      },

      {
        path: "/articles/:id",
        element: <SingleArticlePage />,
      },

      {
        path: "/write",
        element: <ArticleWritingPage />,
      },
      {
        path: "/createQuiz",
        element: <CreateQuiz/>,
      },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
