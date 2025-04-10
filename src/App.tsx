import { lazy, Suspense } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { LoadingFallback } from '@/components/shared/LoadingFallback';
import { ThemeProvider } from '@/providers/ThemeProvider';

// Lazy load main components
const Header = lazy(() => import('@/components/Header'));
const Footer = lazy(() => import('@/components/Footer'));
const ShoppingList = lazy(() => import('@/components/ShoppingList'));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen bg-background">
          <Suspense fallback={<LoadingFallback />}>
            <Header />
            <main className="py-6 flex-1">
              <ShoppingList />
            </main>
            <Footer />
          </Suspense>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
