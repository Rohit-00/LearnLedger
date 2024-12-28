import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import { ArticlesABI, CONTRACT_ADDRESS } from "../web3/articlesABI";

interface Article {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: number;
  category: string;
  views: number;
  content: string;
}

const SingleArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getDifficultyColor = (difficulty: Article["difficulty"]) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-500 dark:text-green-400";
      case "Intermediate":
        return "text-yellow-500 dark:text-yellow-400";
      case "Advanced":
        return "text-red-500 dark:text-red-400";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError("");

      // Check if MetaMask is installed
      if (!window.ethereum) {
        setError("MetaMask is not installed. Please install it to continue.");
        return;
      }

      // Connect to MetaMask
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(ArticlesABI, CONTRACT_ADDRESS);

      // Fetch article by ID from the smart contract
      const articleFromContract = await contract.methods.getArticle(id).call();

      // Map the article data to match the Article interface
      const mappedArticle: Article = {
        id,
        title: articleFromContract.title,
        difficulty: articleFromContract.difficulty,
        readTime: parseInt(articleFromContract.readTime, 10),
        category: articleFromContract.category,
        views: parseInt(articleFromContract.views, 10),
        content: articleFromContract.content,
      };

      setArticle(mappedArticle);
    } catch (error: any) {
      console.error(error);
      setError("Failed to fetch the article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Loading article...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
      ) : article ? (
        <>
          {/* Article Header */}
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
              <span className={getDifficultyColor(article.difficulty)}>
                {article.difficulty}
              </span>
              <span>{article.readTime} min read</span>
              <span>{article.views.toLocaleString()} views</span>
            </div>
            <div className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-8">
              <span className="font-semibold text-gray-900 dark:text-white">
                {article.category}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
            <p className="mb-4">{article.content}</p>
          </div>

          {/* Back to Articles */}
          <div className="mt-12 text-center">
            <a
              href="/articles"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Back to Articles
            </a>
          </div>

          {/* Footer */}
          <footer className="mt-12 py-8 bg-gray-200 dark:bg-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 Learn and Play. All rights reserved.</p>
          </footer>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Article not found.</p>
        </div>
      )}
    </div>
  );
};

export default SingleArticlePage;