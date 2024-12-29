import React, { useState } from "react";
import Web3 from "web3";
import { ArticlesABI, CONTRACT_ADDRESS } from "../web3/articlesABI";

const ArticleWritingPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Blockchain");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [readTime, setReadTime] = useState(0); // Add readTime state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const categories = ["Blockchain", "Web3", "Smart Contracts", "DeFi", "NFTs"];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      // Check if MetaMask is installed
      if (!window.ethereum) {
        setMessage("MetaMask is not installed. Please install it to continue.");
        return;
      }

      // Connect to MetaMask
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      const userAddress = accounts[0];

      // Initialize the smart contract
      const contract = new web3.eth.Contract(ArticlesABI, CONTRACT_ADDRESS);

      // Call the createArticle function with readTime
      await contract.methods
        .createArticle(title, content, category, difficulty, readTime) // Include readTime in the contract call
        .send({ from: userAddress });

      setMessage("Article successfully submitted to the blockchain!");
      setTitle("");
      setContent("");
      setCategory("Blockchain");
      setDifficulty("Beginner");
      setReadTime(0); // Reset readTime field
    } catch (error: any) {
      console.error(error);
      setMessage("An error occurred while submitting the article.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
        Write an Article
      </h1>
      {message && (
        <div
          className={`mb-6 p-4 rounded ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Content
          </label>
          <textarea
            id="content"
            rows={8}
            className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Level */}
        <div>
          <label
            htmlFor="difficulty"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Difficulty
          </label>
          <select
            id="difficulty"
            className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>

        {/* Read Time */}
        <div>
          <label
            htmlFor="readTime"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Read Time (in minutes)
          </label>
          <input
            id="readTime"
            type="number"
            min="1"
            className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={readTime}
            onChange={(e) => setReadTime(Number(e.target.value))}
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Article"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleWritingPage;