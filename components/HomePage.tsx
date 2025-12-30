import React, { Suspense, lazy } from 'react';
import Hero from './Hero';
import LazySection from './ui/LazySection';

const NewsSection = lazy(() => import('./NewsSection'));
const StatsSection = lazy(() => import('./StatsSection'));
const AcademicSection = lazy(() => import('./AcademicSection'));

const SectionLoader = () => (
    <div className="w-full h-96 flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-cuhk-secondary border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <Suspense fallback={<SectionLoader />}>
                <LazySection minHeight="600px">
                    <NewsSection />
                </LazySection>

                <LazySection minHeight="300px">
                    <StatsSection />
                </LazySection>

                <LazySection minHeight="500px">
                    <AcademicSection />
                </LazySection>
            </Suspense>
        </>
    );
};

export default HomePage;