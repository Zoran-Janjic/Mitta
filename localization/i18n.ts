import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "./translations";

const STORE_LANGUAGE_KEY = "settings.lang";

// Dynamically import AsyncStorage only when needed
let AsyncStorage: any = null;

const languageDetectorPlugin = {
  type: "languageDetector" as const,
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    // More robust web detection
    const isWeb = typeof window !== "undefined" && typeof document !== "undefined";
    
    try {
      if (isWeb) {
        // Web environment - use localStorage
        try {
          const lsLang = window.localStorage?.getItem(STORE_LANGUAGE_KEY);
          if (lsLang) return callback(lsLang);

          // Try navigator language (en-US -> en)
          const nav = (navigator?.language || "en").split("-")[0];
          return callback(nav || "en");
        } catch {
          console.warn("i18n: web language detection failed");
          return callback("en");
        }
      } else {
        // Native environment - dynamically import AsyncStorage
        try {
          if (!AsyncStorage) {
            AsyncStorage = (await import("@react-native-async-storage/async-storage")).default;
          }
          const language = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
          if (language) return callback(language);
          return callback("en");
        } catch (nativeError) {
          console.warn("i18n: native storage failed, falling back to en", nativeError);
          return callback("en");
        }
      }
    } catch (error) {
      console.log("Error reading language", error);
      return callback("en");
    }
  },
  cacheUserLanguage: async function (language: string) {
    const isWeb = typeof window !== "undefined" && typeof document !== "undefined";
    
    try {
      if (isWeb) {
        // Web environment - use localStorage
        try {
          window.localStorage?.setItem(STORE_LANGUAGE_KEY, language);
        } catch {
          // ignore localStorage errors
        }
      } else {
        // Native environment - dynamically import AsyncStorage
        try {
          if (!AsyncStorage) {
            AsyncStorage = (await import("@react-native-async-storage/async-storage")).default;
          }
          await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
        } catch {
          // ignore AsyncStorage errors
        }
      }
    } catch {
      // ignore cache errors
    }
  },
};

const resources = {
  en: {
    translation: translations.en,
  },
  ja: {
    translation: translations.ja,
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    resources,
    compatibilityJSON: "v4",
    // fallback language is set to english
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
