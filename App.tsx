
import React, { useEffect, Suspense } from 'react';
import { HashRouter, useRoutes, useLocation, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import routes from '@/router/routes';
import { LanguageProvider } from './hooks/LanguageContext';
import { ToastProvider } from './hooks/ToastContext';
import { motion } from 'framer-motion';
import { MessageSquare, Loader2 } from 'lucide-react';
import { useLanguage } from '@/hooks/LanguageContext';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

// Simple and reliable full-page loader
const PageLoader = () => {
    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
                <Loader2 className="w-10 h-10 text-cuhk-primary animate-spin mb-4" />
                <span className="text-cuhk-primary/40 font-bold tracking-[0.3em] text-[10px] uppercase animate-pulse">
          Loading Page...
        </span>
            </div>
        </div>
    );
};

const AppRoutes = () => {
    const element = useRoutes(routes);

    return (
        <Suspense fallback={<PageLoader />}>
            {element}
        </Suspense>
    );
};

const FloatingConsultButton = () => {
    const { t } = useLanguage();
    const location = useLocation();
    const MotionDiv = motion.div as any;

    const isConsultationPage =
        location.pathname === '/consultation' ||
        location.pathname === '/ask-doctor' ||
        location.pathname.startsWith('/consultation/');

    if (isConsultationPage) return null;

    return (
        <Link to="/consultation" className="fixed bottom-8 right-8 z-[100] group">
            <MotionDiv
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-3 bg-cuhk-primary text-white p-4 rounded-full shadow-[0_10px_30px_rgba(117,14,109,0.3)] border border-white/20 overflow-hidden"
            >
                <MessageSquare size={24} />
                <span className="max-w-0 group-hover:max-w-[120px] overflow-hidden transition-all duration-300 whitespace-nowrap font-bold text-sm tracking-widest uppercase">
          {t('consult.button.float')}
        </span>
            </MotionDiv>
        </Link>
    );
};

const App: React.FC = () => {
    return (
        <LanguageProvider>
            <ToastProvider>
                <HashRouter>
                    <div className="font-sans antialiased bg-gray-50 text-gray-900 selection:bg-cuhk-primary selection:text-white">
                        <ScrollToTop />
                        <Header />
                        <main className="min-h-screen">
                            <AppRoutes />
                        </main>
                        <FloatingConsultButton />
                        <Footer />
                    </div>
                </HashRouter>
            </ToastProvider>
        </LanguageProvider>
    );
};

export default App;
