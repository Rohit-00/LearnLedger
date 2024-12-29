import "./App.css";
import QuizTab from "./pages/quizzes";
import QuizPlay from "./pages/quiz";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layout";
import ArticlesTab from "./pages/articles";
import SingleArticlePage from "./pages/singleArticles";
import ArticleWritingPage from "./pages/writeArticles";
import CreateQuiz from "./pages/createQuiz";
import { Profile } from "./pages/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/quiz/:id",
        element: <QuizPlay />,
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
      {
        path: "/profile",
        element: <Profile/>,
      },
    ],
  },
]);

function App() {
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
