import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';
interface PlaceholderPageProps {
  title: string;
  headerClassName?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title,headerClassName }) => {
  return (

    <div className="min-h-screen bg-gray-50 flex flex-col">

      <div className={cn(
        "bg-cuhk-dark text-white pt-32 pb-16 px-4 relative overflow-hidden",
        headerClassName
      )}>
        <div className="absolute inset-0 opacity-10">
           <svg width="100%" height="100%">
             <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
               <circle cx="2" cy="2" r="1" fill="currentColor" />
             </pattern>
             <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cuhk-secondary font-bold uppercase tracking-widest text-sm block mb-2">
              Discover
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">{title}</h1>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white p-8 md:p-12 shadow-sm border-l-4 border-cuhk-secondary"
        >
          <h2 className="text-2xl font-bold text-cuhk-dark mb-4">Welcome to {title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            This section is currently under development. Content for the <strong>{title}</strong> page will be available soon. 
            Please check back later for updates on our programs, faculty, and research initiatives.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PlaceholderPage;