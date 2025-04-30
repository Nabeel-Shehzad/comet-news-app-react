import { Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import { getTopHeadlines, formatPublishedAt } from "../lib/newsService";

const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image+Available";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { name: "all", label: "All", icon: null },
    { name: "breaking", label: "Breaking", icon: <Zap size={16} /> },
    { name: "business", label: "Business", icon: null },
    { name: "entertainment", label: "Entertainment", icon: null },
    { name: "health", label: "Health", icon: null },
    { name: "science", label: "Science", icon: null },
    { name: "sports", label: "Sports", icon: null },
    { name: "technology", label: "Technology", icon: null }
  ];

  // Parse URL query parameters when component mounts or URL changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');

    // If there's a valid category in the URL parameters, set it
    if (categoryParam && categories.some(cat => cat.name === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  useEffect(() => {
    // Reset articles when category changes
    setArticles([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    fetchNews(1); // Pass specific page 1 when category changes
  }, [selectedCategory]);

  // Add a new useEffect to handle page changes
  useEffect(() => {
    // Only fetch when page changes and it's not the initial load
    // or when loading more
    if (page > 1) {
      fetchNews(page);
    }
  }, [page]);

  const fetchNews = async (currentPage = 1) => {
    try {
      // Don't use 'breaking' as a category for the API, just display it as a tag
      const category = selectedCategory === 'breaking' || selectedCategory === 'all' ? '' : selectedCategory;

      const data = await getTopHeadlines({
        country: 'us',
        category,
        page: currentPage, // Use provided page parameter
        pageSize: 10
      });

      if (data.articles.length === 0) {
        setHasMore(false);
      } else {
        if (currentPage === 1) {
          // Set the first article as the featured article on first load
          setFeaturedArticle(data.articles[0]);
          setArticles(data.articles.slice(1));
        } else {
          setArticles(prevArticles => [...prevArticles, ...data.articles]);
        }
        setHasMore(data.totalResults > (currentPage * 10));
      }
    } catch (err) {
      setError("Failed to load news. Please try again later.");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreNews = () => {
    setLoadingMore(true);
    setPage(prevPage => prevPage + 1);
    // No need to call fetchNews here, the useEffect will handle it
  };

  // Handle category button clicks
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    // Update URL without reloading the page
    const searchParams = new URLSearchParams();
    if (category !== 'all') {
      searchParams.set('category', category);
      navigate(`/?${searchParams.toString()}`, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  // Function to get a category badge for an article
  const getCategoryBadge = (article) => {
    // Default color for sources without specific categorization
    let color = "bg-blue-600";
    let label = article.source?.name || "News";

    // Check content for potential categorization
    if (article.title?.toLowerCase().includes("breaking") ||
      (article.description?.toLowerCase().includes("breaking"))) {
      color = "bg-red-500";
      label = "BREAKING NEWS";
    } else if (selectedCategory !== 'all') {
      // Use selected category for badge if not 'all'
      const category = categories.find(cat => cat.name === selectedCategory);
      if (category) {
        label = category.label;

        // Set color based on category
        switch (selectedCategory) {
          case 'business':
            color = "bg-blue-600";
            break;
          case 'entertainment':
            color = "bg-pink-600";
            break;
          case 'health':
            color = "bg-green-600";
            break;
          case 'science':
            color = "bg-purple-600";
            break;
          case 'sports':
            color = "bg-orange-600";
            break;
          case 'technology':
            color = "bg-indigo-600";
            break;
          default:
            color = "bg-gray-600";
        }
      }
    }

    return { color, label };
  };

  const handleReadMore = (article, index) => {
    // Navigate to the article page and pass the full article data via navigation state
    const articleId = index === -1 ? 'featured' : index;
    navigate(`/article/${articleId}`, {
      state: { article }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M8 12l4-4 4 4-4 4z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold">Comet News</h1>
      </div>

      <p className="text-muted">Stay updated with the latest news across all categories</p>

      {loading && !featuredArticle ? (
        <div className="flex justify-center py-20">
          <Loader size="xl" />
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      ) : (
        <>
          {/* Featured Article */}
          {featuredArticle && (
            <div className="relative mt-8 overflow-hidden rounded-lg border border-border">
              <img
                src={featuredArticle.urlToImage || DEFAULT_IMAGE}
                alt={featuredArticle.title}
                className="h-64 w-full object-cover sm:h-72 md:h-80 lg:h-96"
                onError={(e) => { e.target.src = DEFAULT_IMAGE }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end sm:p-6">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="rounded bg-red-500 px-2 py-1 text-xs font-medium text-white">
                    {getCategoryBadge(featuredArticle).label}
                  </span>
                  {featuredArticle.source?.name && (
                    <span className="rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white">
                      {featuredArticle.source.name}
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                    <span>{featuredArticle.source?.name || 'News Source'}</span>
                    <span>•</span>
                    <span>{formatPublishedAt(featuredArticle.publishedAt)}</span>
                  </div>
                  <Button
                    variant="destructive"
                    size="md"
                    onClick={() => handleReadMore(featuredArticle, -1)}
                  >
                    Read Full Story
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Category Filters */}
          <div className="mt-8">
            <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`flex whitespace-nowrap items-center gap-1 rounded-md px-4 py-2 font-medium transition-colors ${selectedCategory === category.name
                    ? "bg-secondary text-foreground"
                    : "text-muted hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  onClick={() => handleCategoryChange(category.name)}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* News Articles List */}
          {loading && articles.length === 0 ? (
            <div className="flex justify-center py-20">
              <Loader size="xl" />
            </div>
          ) : (
            <>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1">
                {articles.map((article, index) => {
                  const badge = getCategoryBadge(article);
                  return (
                    <div
                      key={`${article.title}-${index}`}
                      className="group flex flex-col overflow-hidden rounded-lg border border-border hover:border-primary/30 transition-all sm:flex-row"
                    >
                      <div className="relative h-48 w-full sm:h-auto sm:w-48 sm:min-w-48">
                        <span className={`absolute left-0 top-0 z-10 rounded-br ${badge.color} px-2 py-1 text-xs font-bold text-white`}>
                          {badge.label}
                        </span>
                        <img
                          src={article.urlToImage || DEFAULT_IMAGE}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => { e.target.src = DEFAULT_IMAGE }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-4">
                        <div>
                          <div className="flex items-center text-sm text-muted">
                            <span>{article.source?.name || 'News Source'}</span>
                            <span className="mx-2">•</span>
                            <span>{formatPublishedAt(article.publishedAt)}</span>
                          </div>
                          <h3 className="mt-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="mt-2 text-muted">
                            {article.description || 'No description available'}
                          </p>
                        </div>
                        <div className="flex justify-end mt-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleReadMore(article, index)}
                          >
                            Read Full Story
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More Button */}
              {articles.length > 0 && (
                <div className="mt-8 flex justify-center">
                  {hasMore ? (
                    <Button
                      variant="primary"
                      size="md"
                      className="group relative overflow-hidden"
                      isLoading={loadingMore}
                      disabled={loadingMore}
                      onClick={loadMoreNews}
                      rightIcon={!loadingMore && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    >
                      Load More News
                    </Button>
                  ) : (
                    <p className="text-muted">
                      No more articles to load
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;