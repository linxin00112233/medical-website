import React from 'react';
import CountUp from './ui/CountUp';
import AnimatedSection from './ui/AnimatedSection';
import { STATS } from '../assets/constants';

const StatsSection: React.FC = () => {
  return (
    <section className="py-24 bg-cuhk-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
             <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
               <circle cx="2" cy="2" r="1" fill="currentColor" />
             </pattern>
             <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
          </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, index) => (
            <AnimatedSection key={stat.id} delay={index * 0.1}>
              <div className="p-4">
                <div className="text-5xl md:text-6xl font-bold text-gray-200 mb-2 font-serif">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="h-1 w-12 bg-white/30 mx-auto mb-4"></div>
                <div className="text-sm md:text-base uppercase tracking-widest font-medium text-gray-200">
                  {stat.label}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;