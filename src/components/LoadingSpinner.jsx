import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Loading...', 
  showText = true,
  className = '',
  variant = 'primary'
}) => {
  const { isDark } = useTheme();
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const variantClasses = {
    primary: 'text-ai-primary',
    secondary: 'text-ai-secondary',
    accent: 'text-ai-accent',
    white: 'text-white',
    current: 'text-current'
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {/* Animated Spinner */}
      <motion.div
        className={`${sizeClasses[size]} ${variantClasses[variant]} relative`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-current opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Spinning Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-current"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Pulsing Dot */}
        <motion.div
          className="absolute inset-2 rounded-full bg-current opacity-60"
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </motion.div>

      {/* Loading Text */}
      {showText && text && (
        <motion.p
          className={`${textSizeClasses[size]} ${isDark ? 'text-gray-300' : 'text-gray-600'} font-medium`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Full Screen Loading Component
export const FullScreenLoading = ({ 
  text = 'Loading your portfolio...', 
  subText = 'Please wait while we prepare everything for you' 
}) => {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center max-w-md mx-auto px-6">
        {/* Logo Animation */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <img 
            src="/logo.svg" 
            alt="Portfolio Logo" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gradient-ai">
            MUGISHA Prosper
          </h1>
        </motion.div>

        {/* Loading Spinner */}
        <LoadingSpinner 
          size="lg" 
          text={text}
          variant="primary"
        />

        {/* Subtitle */}
        {subText && (
          <motion.p
            className={`mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {subText}
          </motion.p>
        )}

        {/* Progress Dots */}
        <motion.div
          className="flex justify-center gap-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-ai-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Section Loading Component
export const SectionLoading = ({ 
  title = 'Loading', 
  className = '',
  height = 'min-h-[400px]'
}) => {
  return (
    <div className={`${height} flex items-center justify-center ${className}`}>
      <div className="text-center">
        <LoadingSpinner 
          size="lg" 
          text={`Loading ${title.toLowerCase()}...`}
          variant="primary"
        />
      </div>
    </div>
  );
};

// Inline Loading Component (for buttons, etc.)
export const InlineLoading = ({ 
  size = 'sm',
  className = '' 
}) => {
  return (
    <LoadingSpinner 
      size={size}
      showText={false}
      variant="current"
      className={className}
    />
  );
};

export default LoadingSpinner;