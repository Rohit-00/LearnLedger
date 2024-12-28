import React from "react";

interface Article {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  readTime: number;
  category: string;
  views: number;
  content: string;
}

const SingleArticlePage = () => {
  // Example article data
  const article: Article = {
    id: "1",
    title: "Introduction to Blockchain Technology",
    difficulty: "Easy",
    readTime: 10,
    category: "Blockchain",
    views: 1234,
    content: `Blockchain technology is revolutionizing various industries, from finance to healthcare, by offering a secure, transparent, and decentralized way to record transactions. It is essentially a digital ledger that records information across multiple computers in such a way that the registered transactions cannot be altered retroactively. This ensures data integrity and prevents fraud.
    
    Blockchain works by utilizing a network of computers (nodes) that maintain and validate the blockchain ledger. These nodes work together to ensure the accuracy and validity of transactions. One of the most famous applications of blockchain technology is cryptocurrencies like Bitcoin and Ethereum.
    
    With the rise of decentralized applications (dApps) and smart contracts, blockchain is gaining widespread adoption. The ability to create transparent, secure, and autonomous systems opens up many possibilities for innovation across different sectors, such as finance, supply chain, healthcare, and more.
    
    In this article, we will dive deeper into the core principles of blockchain technology, explore its potential applications, and discuss its limitations and challenges.
    `,
  };

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

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
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
        {/* Add more content if necessary */}
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
    </div>
  );
};

export default SingleArticlePage;
