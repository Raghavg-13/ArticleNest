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
    </div>
  );
}

export default NoArticlesFound;
