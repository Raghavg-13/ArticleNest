import React from "react";

function SearchResultsInfo({ count, searchTerm, darkMode }) {
  return (
    <div
      className={`mb-6 px-4 py-2 rounded text-sm font-medium ${
        darkMode
          ? "bg-gray-800 text-indigo-200"
          : "bg-indigo-100 text-indigo-800"
      }`}
    >
      {count} result{count !== 1 ? "s" : ""} found for "{searchTerm}"
    </div>
  );
}

export default SearchResultsInfo;
