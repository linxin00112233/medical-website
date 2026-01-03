
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, ChevronDown, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '@/assets/constants';
import { cn } from '@/utils';
import { useLanguage } from '../hooks/LanguageContext';
import { TranslationKey } from '../locales/translations';
import logoSrc from '@/images/logo.svg'

const Header: React.FC = () => {
  // Fix: Cast motion.div to any to avoid property errors in this environment
  const MotionDiv = motion.div as any;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  const closeSearch = () => {
    setSearchValue('');
    setIsSearchOpen(false);
  };

  // Helper to check if a main menu item or any of its children is active
  const isItemActive = (item: any) => {
    if (location.pathname === item.href) return true;
    if (item.subItems) {
      return item.subItems.some((sub: any) => location.pathname === sub.href);
    }
    return false;
  };

  const isHomePage = location.pathname === '/';
  const shouldShowSolidHeader = !isHomePage || isScrolled;

  const headerBgClass = shouldShowSolidHeader
      ? "bg-white shadow-lg py-0 border-b border-gray-100"
      : "bg-transparent py-2 md:py-4";

  const textColorClass = shouldShowSolidHeader ? 'text-gray-800' : 'text-white';

  return (
      <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out", headerBgClass)}>
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">

            {/* LOGO */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                  src={logoSrc}
                  alt="CUHK-Shenzhen Medicine Logo"
                  className={cn(
                      "h-10 md:h-14 lg:h-16 w-auto object-contain transition-all duration-500",
                      !shouldShowSolidHeader && "brightness-0 invert"
                  )}
              />
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden xl:flex items-center justify-center flex-1 mx-4 h-full">
              <ul className="flex items-center h-full">
                {NAV_ITEMS.map((item) => {
                  const isActive = isItemActive(item);
                  const hasSubItems = item.subItems && item.subItems.length > 0;
                  const isDirectLink = !hasSubItems;

                  return (
                      <li
                          key={item.key}
                          className="relative h-full flex items-center"
                          onMouseEnter={() => !isDirectLink && setActiveDropdown(item.key)}
                          onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {isDirectLink ? (
                            <Link
                                to={item.href}
                                className={cn(
                                    "px-4 py-2 text-[15px] font-bold transition-all duration-300 whitespace-nowrap relative group",
                                    isActive ? "text-cuhk-primary" : cn(textColorClass, "hover:text-cuhk-primary")
                                )}
                            >
                              {t(item.key as TranslationKey)}
                              <span className={cn(
                                  "absolute bottom-0 left-4 right-4 h-0.5 bg-cuhk-primary transform transition-transform duration-300",
                                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                              )} />
                            </Link>
                        ) : (
                            <div className="h-full flex items-center relative">
                        <span
                            className={cn(
                                "px-4 py-2 text-[15px] font-bold transition-colors whitespace-nowrap cursor-default flex items-center group relative",
                                isActive || activeDropdown === item.key ? "text-cuhk-primary" : textColorClass,
                                "hover:text-cuhk-primary"
                            )}
                        >
                          {t(item.key as TranslationKey)}
                          <ChevronDown
                              size={14}
                              className={cn(
                                  "ml-1.5 transition-transform duration-300",
                                  activeDropdown === item.key ? "rotate-180" : "opacity-40"
                              )}
                          />
                          <span className={cn(
                              "absolute bottom-0 left-4 right-4 h-0.5 bg-cuhk-primary transform transition-transform duration-300",
                              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          )} />
                        </span>

                              <AnimatePresence>
                                {activeDropdown === item.key && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1">
                                      <MotionDiv
                                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                          animate={{ opacity: 1, y: 0, scale: 1 }}
                                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                          transition={{ duration: 0.2, ease: "easeOut" }}
                                          className="relative min-w-[220px] bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] rounded-md border border-gray-100 overflow-hidden"
                                      >
                                        <ul className="py-2">
                                          {item.subItems?.map((sub) => {
                                            const isSubActive = location.pathname === sub.href;
                                            return (
                                                <li key={sub.key}>
                                                  <Link
                                                      to={sub.href}
                                                      className={cn(
                                                          "group/item flex items-center px-6 py-3 text-[14px] font-bold transition-all relative overflow-hidden",
                                                          isSubActive ? "text-cuhk-primary bg-cuhk-primary/5" : "text-gray-700 hover:text-cuhk-primary hover:bg-gray-50"
                                                      )}
                                                      onClick={() => setActiveDropdown(null)}
                                                  >
                                          <span className={cn(
                                              "absolute left-0 w-1 transition-all duration-200 bg-cuhk-primary",
                                              isSubActive ? "h-full" : "h-0 group-hover/item:h-full"
                                          )} />
                                                    <span className={cn(
                                                        "relative z-10 transition-transform duration-200",
                                                        isSubActive ? "translate-x-1" : "translate-x-0 group-hover/item:translate-x-1"
                                                    )}>
                                            {t(sub.key as TranslationKey)}
                                          </span>
                                                  </Link>
                                                </li>
                                            );
                                          })}
                                        </ul>
                                      </MotionDiv>
                                    </div>
                                )}
                              </AnimatePresence>
                            </div>
                        )}
                      </li>
                  );
                })}
              </ul>
            </nav>

            {/* RIGHT TOOLS */}
            <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
              {/* Search */}
              <div className="relative flex items-center h-10">
                <AnimatePresence mode="wait">
                  {isSearchOpen ? (
                      <MotionDiv
                          key="search-open"
                          initial={{ width: 40, opacity: 0 }}
                          animate={{ width: 220, opacity: 1 }}
                          exit={{ width: 40, opacity: 0 }}
                          className={cn(
                              "flex items-center px-3 py-1.5 rounded-full border transition-colors",
                              shouldShowSolidHeader ? "bg-gray-100 border-gray-200" : "bg-white/10 border-white/20"
                          )}
                      >
                        <Search size={18} className={cn("shrink-0", shouldShowSolidHeader ? "text-cuhk-primary" : "text-white")} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder={language === 'zh' ? "搜索..." : "Search..."}
                            className={cn(
                                "bg-transparent border-none outline-none text-[14px] w-full ml-2",
                                shouldShowSolidHeader ? "text-gray-800 placeholder-gray-400" : "text-white placeholder-white/50"
                            )}
                        />
                        <button onClick={closeSearch} className="shrink-0 p-1">
                          <X size={14} className={shouldShowSolidHeader ? "text-gray-400" : "text-white"} />
                        </button>
                      </MotionDiv>
                  ) : (
                      <button
                          onClick={() => setIsSearchOpen(true)}
                          className={cn("p-2.5 transition-transform hover:scale-110", textColorClass, "hover:text-cuhk-primary")}
                      >
                        <Search size={22} />
                      </button>
                  )}
                </AnimatePresence>
              </div>

              {/* NEW Language Toggle Button */}
              <button
                  onClick={toggleLanguage}
                  className={cn(
                      "flex items-center space-x-2 py-2 px-3 text-[14px] font-bold transition-all border border-transparent rounded-sm group",
                      textColorClass,
                      "hover:text-cuhk-primary hover:bg-cuhk-primary/5"
                  )}
              >
                <Globe size={18} className="group-hover:text-cuhk-primary transition-colors" />
                <span>{language === 'zh' ? 'English' : '中文'}</span>
              </button>

              {/* Mobile Nav Button */}
              <button
                  className={cn("xl:hidden p-2 transition-colors", textColorClass)}
                  onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE SIDEBAR */}
        <AnimatePresence>
          {isMobileMenuOpen && (
              <>
                <MotionDiv
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
                />
                <MotionDiv
                    initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col"
                >
                  <div className="flex justify-between items-center p-6 border-b border-gray-50">
                    <img src={logoSrc} alt="Logo" className="h-10 w-auto" />
                    <button onClick={() => setIsMobileMenuOpen(false)}>
                      <X size={28} className="text-gray-400" />
                    </button>
                  </div>

                  <nav className="flex-1 overflow-y-auto px-6 py-4">
                    {NAV_ITEMS.map((item) => {
                      const hasSubItems = item.subItems && item.subItems.length > 0;
                      const isActive = isItemActive(item);

                      return (
                          <div key={item.key} className="mb-2">
                            {!hasSubItems ? (
                                <Link
                                    to={item.href}
                                    className={cn(
                                        "flex items-center py-4 text-lg font-bold border-b border-gray-50 transition-colors",
                                        isActive ? "text-cuhk-primary" : "text-gray-800 hover:text-cuhk-primary"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {t(item.key as TranslationKey)}
                                </Link>
                            ) : (
                                <div className="py-4">
                          <span className={cn(
                              "flex items-center text-sm font-bold tracking-widest uppercase mb-3",
                              isActive ? "text-cuhk-primary" : "text-gray-400"
                          )}>
                            {t(item.key as TranslationKey)}
                          </span>
                                  <div className="grid grid-cols-1 gap-1 pl-2">
                                    {item.subItems?.map(sub => {
                                      const isSubActive = location.pathname === sub.href;
                                      return (
                                          <Link
                                              key={sub.key}
                                              to={sub.href}
                                              className={cn(
                                                  "block py-2.5 text-[16px] font-bold transition-colors",
                                                  isSubActive ? "text-cuhk-primary" : "text-gray-700 hover:text-cuhk-primary"
                                              )}
                                              onClick={() => setIsMobileMenuOpen(false)}
                                          >
                                            {t(sub.key as TranslationKey)}
                                          </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                            )}
                          </div>
                      );
                    })}
                  </nav>

                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <div className="flex gap-4">
                      <button
                          onClick={() => { setLanguage('zh'); setIsMobileMenuOpen(false); }}
                          className={cn(
                              "flex-1 py-3.5 text-sm font-bold rounded-xl transition-all",
                              language === 'zh' ? "bg-cuhk-primary text-white shadow-md" : "bg-white text-gray-600 border border-gray-200"
                          )}
                      >中文</button>
                      <button
                          onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }}
                          className={cn(
                              "flex-1 py-3.5 text-sm font-bold rounded-xl transition-all",
                              language === 'en' ? "bg-cuhk-primary text-white shadow-md" : "bg-white text-gray-600 border border-gray-200"
                          )}
                      >English</button>
                    </div>
                  </div>
                </MotionDiv>
              </>
          )}
        </AnimatePresence>
      </header>
  );
};

export default Header;
