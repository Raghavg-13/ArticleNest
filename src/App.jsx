import React, { useEffect, useState } from "react";
import ArticleCard from "./components/ArticleCard";
import Header from "./components/Header";
import SearchResultsInfo from "./components/SearchResultsInfo";
import NoArticlesFound from "./components/NoArticlesFound";

function App() {
  const [articles, setArticles] = useState([]);
  const [feed, setFeed] = useState({});
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Set dark mode based on user preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }

    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@` //add your username at the lastss
        );
        const data = await response.json();
        setFeed(data.feed);
        setArticles(data.items);
        setFilteredArticles(data.items);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch articles", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    // Fix search functionality by searching in both title and content
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [searchTerm, articles]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } min-h-screen transition-all duration-300`}
    >
      {/* Header */}
      <Header
        feed={feed}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Search Results Info */}
            {searchTerm && (
              <SearchResultsInfo
                count={filteredArticles.length}
                searchTerm={searchTerm}
                darkMode={darkMode}
              />
            )}

            {/* Article Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.guid}
                    feed={feed}
                    article={article}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            ) : (
              <NoArticlesFound
                darkMode={darkMode}
                setSearchTerm={setSearchTerm}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
