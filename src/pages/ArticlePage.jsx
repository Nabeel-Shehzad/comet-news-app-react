import { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { formatPublishedAt } from "../lib/newsService";

const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image+Available";

const ArticlePage = () => {
  const { articleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullContent, setShowFullContent] = useState(true);

  useEffect(() => {
    // Get the article data from the navigation state
    if (location.state?.article) {
      setArticle(location.state.article);
      setLoading(false);
    } else {
      // If there's no article data in the state (e.g., user directly navigated to the URL),
      // redirect to the homepage
      navigate('/');
    }
  }, [location.state, navigate]);

  // Handle the toggle of article content visibility
  const toggleContentVisibility = () => {
    setShowFullContent(!showFullContent);
  };

  // Extract article content from the description or content field
  const extractContent = (article) => {
    if (!article) return [];

    // Create an array of paragraphs from the article content or description
    let paragraphs = [];

    // Use content if available, otherwise use description
    if (article.content) {
      // Some APIs provide the content with a truncated marker like "[+123 chars]"
      const cleanedContent = article.content.replace(/\[\+\d+ chars\]$/, '');
      paragraphs.push(cleanedContent);
    }

    // Always add description as a separate paragraph if it exists and is different from content
    if (article.description &&
      (!paragraphs.length ||
        !paragraphs[0].includes(article.description))) {
      paragraphs.unshift(article.description);
    }

    // If we still have no paragraphs, add a placeholder
    if (paragraphs.length === 0) {
      paragraphs.push("Full article content is not available. Please visit the original source for the complete article.");
    }

    return paragraphs;
  };

  // Extract tags from article title and description
  const extractTags = (article) => {
    if (!article) return [];

    const combinedText = `${article.title} ${article.description || ''} ${article.content || ''}`.toLowerCase();
    const commonTags = [
      'politics', 'economy', 'technology', 'science', 'health',
      'sports', 'entertainment', 'business', 'world', 'national',
      'education', 'environment', 'climate', 'finance', 'markets',
      'ai', 'artificial intelligence', 'cryptocurrency', 'blockchain',
      'innovation', 'research', 'development'
    ];

    // Filter tags that appear in the article
    const tags = commonTags.filter(tag => combinedText.includes(tag));

    // Extract the category if present
    if (article.category) {
      tags.unshift(article.category.toLowerCase());
    }

    // Add source as a tag
    if (article.source?.name) {
      tags.push(article.source.name.toLowerCase());
    }

    // Remove duplicates and return
    return [...new Set(tags)].slice(0, 5);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Article not found</h2>
        <p className="mt-4 text-muted">
          The article you're looking for couldn't be found.
          <Link to="/" className="text-primary ml-2">Return to home</Link>
        </p>
      </div>
    );
  }

  const articleContent = extractContent(article);
  const tags = extractTags(article);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Article Title */}
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      {/* Article Image */}
      <div className="w-full h-64 sm:h-80 md:h-96 bg-secondary rounded-lg mb-6 flex items-center justify-center overflow-hidden">
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_IMAGE;
            }}
          />
        ) : (
          <div className="text-muted flex items-center justify-center h-full w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        )}
      </div>

      {/* Article Meta */}
      <div className="flex items-center text-sm text-muted mb-6">
        <span>{article.source?.name || "Unknown Source"}</span>
        <span className="mx-2">•</span>
        <div className="flex items-center">
          <Clock size={14} className="mr-1" />
          <span>{formatPublishedAt(article.publishedAt)}</span>
        </div>
        {article.author && (
          <>
            <span className="mx-2">•</span>
            <span>By {article.author}</span>
          </>
        )}
      </div>

      {/* Article Content Toggle */}
      <div className="bg-card rounded-lg overflow-hidden mb-6 shadow-sm">
        <div className="flex items-center justify-between p-4 bg-secondary border-b border-border">
          <h2 className="text-lg font-medium">Article Content</h2>
          <button
            onClick={toggleContentVisibility}
            className="flex items-center text-sm text-muted hover:text-foreground transition-colors"
          >
            {showFullContent ? (
              <>
                <span className="mr-1">Hide Article</span>
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                <span className="mr-1">Show Article</span>
                <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>

        {showFullContent && (
          <div className="p-6 text-foreground">
            {articleContent.map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Show link to original article */}
            {article.url && (
              <div className="mt-8 pt-4 border-t border-border">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Read the full article at the original source
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tags Section */}
      <div className="mb-8">
        <h3 className="text-sm text-muted mb-2">Related Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-secondary rounded-full text-sm text-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="mt-6 mb-10">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground hover:bg-secondary transition-colors"
        >
          &larr; Back to Articles
        </Link>
      </div>
    </div>
  );
};

export default ArticlePage;