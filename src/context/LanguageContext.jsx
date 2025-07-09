import React, { createContext, useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('es') // 'es' para español, 'en' para inglés

    const changeLanguage = async (newLanguage) => {
        setLanguage(newLanguage)
        try {
            await AsyncStorage.setItem('selectedLanguage', newLanguage)
        } catch (error) {
            console.log('Error saving language preference:', error)
        }
    }

    // Función para cargar el idioma guardado al iniciar la app
    const loadSavedLanguage = async () => {
        try {
            const savedLanguage = await AsyncStorage.getItem('selectedLanguage')
            if (savedLanguage) {
                setLanguage(savedLanguage)
            }
        } catch (error) {
            console.log('Error loading saved language:', error)
        }
    }

    return (
        <LanguageContext.Provider value={{ 
            language, 
            changeLanguage, 
            loadSavedLanguage 
        }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
