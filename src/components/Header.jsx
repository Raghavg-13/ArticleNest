import React from "react";

function Header({ feed, darkMode, toggleDarkMode, searchTerm, setSearchTerm }) {
  return (
    <header className="py-6 shadow-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          {feed.image && (
            <img
              src={feed.image}
              alt="Feed Logo"
              className="w-12 h-12 rounded-full border-2 border-white shadow"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {feed.title || "ArticleNest"}
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-48 sm:w-64"
          />
          <button
            onClick={() => setSearchTerm("")}
            className={`px-4 py-2 rounded font-medium transition-colors duration-200 ${
              darkMode
                ? "bg-indigo-700 text-white hover:bg-indigo-600"
                : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
            }`}
          >
            Clear Search
          </button>
          <button
            onClick={toggleDarkMode}
            className="ml-2 px-3 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            title="Toggle dark mode"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
