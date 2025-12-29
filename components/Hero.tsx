import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/hooks/LanguageContext';
import { HERO_SLIDES } from '@/assets/constants';

const Hero: React.FC = () => {
    const { t, language } = useLanguage();
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    }, []);

    const slide = HERO_SLIDES[current];

    // Variants for background transition
    const variants = {
        enter: (_: number) => ({
            opacity: 0,
            scale: 1.05,
        }),
        center: {
            zIndex: 1,
            opacity: 1,
            scale: 1,
        },
        exit: (_: number) => ({
            zIndex: 0,
            opacity: 0,
            scale: 1,
        }),
    };

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">

            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        opacity: { duration: 0.8 },
                        scale: { duration: 0.8 }
                    }}
                    className="absolute inset-0"
                >
                    {slide.type === 'video' ? (
                        <div className="relative w-full h-full">
                            <video
                                src={slide.url}
                                controls
                                muted={false}
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="relative w-full h-full">
                            <img
                                src={slide.url}
                                alt="Slide background"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>


            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6 pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`content-${current}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col items-center max-w-4xl mx-auto pointer-events-auto"
                    >
                        <h2 className="text-white text-base md:text-lg tracking-[0.3em] mb-3 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            {language === 'zh' ? slide.subtitle : t('hero.subtitle')}
                        </h2>

                        {/* Reduced font size for better elegance */}
                        <h1 className="text-white font-bold mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] leading-tight tracking-tight"
                            style={{ fontSize: 'clamp(1.5rem, 3.5vw + 1rem, 3.25rem)' }}>
                            {language === 'zh' ? slide.title.prefix : t('hero.title.prefix')}{' '}
                            <span className="text-cuhk-secondary italic">
                {language === 'zh' ? slide.title.highlight : t('hero.title.highlight')}
              </span>{' '}
                            {language === 'zh' ? slide.title.suffix : t('hero.title.suffix')}
                        </h1>

                        <p className="text-gray-200 text-sm md:text-base mb-8 leading-relaxed font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] max-w-2xl opacity-90">
                            {language === 'zh' ? slide.description : t('hero.description')}
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#750E6D' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-cuhk-secondary text-white px-10 py-3 tracking-widest text-xs font-bold transition-all duration-300 shadow-2xl uppercase"
                        >
                            {t('hero.button')}
                        </motion.button>
                    </motion.div>
                </AnimatePresence>
            </div>


            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white transition-colors bg-black/10 hover:bg-black/30 rounded-full hidden md:block"
                aria-label="Previous slide"
            >
                <ChevronLeft size={40} strokeWidth={1} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white transition-colors bg-black/10 hover:bg-black/30 rounded-full hidden md:block"
                aria-label="Next slide"
            >
                <ChevronRight size={40} strokeWidth={1} />
            </button>


            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center cursor-pointer hover:text-cuhk-secondary transition-colors z-30"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-[10px] uppercase tracking-[0.3em] mb-1 font-medium">{t('hero.scroll')}</span>
                <ChevronDown size={20} />
            </motion.div>
        </section>
    );
};

export default Hero;