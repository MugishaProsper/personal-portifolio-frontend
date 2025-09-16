import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useRef, useEffect } from 'react';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ];

  const currentThemeOption = themeOptions.find(option => option.value === theme) || themeOptions[0];
  const CurrentIcon = currentThemeOption.icon;

  const handleThemeChange = (newTheme) => {
    if (newTheme === 'system') {
      // Remove saved preference to follow system
      localStorage.removeItem('portfolio-theme');
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      toggleTheme(systemTheme);
    } else {
      toggleTheme(newTheme);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          p-2 rounded-lg transition-all duration-300 relative overflow-hidden
          ${isDark 
            ? 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
          }
          focus:outline-none focus:ring-2 focus:ring-ai-primary/50
        `}
        aria-label="Toggle theme"
        aria-expanded={isOpen}
      >
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-ai-primary/20 to-ai-secondary/20"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Icon with smooth transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentThemeOption.value}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <CurrentIcon className="w-5 h-5" />
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute right-0 top-full mt-2 w-40 rounded-lg shadow-lg border z-50
              ${isDark 
                ? 'bg-gray-800 border-white/10 shadow-black/20' 
                : 'bg-white border-gray-200 shadow-gray-900/10'
              }
            `}
          >
            <div className="py-2">
              {themeOptions.map((option, index) => {
                const OptionIcon = option.icon;
                const isSelected = option.value === theme;
                
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => handleThemeChange(option.value)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`
                      w-full px-4 py-2 text-sm flex items-center gap-3 transition-all duration-200
                      ${isSelected
                        ? isDark
                          ? 'bg-ai-primary/20 text-ai-primary'
                          : 'bg-ai-primary/10 text-ai-primary'
                        : isDark
                          ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <OptionIcon className="w-4 h-4" />
                    <span>{option.label}</span>
                    {isSelected && (
                      <motion.div
                        layoutId="selected-indicator"
                        className="ml-auto w-2 h-2 rounded-full bg-ai-primary"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;