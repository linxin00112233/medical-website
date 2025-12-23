import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../assets/constants';
import { cn } from '@/utils';
import { useLanguage } from '@/hooks/LanguageContext';
import { TranslationKey } from '@/locales/translations';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  
  // 背景颜色
  const headerBgClass = isScrolled 
    ? "bg-white/95 backdrop-blur-md shadow-md py-0" 
    : "bg-gradient-to-b from-black/60 to-transparent py-2";

  // 文字颜色
  const textColorClass = isScrolled ? 'text-cuhk-dark' : 'text-white';
  const logoTextMain = isScrolled ? 'text-cuhk-primary' : 'text-white';
  const logoTextSub = isScrolled ? 'text-gray-500' : 'text-gray-300';
  const borderColor = isScrolled ? 'border-gray-200' : 'border-white/20';

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out font-sans", headerBgClass)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={cn(
            "flex items-center justify-between transition-all duration-300",
            isScrolled ? "py-2" : "py-4"
          )}>
          
          <Link to="/" className="flex items-center space-x-3 group">
             <div className={cn(
               "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm",
               isScrolled ? "bg-cuhk-primary" : "bg-white"
             )}>
                <span className={cn(
                  "font-bold text-lg md:text-xl transition-colors duration-300",
                  isScrolled ? "text-white" : "text-cuhk-primary"
                )}>M</span>
             </div>
             <div className="flex flex-col">
               <span className={cn(
                 "text-[10px] md:text-xs uppercase tracking-wider transition-colors duration-300",
                 logoTextSub
               )}>{t('header.university')}</span>
               <span className={cn(
                 "text-lg md:text-2xl font-serif font-bold leading-none transition-colors duration-300 group-hover:text-cuhk-secondary",
                 logoTextMain
               )}>{t('header.school')}</span>
             </div>
          </Link>

          <div className={`hidden lg:flex items-center space-x-6 ${textColorClass}`}>
            <div className={cn(
              "flex items-center rounded-full px-3 py-1.5 transition-colors",
              isScrolled ? "bg-gray-100" : "bg-white/10 hover:bg-white/20"
            )}>
              <input 
                type="text" 
                placeholder={language === 'en' ? "Search..." : "搜索..."}
                className="bg-transparent border-none outline-none text-xs w-24 md:w-32 placeholder-current opacity-70" 
              />
              <Search size={14} className="opacity-70" />
            </div>

            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-1 hover:text-cuhk-secondary transition-colors text-sm font-bold tracking-wide"
            >
              <Globe size={16} />
              <span>{language === 'en' ? 'EN / 中' : '中 / EN'}</span>
            </button>
          </div>

          {/*手机端菜单按钮*/}
          <button 
            className="lg:hidden z-50 p-2 rounded-md transition-colors text-current"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className={cn("p-1 rounded", isScrolled ? "text-cuhk-primary" : "text-white")}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>

        <div className={cn("hidden lg:block w-full h-[1px]", borderColor)}></div>

        <nav className="hidden lg:flex justify-center items-center py-1">
          <ul className="flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              const linkKey = item.key as TranslationKey;
              return (
                <li key={item.key} className="relative group">
                  <Link
                    to={item.href}
                    className={cn(
                      "block px-5 py-3 text-sm font-medium uppercase tracking-wide transition-colors duration-200 relative z-10",
                      isActive 
                        ? "text-cuhk-secondary font-bold" 
                        : `${textColorClass} hover:text-cuhk-secondary`
                    )}
                  >
                    {t(linkKey)}
                  </Link>
                  <span className="absolute bottom-1 left-1/2 w-0 h-[2px] bg-cuhk-secondary transition-all duration-300 ease-out group-hover:w-4/5 -translate-x-1/2 opacity-0 group-hover:opacity-100"></span>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* 手机菜单遮罩层 */}
      <div className={cn(
        "fixed inset-0 bg-cuhk-primary/98 z-40 transform transition-transform duration-300 ease-in-out lg:hidden backdrop-blur-sm",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full pt-24 px-8 pb-8 overflow-y-auto">
          <div className="flex flex-col space-y-6">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              const linkKey = item.key as TranslationKey;
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={cn(
                    "text-2xl font-serif transition-colors border-b border-white/10 pb-4",
                    isActive 
                      ? "text-cuhk-secondary font-bold" 
                      : "text-white hover:text-cuhk-secondary"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(linkKey)}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto pt-8 flex flex-col space-y-6">
             <div className="flex items-center bg-white/10 rounded-lg p-3">
                <Search size={20} className="text-white mr-3" />
                <input 
                  type="text" 
                  placeholder={language === 'en' ? "Search..." : "搜索..."}
                  className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-full" 
                />
             </div>
             
             <button 
               onClick={() => {
                 toggleLanguage();
               }}
               className="flex items-center justify-center space-x-2 bg-white text-cuhk-primary py-3 rounded-lg font-bold"
             >
               <Globe size={20} />
               <span>{language === 'en' ? 'Switch to Chinese' : 'Switch to English'}</span>
             </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;