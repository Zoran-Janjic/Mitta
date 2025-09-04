import en from './en.json';
import ja from './ja.json';

export const translations = {
  en,
  ja,
};

export type SupportedLanguage = keyof typeof translations;
