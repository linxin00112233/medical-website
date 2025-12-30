import React, { useEffect, Suspense } from 'react';
import { HashRouter, useRoutes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import routes from '@/router/routes';
import { LanguageProvider } from '@/hooks/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


const PageLoader = () => (
    <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center">
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
      >
        <div className="w-12 h-12 border-4 border-cuhk-primary/20 border-t-cuhk-primary rounded-full animate-spin mb-4" />
        <span className="text-cuhk-primary font-bold tracking-widest text-xs uppercase animate-pulse">
        Loading...
      </span>
      </motion.div>
    </div>
);

const AppRoutes = () => {
  const element = useRoutes(routes);
  const location = useLocation();

  return (
      <AnimatePresence mode="wait">
        <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-h-screen"
        >
          <Suspense fallback={<PageLoader />}>
            {element}
          </Suspense>
        </motion.div>
      </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
      <LanguageProvider>
        <HashRouter>
          <div className="font-sans antialiased bg-gray-50 text-gray-900 selection:bg-cuhk-primary selection:text-white">
            <ScrollToTop />
            <Header />
            <main>
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </HashRouter>
      </LanguageProvider>
  );
};

export default App;