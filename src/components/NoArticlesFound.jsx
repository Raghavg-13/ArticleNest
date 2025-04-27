import React from "react";

function NoArticlesFound({ darkMode, setSearchTerm }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div
        className={`text-2xl font-semibold mb-4 ${
          darkMode ? "text-indigo-200" : "text-indigo-700"
        }`}
      >
        No articles found.
      </div>
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
    </div>
  );
}

export default NoArticlesFound;
