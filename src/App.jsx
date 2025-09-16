import { Suspense, lazy } from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import { FullScreenLoading } from './components/LoadingSpinner';

// Lazy load the main page for better performance
const MainPage = lazy(() => import('./pages/MainPage'));

function App() {
  return (
    <ErrorBoundary>
      <div className="App w-full min-h-screen">
        <Suspense fallback={<FullScreenLoading />}>
          <MainPage />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
