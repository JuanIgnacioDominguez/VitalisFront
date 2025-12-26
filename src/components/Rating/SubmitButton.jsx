import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { useTranslation } from '../../hooks/useTranslation'

export default function SubmitButton({ onPress, loading = false, disabled = false }) {
    const { t } = useTranslation()
    
    return (
        <TouchableOpacity 
            onPress={onPress} 
            className="bg-primary-light py-4 rounded-xl mt-6"
            disabled={loading || disabled}
            style={{ opacity: (loading || disabled) ? 0.6 : 1 }}
        >
        {loading ? (
            <ActivityIndicator color="#fff" />
        ) : (
            <Text className="text-white text-center text-lg font-semibold">{t('send')}</Text>
        )}
        </TouchableOpacity>
    )
}
