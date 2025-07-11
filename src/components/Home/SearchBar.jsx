import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { useTranslation } from '../../hooks/useTranslation'
import { useTheme } from '../../context/ThemeContext'

export default function SearchBar({ value, onChangeText }) {
    const { t } = useTranslation()
    const { darkMode } = useTheme()
    
    return (
        <View className={`flex-row items-center ${darkMode ? 'bg-quaternary-dark' : 'bg-components-light'} rounded-xl px-2 py-1 mb-4`}>
            <MagnifyingGlassIcon 
                size={24} 
                color={darkMode ? "#07919A" : "#006A71"} 
            />
            <TextInput
                className={`ml-2 flex-1 text-base ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}
                placeholder={t('searchDoctor')}
                placeholderTextColor={darkMode ? "#7A8D8F" : "#7A8D8F"}
                value={value}
                onChangeText={onChangeText}
            />
            {value.length > 0 && (
                <TouchableOpacity
                    onPress={() => onChangeText('')}
                    className="ml-2"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <XMarkIcon size={22} color="#F05C5F" />
                </TouchableOpacity>
            )}
        </View>
    )
}