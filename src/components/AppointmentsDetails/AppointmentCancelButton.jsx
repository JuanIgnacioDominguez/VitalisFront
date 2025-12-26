import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { useTranslation } from '../../hooks/useTranslation'

export default function AppointmentCancelButton({ onCancel, loading }) {
    const { t } = useTranslation()
    return (
        <TouchableOpacity
            className="rounded-xl py-3 mt-4"
            style={{ backgroundColor: '#F76C6C' }}
            onPress={onCancel}
            disabled={loading}
            activeOpacity={0.85}
        >
            <Text className="text-white text-center text-lg font-bold">
                {loading ? t('canceling') : t('cancelAppointment')}
            </Text>
        </TouchableOpacity>
    )
}