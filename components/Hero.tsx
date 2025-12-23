import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/hooks/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        {/* <img 
          src="https://images.unsplash.com/photo-1631558556874-1d377b218998?q=80&w=2600&auto=format&fit=crop" 
          alt="Medical School Building"
          className="w-full h-full object-cover"
        /> */}
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Removed 'uppercase' class */}
          <h2 className="text-white text-lg md:text-xl tracking-[0.2em] mb-4 font-light">
            {t('hero.subtitle')}
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 drop-shadow-lg">
            {t('hero.title.prefix')} <span className="text-cuhk-secondary italic">{t('hero.title.highlight')}</span> {t('hero.title.suffix')}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-gray-200 max-w-2xl text-base md:text-lg mb-10 leading-relaxed font-light"
        >
          {t('hero.description')}
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-cuhk-secondary text-white px-10 py-3 rounded-none uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-cuhk-primary transition-colors duration-300 shadow-lg border border-transparent hover:border-cuhk-primary"
        >
          {t('hero.button')}
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center cursor-pointer hover:text-cuhk-secondary transition-colors"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-medium">{t('hero.scroll')}</span>
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;