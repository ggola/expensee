import I18n from 'react-native-i18n';

// Import all locales
import en from './en.json';
import it from './it.json';
import da from './da.json';

// Fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Supported translations
I18n.translations = {
    en,
    it,
    da
};

// Method to localize strings
export function strings(name, params = {}) {
    return I18n.t(name, params);
};

export default I18n;