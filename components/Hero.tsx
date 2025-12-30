
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/hooks/LanguageContext';
import {useNavigate} from 'react-router-dom'
import { HERO_SLIDES } from '@/assets/constants';

const Hero: React.FC = () => {
    const navigate = useNavigate();
    const MotionDiv = motion.div as any;
    const MotionButton = motion.button as any;

    const { t, language } = useLanguage();
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isMediaLoaded, setIsMediaLoaded] = useState(false);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setIsMediaLoaded(false);
        setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setIsMediaLoaded(false);
        setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    }, []);

    const handleScrollDown = () => {
        const nextSection = document.getElementById('news');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }
    };

    const slide = HERO_SLIDES[current];

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
        <section className="relative h-screen w-full overflow-hidden bg-[#111]">

            <AnimatePresence initial={false} custom={direction}>

                <MotionDiv
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        opacity: { duration: 1 },
                        scale: { duration: 1.2 }
                    }}
                    className="absolute inset-0"
                >
                    {slide.type === 'video' ? (
                        <div className="relative w-full h-full">
                            <video
                                src={slide.url}
                                controls
                                loop
                                playsInline
                                onLoadedData={() => setIsMediaLoaded(true)}// Use a standard placeholder to prevent white flash
                                className={`w-full h-full object-cover transition-opacity duration-1000 ${isMediaLoaded ? 'opacity-100' : 'opacity-0'}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                        </div>
                    ) : (
                        <div className="relative w-full h-full" onClick={()=>slide.path?navigate(slide.path):''}>
                            <img
                                src={slide.url}
                                alt="Slide background"
                                onLoad={() => setIsMediaLoaded(true)}
                                className={`w-full h-full object-cover transition-opacity duration-1000 ${isMediaLoaded ? 'opacity-100' : 'opacity-0'}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                        </div>
                    )}

                    {!isMediaLoaded && <div className="absolute inset-0 bg-cuhk-primary/10 animate-pulse" />}
                </MotionDiv>
            </AnimatePresence>

            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6 pointer-events-none">
                <AnimatePresence mode="wait">

                    <MotionDiv
                        key={`content-${current}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="flex flex-col items-center max-w-4xl mx-auto pointer-events-auto"
                    >
                        {slide.subtitle && (
                            <h2 className="text-white text-base md:text-lg tracking-[0.3em] mb-3 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                                {language === 'zh' ? slide.subtitle : t('hero.subtitle')}
                            </h2>
                        )}

                        {slide.title && (
                            <h1 className="text-white font-bold mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-tight tracking-tight"
                                style={{ fontSize: 'clamp(1.5rem, 3.5vw + 1rem, 3.25rem)' }}>
                                {language === 'zh' ? slide.title.prefix : t('hero.title.prefix')}{' '}
                                {slide.title.highlight && (
                                    <span className="text-cuhk-secondary italic">
                    {language === 'zh' ? slide.title.highlight : t('hero.title.highlight')}
                  </span>
                                )}{' '}
                                {language === 'zh' ? slide.title.suffix : t('hero.title.suffix')}
                            </h1>
                        )}

                        {slide.description && (
                            <p className="text-gray-100 text-sm md:text-base mb-8 leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,1)] max-w-2xl">
                                {language === 'zh' ? slide.description : t('hero.description')}
                            </p>
                        )}


                        <MotionButton
                            style={{display:slide.path&&slide.title?'block':'none'}}
                            whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#750E6D' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={()=>slide.path?navigate(slide.path):''}
                            className="bg-cuhk-secondary text-white px-10 py-3 tracking-widest text-xs font-bold transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] uppercase pointer-events-auto"
                        >
                            {t('hero.button')}
                        </MotionButton>
                    </MotionDiv>
                </AnimatePresence>
            </div>


            <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white transition-colors bg-black/10 hover:bg-black/30 rounded-full hidden md:block">
                <ChevronLeft size={40} strokeWidth={1} />
            </button>
            <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white transition-colors bg-black/10 hover:bg-black/30 rounded-full hidden md:block">
                <ChevronRight size={40} strokeWidth={1} />
            </button>


            <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center cursor-pointer hover:text-cuhk-secondary transition-colors z-30 pointer-events-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                onClick={handleScrollDown}
            >
                <span className="text-[10px] uppercase tracking-[0.3em] mb-1 font-medium">{t('hero.scroll')}</span>
                <ChevronDown size={20} />
            </MotionDiv>
        </section>
    );
};

export default Hero;