import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Build optimizations
  build: {
    // Enable minification
    minify: 'terser',
    
    // Generate sourcemaps for production debugging
    sourcemap: false,
    
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
          utils: ['axios', 'date-fns']
        }
      }
    },
    
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Target modern browsers for better optimization
    target: 'esnext'
  },
  
  // Development server optimizations
  server: {
    // Warm up frequently used files
    warmup: {
      clientFiles: [
        './src/components/**/*.jsx',
        './src/hooks/**/*.js',
        './src/lib/**/*.js'
      ]
    }
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react',
      'axios'
    ]
  },
  
  // Asset handling
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
  
  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@lib': resolve(__dirname, './src/lib'),
      '@assets': resolve(__dirname, './src/assets')
    }
  },
  
  // CSS optimizations
  css: {
    devSourcemap: true
  },
  
  // Enable preview optimizations
  preview: {
    port: 4173,
    strictPort: true
  },
  
  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
})
