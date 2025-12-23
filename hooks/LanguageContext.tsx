import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language, TranslationKey } from '@/locales/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 获取浏览器语言
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]);
    
    if (browserLang && browserLang.toLowerCase().startsWith('zh')) {
      return 'zh';
    }
    return 'en';
  };

  const [language, setLanguage] = useState<Language>(getBrowserLanguage());

  const t = (key: TranslationKey): string => {
    // @ts-ignore - simple type access
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};