import { useLanguage } from '../context/LanguageContext'
import translations from '../translations'

export function useTranslation() {
    const { language } = useLanguage()
    
    const t = (key) => {
        const keys = key.split('.')
        let value = translations[language]
        
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k]
            } else {
                // Si no encuentra la traducción, devuelve la clave
                console.warn(`Translation missing for key: ${key} in language: ${language}`)
                return key
            }
        }
        
        return value || key
    }
    
    return { t, language }
}
