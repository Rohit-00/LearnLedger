import { useState } from "react";
import "./App.css";
import QuizTab from "./pages/quizzes";
import { QuizPage } from "./pages/quiz";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layout";
import ArticlesTab from "./pages/articles";

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
