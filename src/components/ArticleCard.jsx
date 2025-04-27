import React, { useMemo, useState } from "react";

function ArticleCard({ feed, article, darkMode }) {
  // Memoize the formatted date to prevent recalculation
  const formattedDate = useMemo(() => {
    const date = new Date(article.pubDate);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  }, [article.pubDate]);

  // Memoize the reading time to prevent recalculation
  const readingTime = useMemo(() => {
    const wordCount = article.content
      .replace(/<[^>]*>/g, "")
      .split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200); // Average reading speed
    return `${minutes} min read`;
  }, [article.content]);

  return (
    <div
      className={`overflow-hidden rounded-lg shadow-lg flex flex-col transition-colors duration-300 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      {/* Article Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h2
            className={`text-xl font-bold mb-2 line-clamp-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {article.title}
          </h2>

          <div className="flex items-center mb-4">
            {/* Fixed size for author avatar to prevent layout shift */}
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 mr-2">
              <img
                src={feed.image}
                alt={article.author || "Author"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/api/placeholder/40/40";
                }}
              />
            </div>
            <span
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {article.author || "Anonymous"}
            </span>
          </div>

          <p
            className={`text-sm line-clamp-3 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {article.description.replace(/<\/?[^>]+(>|$)/g, "")}
          </p>
        </div>

        {/* Footer with fixed height to prevent layout shift */}
        <div
          className={`flex justify-between items-center mt-4 pt-4 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div
            className={`text-xs ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {formattedDate} · {readingTime}
          </div>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
