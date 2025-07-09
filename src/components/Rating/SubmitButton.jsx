import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { useTranslation } from '../../hooks/useTranslation'

export default function SubmitButton({ onPress }) {
    const { t } = useTranslation()
    
    return (
        <TouchableOpacity onPress={onPress} className="bg-primary-light py-4 rounded-xl mt-6">
        <Text className="text-white text-center text-lg font-semibold">{t('send')}</Text>
        </TouchableOpacity>
    )
}
