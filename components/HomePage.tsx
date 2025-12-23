import React from 'react';
import Hero from './Hero';
import NewsSection from './NewsSection';
import StatsSection from './StatsSection';
import AcademicSection from './AcademicSection';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <NewsSection />
      <StatsSection />
      <AcademicSection />
    </>
  );
};

export default HomePage;