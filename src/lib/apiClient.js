import axios from "axios";

const BASE_URL = "https://personal-portifolio-backend.onrender.com/api";
// const BASE_URL = "http://localhost:5000/api";

// Create axios instance with optimized configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache utilities
const getCacheKey = (url, params) => {
  return `${url}?${JSON.stringify(params || {})}`;
};

const isValidCache = (timestamp) => {
  return Date.now() - timestamp < CACHE_DURATION;
};

const getFromCache = (key) => {
  const cached = cache.get(key);
  if (cached && isValidCache(cached.timestamp)) {
    return cached.data;
  }
  cache.delete(key);
  return null;
};

const setCache = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

// Clear cache when it gets too large (prevent memory leaks)
const clearOldCache = () => {
  if (cache.size > 50) {
    const now = Date.now();
    for (const [key, value] of cache.entries()) {
      if (now - value.timestamp > CACHE_DURATION) {
        cache.delete(key);
      }
    }
  }
};

// Retry logic with exponential backoff
const retryRequest = async (requestFn, maxRetries = 3, baseDelay = 1000) => {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Don't retry on client errors (4xx)
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        throw error;
      }
      
      // Exponential backoff: 1s, 2s, 4s
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Request interceptor for logging and request optimization
apiClient.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching issues
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and caching
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const { config, response } = error;
    
    console.error(`❌ API Error: ${response?.status || 'Network'} ${config?.url || 'Unknown'}`, {
      message: error.message,
      status: response?.status,
      data: response?.data
    });
    
    // Enhance error object with user-friendly messages
    if (!response) {
      error.userMessage = 'Network connection failed. Please check your internet connection.';
    } else if (response.status >= 500) {
      error.userMessage = 'Server is temporarily unavailable. Please try again later.';
    } else if (response.status === 404) {
      error.userMessage = 'The requested resource was not found.';
    } else if (response.status >= 400) {
      error.userMessage = response.data?.message || 'Something went wrong. Please try again.';
    } else {
      error.userMessage = 'An unexpected error occurred. Please try again.';
    }
    
    return Promise.reject(error);
  }
);

// Enhanced API methods with caching and retry logic
export const apiMethods = {
  // GET with caching
  get: async (url, options = {}) => {
    const { useCache = true, ...config } = options;
    
    if (useCache) {
      const cacheKey = getCacheKey(url, config.params);
      const cachedData = getFromCache(cacheKey);
      
      if (cachedData) {
        console.log(`💾 Cache Hit: ${url}`);
        return { data: cachedData };
      }
    }
    
    clearOldCache();
    
    const response = await retryRequest(() => apiClient.get(url, config));
    
    if (useCache && response.data) {
      const cacheKey = getCacheKey(url, config.params);
      setCache(cacheKey, response.data);
    }
    
    return response;
  },

  // POST without caching
  post: async (url, data, options = {}) => {
    return await retryRequest(() => apiClient.post(url, data, options));
  },

  // PUT without caching
  put: async (url, data, options = {}) => {
    return await retryRequest(() => apiClient.put(url, data, options));
  },

  // DELETE without caching
  delete: async (url, options = {}) => {
    return await retryRequest(() => apiClient.delete(url, options));
  },

  // Clear cache manually
  clearCache: (pattern) => {
    if (pattern) {
      for (const key of cache.keys()) {
        if (key.includes(pattern)) {
          cache.delete(key);
        }
      }
    } else {
      cache.clear();
    }
  },

  // Prefetch data (useful for preloading)
  prefetch: async (url, options = {}) => {
    try {
      await apiMethods.get(url, options);
      console.log(`🔄 Prefetched: ${url}`);
    } catch (error) {
      console.warn(`⚠️ Prefetch failed: ${url}`, error.userMessage);
    }
  }
};

// Batch requests utility
export const batchRequests = async (requests) => {
  const results = await Promise.allSettled(requests);
  
  return results.map((result, index) => ({
    success: result.status === 'fulfilled',
    data: result.status === 'fulfilled' ? result.value.data : null,
    error: result.status === 'rejected' ? result.reason : null,
    index
  }));
};

// Health check utility
export const healthCheck = async () => {
  try {
    const start = Date.now();
    await apiClient.get('/health', { timeout: 5000 });
    const latency = Date.now() - start;
    
    return {
      status: 'healthy',
      latency: `${latency}ms`,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.userMessage || error.message,
      timestamp: new Date().toISOString()
    };
  }
};

export default apiClient;