import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, AlertCircle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  sizes = '100vw',
  priority = false,
  placeholder = 'blur',
  fallbackSrc,
  onLoad,
  onError,
  loading = 'lazy',
  ...props
}) => {
  const [imageState, setImageState] = useState('loading');
  const [currentSrc, setCurrentSrc] = useState(src);

  // Create optimized image URLs for different screen sizes
  const createSrcSet = useCallback((baseSrc) => {
    if (!baseSrc) return '';
    
    // If it's already a full URL, return as is
    if (baseSrc.startsWith('http') || baseSrc.startsWith('//')) {
      return baseSrc;
    }
    
    // For local images, you might want to create different sizes
    // This is a simplified version - in production you'd use a service like Cloudinary
    const sizes = [400, 800, 1200, 1600];
    return sizes
      .map(size => `${baseSrc}?w=${size} ${size}w`)
      .join(', ');
  }, []);

  const handleImageLoad = useCallback((event) => {
    setImageState('loaded');
    onLoad?.(event);
  }, [onLoad]);

  const handleImageError = useCallback((event) => {
    console.error('Image failed to load:', currentSrc);
    
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setImageState('loading');
    } else {
      setImageState('error');
    }
    
    onError?.(event);
  }, [currentSrc, fallbackSrc, onError]);

  const handleRetry = useCallback(() => {
    setImageState('loading');
    setCurrentSrc(src);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`} {...props}>
      <AnimatePresence mode="wait">
        {imageState === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
          >
            {placeholder === 'blur' ? (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
            ) : (
              <LoadingSpinner size="md" showText={false} variant="current" />
            )}
          </motion.div>
        )}

        {imageState === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
          >
            <AlertCircle className="w-8 h-8 mb-2" />
            <p className="text-sm text-center mb-3">Failed to load image</p>
            <button
              onClick={handleRetry}
              className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Retry
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        srcSet={createSrcSet(currentSrc)}
        loading={priority ? 'eager' : loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`
          w-full h-full object-cover transition-opacity duration-300
          ${imageState === 'loaded' ? 'opacity-100' : 'opacity-0'}
        `}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageState === 'loaded' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

// Avatar component with fallback
export const Avatar = ({
  src,
  name,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-lg'
  };

  const fallbackSrc = name 
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=6366f1&color=ffffff`
    : undefined;

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden ${className}`}>
      <OptimizedImage
        src={src}
        alt={name || 'Avatar'}
        fallbackSrc={fallbackSrc}
        className="w-full h-full"
        {...props}
      />
    </div>
  );
};

// Project image with aspect ratio
export const ProjectImage = ({
  src,
  alt,
  aspectRatio = '16/9',
  className = '',
  ...props
}) => {
  const aspectRatioClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '3/2': 'aspect-[3/2]'
  };

  return (
    <div className={`${aspectRatioClasses[aspectRatio] || 'aspect-video'} ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        className="w-full h-full"
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;