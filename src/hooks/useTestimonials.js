import { useEffect, useState, useCallback } from "react"
import { apiMethods } from "../lib/apiClient"

const useTestimonials = () => {
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchTestimonials = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);
    
    try {
      const response = await apiMethods.get("/testimonials", {
        useCache: true // Enable caching for testimonials
      });
      
      const testimonialsData = response.data?.testimonials || [];
      setTestimonials(testimonialsData);
      setRetryCount(0);
      
      console.log(`💬 Loaded ${testimonialsData.length} testimonials`);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
      setError({
        message: error.userMessage || 'Failed to load testimonials',
        canRetry: true,
        originalError: error
      });
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // Retry mechanism
  const retry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    fetchTestimonials();
  }, [fetchTestimonials]);

  // Refresh testimonials (bypass cache)
  const refresh = useCallback(async () => {
    apiMethods.clearCache('/testimonials');
    await fetchTestimonials();
  }, [fetchTestimonials]);

  return {
    loading,
    error,
    testimonials,
    retryCount,
    retry,
    refresh,
    hasTestimonials: testimonials.length > 0
  };
};

export default useTestimonials
