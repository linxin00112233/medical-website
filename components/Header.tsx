import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '@/assets/constants';
import { cn } from '@/utils';
import { useLanguage } from '@/hooks/LanguageContext';
import { TranslationKey } from '@/locales/translations';
import logoSrc from '@/images/logo.svg';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

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

    const toggleLanguage = (lang: 'en' | 'zh') => {
        setLanguage(lang);
        setIsLangDropdownOpen(false);
    };

    const closeSearch = () => {
        setSearchValue('');
        setIsSearchOpen(false);
    };

    const headerBgClass = isScrolled
        ? "bg-white shadow-md py-0"
        : "bg-transparent py-2 md:py-4";

    const textColorClass = isScrolled ? 'text-gray-800' : 'text-white';
    const activeLinkClass = "text-cuhk-primary";
    const hoverLinkClass = "hover:text-cuhk-primary";

    return (
        <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", headerBgClass)}>

            <div className="w-full px-3 md:px-6 lg:px-10">
                <div className="flex items-center justify-between h-20 lg:h-24">


                    <Link to="/" className="flex items-center shrink-0">
                        <img
                            src={logoSrc}
                            alt="CUHK-Shenzhen Medicine Logo"
                            className={cn(
                                "h-10 md:h-14 lg:h-16 w-auto object-contain transition-all duration-300",
                                !isScrolled && "brightness-0 invert"
                            )}
                        />
                    </Link>


                    <nav className="hidden xl:flex items-center justify-center flex-1 mx-4 overflow-hidden">
                        <ul className="flex items-center space-x-1 lg:space-x-2">
                            {NAV_ITEMS.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                    <li key={item.key}>
                                        <Link
                                            to={item.href}
                                            className={cn(
                                                "px-2 lg:px-3 py-2 text-[15px] lg:text-[16px] font-bold transition-colors whitespace-nowrap",
                                                isActive ? activeLinkClass : cn(textColorClass, hoverLinkClass)
                                            )}
                                        >
                                            {t(item.key as TranslationKey)}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>


                    <div className="flex items-center space-x-2 md:space-x-4 shrink-0">


                        <div className="relative flex items-center h-10">
                            <AnimatePresence mode="wait">
                                {isSearchOpen ? (
                                    <motion.div
                                        key="search-open"
                                        initial={{ width: 40, opacity: 0 }}
                                        animate={{ width: 180, opacity: 1 }}
                                        exit={{ width: 40, opacity: 0 }}
                                        className={cn(
                                            "flex items-center px-2 py-1.5 rounded-full border",
                                            isScrolled ? "bg-gray-100 border-gray-200" : "bg-white/20 border-white/30"
                                        )}
                                    >
                                        <Search size={16} className={cn("shrink-0", isScrolled ? "text-cuhk-primary" : "text-white")} />
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            placeholder={language === 'zh' ? "搜索" : "Search"}
                                            className={cn(
                                                "bg-transparent border-none outline-none text-sm w-full ml-1",
                                                isScrolled ? "text-gray-800 placeholder-gray-500" : "text-white placeholder-white/70"
                                            )}
                                        />
                                        <button onClick={closeSearch} className="shrink-0 hover:scale-110 transition-transform">
                                            <X size={14} className={isScrolled ? "text-gray-400" : "text-white/60"} />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        key="search-icon"
                                        onClick={() => setIsSearchOpen(true)}
                                        className={cn("p-2 transition-colors", textColorClass, "hover:text-cuhk-primary")}
                                    >
                                        <Search size={22} />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>


                        <div className="relative shrink-0">
                            <button
                                className={cn(
                                    "flex items-center space-x-1 py-2 px-1 text-[14px] lg:text-[15px] font-bold transition-colors uppercase tracking-widest whitespace-nowrap",
                                    textColorClass, "hover:text-cuhk-primary"
                                )}
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                            >
                                <span>{language === 'zh' ? '中文' : 'English'}</span>
                                <ChevronDown size={16} className={cn("transition-transform", isLangDropdownOpen ? "rotate-180" : "")} />
                            </button>

                            <AnimatePresence>
                                {isLangDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 top-full mt-2 bg-white shadow-2xl rounded-md overflow-hidden min-w-[120px] py-1 ring-1 ring-black ring-opacity-5"
                                    >
                                        <button
                                            onClick={() => toggleLanguage('zh')}
                                            className={cn(
                                                "w-full text-left px-4 py-2.5 text-[14px] font-bold transition-colors",
                                                language === 'zh' ? "text-[#750E6D] bg-gray-50" : "text-gray-700 hover:bg-gray-50"
                                            )}
                                        >
                                            中文
                                        </button>
                                        <button
                                            onClick={() => toggleLanguage('en')}
                                            className={cn(
                                                "w-full text-left px-4 py-2.5 text-[14px] font-bold transition-colors",
                                                language === 'en' ? "text-[#750E6D] bg-gray-50" : "text-gray-700 hover:bg-gray-50"
                                            )}
                                        >
                                            English
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>


                        <button
                            className={cn("xl:hidden p-2 transition-colors shrink-0", textColorClass)}
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </div>


            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 z-[60]"
                        />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white z-[70] shadow-2xl p-6 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <div className="shrink-0">
                                    <img src={logoSrc} alt="Logo" className="h-10 w-auto" />
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)}>
                                    <X size={32} className="text-gray-400 hover:text-gray-600" />
                                </button>
                            </div>

                            <nav className="space-y-1 overflow-y-auto">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.key}
                                        to={item.href}
                                        className="block py-4 text-lg font-bold text-gray-800 border-b border-gray-100 last:border-0 hover:text-cuhk-primary"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {t(item.key as TranslationKey)}
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-auto pt-10">
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => { toggleLanguage('zh'); setIsMobileMenuOpen(false); }}
                                        className={cn("flex-1 py-4 text-base font-bold rounded-lg border", language === 'zh' ? "bg-cuhk-primary text-white" : "text-gray-700")}
                                    >中文</button>
                                    <button
                                        onClick={() => { toggleLanguage('en'); setIsMobileMenuOpen(false); }}
                                        className={cn("flex-1 py-4 text-base font-bold rounded-lg border", language === 'en' ? "bg-cuhk-primary text-white" : "text-gray-700")}
                                    >English</button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;