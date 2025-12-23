import React, { useEffect } from 'react';
import { HashRouter, useRoutes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import routes from '@/router/routes';
import { LanguageProvider } from '@/hooks/LanguageContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
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