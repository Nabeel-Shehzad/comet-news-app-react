// Determine whether to use the local API or the proxy based on the environment
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE = isLocalhost 
  ? 'https://newsapi.org/v2' 
  : '/news/api-proxy.php'; // Path for production at the /news/ subdirectory

/**
 * Get top headlines from NewsAPI
 * @param {Object} params - Query parameters
 * @param {string} params.country - Country code (default: 'us')
 * @param {string} params.category - News category
 * @param {number} params.pageSize - Number of results per page (default: 10)
 * @param {number} params.page - Page number (default: 1)
 * @returns {Promise} - Promise that resolves to the news data
 */
export const getTopHeadlines = async ({
  country = 'us',
  category = '',
  pageSize = 10,
  page = 1
} = {}) => {
  try {
    const params = new URLSearchParams({
      country,
      pageSize,
      page,
    });

    if (category && category !== 'all') {
      params.append('category', category.toLowerCase());
    }
    
    // Add endpoint parameter for the proxy and API key only for direct calls
    if (isLocalhost) {
      params.append('apiKey', '9e86b086579e4564ade2222bd30716ff');
      const response = await fetch(`${API_BASE}/top-headlines?${params.toString()}`);
      const data = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error(data.message || 'Error fetching news');
      }
      
      return data;
    } else {
      // For the proxy, we need to specify the endpoint as a parameter
      params.append('endpoint', 'top-headlines');
      const response = await fetch(`${API_BASE}?${params.toString()}`);
      const data = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error(data.message || 'Error fetching news');
      }
      
      return data;
    }
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
};

/**
 * Search for news articles
 * @param {Object} params - Query parameters
 * @param {string} params.query - Search query
 * @param {string} params.language - Language code (default: 'en')
 * @param {string} params.sortBy - Sort order (default: 'publishedAt')
 * @param {number} params.pageSize - Number of results per page (default: 10)
 * @param {number} params.page - Page number (default: 1)
 * @returns {Promise} - Promise that resolves to the news data
 */
export const searchNews = async ({
  query,
  language = 'en',
  sortBy = 'publishedAt',
  pageSize = 10,
  page = 1
} = {}) => {
  try {
    const params = new URLSearchParams({
      q: query,
      language,
      sortBy,
      pageSize,
      page,
    });

    // Add endpoint parameter for the proxy and API key only for direct calls
    if (isLocalhost) {
      params.append('apiKey', '9e86b086579e4564ade2222bd30716ff');
      const response = await fetch(`${API_BASE}/everything?${params.toString()}`);
      const data = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error(data.message || 'Error searching news');
      }
      
      return data;
    } else {
      // For the proxy, we need to specify the endpoint as a parameter
      params.append('endpoint', 'everything');
      const response = await fetch(`${API_BASE}?${params.toString()}`);
      const data = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error(data.message || 'Error searching news');
      }
      
      return data;
    }
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};

/**
 * Format the published date to a more readable format
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date string
 */
export const formatPublishedAt = (dateString) => {
  const now = new Date();
  const published = new Date(dateString);
  
  // Calculate the difference in milliseconds
  const diffMs = now - published;
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);

  // Format the date based on how long ago it was published
  if (diffSecs < 60) {
    return `${diffSecs} seconds ago`;
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  } else {
    // Format the date: Apr 20, 2025
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return published.toLocaleDateString('en-US', options);
  }
};