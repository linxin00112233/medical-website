
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Play, Pause,Loader2 } from 'lucide-react';
import { useLanguage } from '@/hooks/LanguageContext';
import { HERO_SLIDES } from '@/assets/constants';
import { cn } from '@/utils';
import { useNavigate } from 'react-router-dom';
import {api} from '@/api';
const Hero: React.FC = () => {
  const navigate = useNavigate();
  const MotionDiv = motion.div as any;
  const MotionButton = motion.button as any;

  const { t, language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [slides, setSlides] = useState<any[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  // 初始化加载数据
    useEffect(() => {
    const fetchSlides = async () => {
        try {
        const data = await api.getHeroSlides();
        setSlides(data as any[]);
        setSlides(HERO_SLIDES);
      } catch (error) {
        console.error("Failed to load hero slides, using defaults.");
        setSlides(HERO_SLIDES);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);
  const nextSlide = useCallback(() => {
    setDirection(1);
    setIsMediaLoaded(false);
    setIsPlaying(true);
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setIsMediaLoaded(false);
    setIsPlaying(true);
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Handle video play/pause
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent slider trigger
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => console.log("Play failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  // Sync isPlaying state with video events
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    v.addEventListener('play', handlePlay);
    v.addEventListener('pause', handlePause);
    
    // Ensure it starts playing if it's supposed to
    if (HERO_SLIDES[current].type === 'video' && isPlaying) {
      v.play().catch(() => setIsPlaying(false));
    }

    return () => {
      v.removeEventListener('play', handlePlay);
      v.removeEventListener('pause', handlePause);
    };
  }, [current]);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('news');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

//   const slide = HERO_SLIDES[current];

  // Mobile Swipe Logic: trigger slide change based on drag distance
  const SWIPE_THRESHOLD = 50;
  const onDragEnd = (_: any, { offset }: any) => {
    const swipe = offset.x;
    if (swipe < -SWIPE_THRESHOLD) {
      nextSlide();
    } else if (swipe > SWIPE_THRESHOLD) {
      prevSlide();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? '100%' : '-100%',
      scale: 1.1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 1.2 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { duration: 0.5 }
    }),
    };
      // 数据加载中的骨架屏
  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#1a0218] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="text-cuhk-secondary animate-spin" size={40} />
        <span className="text-white/40 text-xs tracking-[0.3em] uppercase animate-pulse">Initializing Data...</span>
      </div>
    );
  }

  const slide = slides[current];
  if (!slide) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Media Layer with Drag support */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <MotionDiv
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing will-change-transform"
        >
          {slide.type === 'video' ? (
            <div className="relative w-full h-full">
              <div className={`absolute inset-0 bg-cuhk-primary/20 transition-opacity duration-1000 ${isMediaLoaded ? 'opacity-0' : 'opacity-100'}`} />
              
              <video
                ref={videoRef}
                src={slide.url}
                controls
                loop
                playsInline
                onLoadedData={() => setIsMediaLoaded(true)}
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-1000",
                  isMediaLoaded ? "opacity-100" : "opacity-0"
                )}
              />
              <div className="absolute inset-0 bg-black/30" />
              
              {/* Manual Video Control Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <MotionButton
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: isMediaLoaded ? 1 : 0 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="p-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white pointer-events-auto hover:bg-white/20 transition-all"
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} fill="white" />}
                </MotionButton>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full" onClick={()=>slide.path?navigate(slide.path):''}>
              <img 
                src={slide.url} 
                alt="Hero" 
                onLoad={() => setIsMediaLoaded(true)}
                className={cn(
                  "w-full h-full object-cover transition-all duration-1000",
                  isMediaLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                )}
                draggable="false" // Prevent native browser dragging
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          )}
        </MotionDiv>
      </AnimatePresence>

      {/* Content Layer - Pointer events set to none so drag reaches background */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6 pointer-events-none">
        <AnimatePresence mode="wait">
          <MotionDiv
            key={`content-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center max-w-4xl mx-auto"
          >
            {slide.subtitle && (
              <h2 className="text-white text-sm md:text-lg tracking-[0.3em] mb-4 font-light drop-shadow-md">
                {language === 'zh' ? slide.subtitle : t('hero.subtitle')}
              </h2>
            )}
            
            {slide.title && (
              <h1 className="text-white font-bold mb-8 drop-shadow-xl leading-tight" 
                  style={{ fontSize: 'clamp(1.5rem, 6vw, 3.5rem)' }}>
                {language === 'zh' ? slide.title.prefix : t('hero.title.prefix')}{' '}
                {slide.title.highlight && (
                  <span className="text-cuhk-secondary italic font-serif">
                    {language === 'zh' ? slide.title.highlight : t('hero.title.highlight')}
                  </span>
                )}{' '}
                {language === 'zh' ? slide.title.suffix : t('hero.title.suffix')}
              </h1>
            )}

            <MotionButton
              style={{display:slide.path&&slide.title?'block':'none'}}
              whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#750E6D' }}
              whileTap={{ scale: 0.95 }}
              onClick={()=> navigate(slide.path!)}
              className="bg-cuhk-secondary text-white px-10 py-3.5 tracking-widest text-xs font-bold transition-all duration-300 shadow-2xl uppercase pointer-events-auto"
            >
              {t('hero.button')}
            </MotionButton>
          </MotionDiv>
        </AnimatePresence>
      </div>

      {/* Navigation - Hidden on small mobile to favor swipe */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 hidden md:flex justify-between px-6 z-30 pointer-events-none">
        <button onClick={prevSlide} className="p-3 text-white/50 hover:text-white transition-all bg-black/10 hover:bg-black/30 rounded-full pointer-events-auto backdrop-blur-sm">
          <ChevronLeft size={32} strokeWidth={1.5} />
        </button>
        <button onClick={nextSlide} className="p-3 text-white/50 hover:text-white transition-all bg-black/10 hover:bg-black/30 rounded-full pointer-events-auto backdrop-blur-sm">
          <ChevronRight size={32} strokeWidth={1.5} />
        </button>
      </div>

      {/* Scroll Indicator */}
      <MotionDiv 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center cursor-pointer z-30 pointer-events-auto opacity-70 hover:opacity-100 transition-opacity"
        onClick={handleScrollDown}
      >
        <span className="text-[9px] uppercase tracking-[0.4em] mb-2">{t('hero.scroll')}</span>
        <ChevronDown size={18} />
      </MotionDiv>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 right-12 z-30 flex space-x-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={cn(
              "h-1 transition-all duration-500 rounded-full",
              current === i ? "w-8 bg-cuhk-secondary" : "w-4 bg-white/30"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
