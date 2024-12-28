import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Web3 from "web3";
import { ArticlesABI, CONTRACT_ADDRESS } from "../web3/articlesABI";

interface Article {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  readTime: number;
  category: string;
  views: number;
}

const ArticlesTab = () => {
  const categories = [
    "All",
    "Blockchain",
    "Web3",
    "Smart Contracts",
    "DeFi",
    "NFTs",
  ];

  const [articles, setArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getDifficultyColor = (difficulty: Article["difficulty"]) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-500 dark:text-green-400";
      case "Medium":
        return "text-yellow-500 dark:text-yellow-400";
      case "Hard":
        return "text-red-500 dark:text-red-400";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  // Fetch articles from the smart contract
  const fetchArticles = async () => {
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

      // Fetch articles from the smart contract
      const articlesFromContract = await contract.methods.getArticles().call();

      // Map the articles to match the Article interface
      const mappedArticles: Article[] = articlesFromContract.map(
        (article: any, index: number) => ({
          id: index.toString(),
          title: article.title,
          difficulty: article.difficulty,
          readTime: parseInt(article.readTime, 10),
          category: article.category,
          views: parseInt(article.views, 10),
        })
      );

      setArticles(mappedArticles);
    } catch (error: any) {
      console.error(error);
      setError("Failed to fetch articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <div className="max-w-screen mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Category Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex overflow-x-auto no-scrollbar">
          {categories.map((category) => (
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

      {/* Article Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Loading articles...
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {article.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                <span className={getDifficultyColor(article.difficulty)}>
                  {article.difficulty}
                </span>
                <span>{article.readTime} mins read</span>
                <span>{article.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {article.category}
                </span>
                <Link to={`/articles/${article.id}`}>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                    Read Article
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No articles found for this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticlesTab;