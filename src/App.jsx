import './App.css'
import MainPage from './pages/MainPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App w-full min-h-screen">
      <MainPage />
      {/* Legacy Toast System (for backward compatibility) */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'glass',
          style: {
            background: 'var(--glass-bg)',
            color: 'var(--ai-gray-900)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          },
        }}
      />
    </div>
  )
}

export default App;
