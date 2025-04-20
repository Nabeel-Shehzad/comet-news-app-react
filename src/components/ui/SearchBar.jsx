import { Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { searchNews, formatPublishedAt } from "../../lib/newsService";
import Button from "./Button";
import Loader from "./Loader";

const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image+Available";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Keyboard shortcut (Ctrl+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setShowDropdown(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setIsLoading(true);
    setError(null);
    setShowDropdown(true);
    
    try {
      const data = await searchNews({
        query,
        pageSize: 5
      });
      
      setSearchResults(data.articles || []);
    } catch (err) {
      console.error("Error searching news:", err);
      setError("Failed to search for news. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const resetSearch = () => {
    setQuery("");
    setIsSearching(false);
    setSearchResults([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full" ref={searchContainerRef}>
      <div className="flex h-10 items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-4 text-[hsl(var(--foreground))]">
        {isLoading ? (
          <Loader size="sm" className="mr-2" />
        ) : (
          <Search 
            className="mr-2 h-4 w-4 text-[hsl(var(--muted-foreground))]"
            onClick={handleSearch} 
          />
        )}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for news..."
          className="w-full bg-transparent outline-none placeholder:text-[hsl(var(--muted-foreground))]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => query && setShowDropdown(true)}
        />
        {query && (
          <button 
            onClick={resetSearch}
            className="ml-2 rounded-full p-1 hover:bg-[hsl(var(--secondary))]"
          >
            <X className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          </button>
        )}
      </div>
      
      <span className="hidden sm:inline-block sm:pl-2 sm:text-xs sm:text-[hsl(var(--muted-foreground))]">
        Press <kbd className="rounded border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-1.5 py-0.5 text-xs font-semibold">Ctrl</kbd> + <kbd className="rounded border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-1.5 py-0.5 text-xs font-semibold">K</kbd> to search
      </span>
      
      {/* Search Results Dropdown */}
      {showDropdown && (isLoading || searchResults.length > 0 || error) && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-lg">
          <div className="p-2">
            <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-2">
              <p className="text-sm font-medium">Search Results</p>
              <button 
                onClick={() => setShowDropdown(false)}
                className="rounded-full p-1 hover:bg-[hsl(var(--secondary))]"
              >
                <X className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              </button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader size="md" />
              </div>
            ) : error ? (
              <div className="p-4 text-center text-[hsl(var(--destructive))]">
                {error}
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-4 text-center text-[hsl(var(--muted-foreground))]">
                No results found for "{query}"
              </div>
            ) : (
              <div className="mt-2 max-h-[60vh] overflow-auto">
                {searchResults.map((article, index) => (
                  <div 
                    key={`${article.title}-${index}`}
                    className="flex cursor-pointer gap-3 rounded-md p-2 hover:bg-[hsl(var(--secondary))]"
                    onClick={() => window.open(article.url, '_blank')}
                  >
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <img 
                        src={article.urlToImage || DEFAULT_IMAGE} 
                        alt={article.title}
                        className="h-full w-full object-cover"
                        onError={(e) => { e.target.src = DEFAULT_IMAGE }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="line-clamp-2 text-sm font-medium">{article.title}</h4>
                      <div className="mt-1 flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                        <span>{article.source?.name || 'News Source'}</span>
                        <span>•</span>
                        <span>{formatPublishedAt(article.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-2 border-t border-[hsl(var(--border))] p-2">
                  <Button
                    variant="link"
                    className="w-full justify-center"
                    onClick={() => {
                      // Here you could navigate to a full search results page
                      // For now, just closing the dropdown
                      setShowDropdown(false);
                    }}
                  >
                    View all results
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;