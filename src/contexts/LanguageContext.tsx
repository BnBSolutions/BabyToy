import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations, languageNames, languageFlags } from '@/i18n/translations';
import type { Language } from '@/i18n/translations';

export type { Language };

type TranslationKeys = typeof translations.fr;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  availableLanguages: Language[];
  languageNames: typeof languageNames;
  languageFlags: typeof languageFlags;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved && translations[saved] ? saved : 'fr';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  }, []);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    availableLanguages: ['fr', 'en', 'ro', 'ru'],
    languageNames,
    languageFlags,
  };

  return (
    <LanguageContext.Provider value={value}>
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
