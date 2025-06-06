import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default function BookButton({ onPress, disabled, booking, darkMode, selectedSlot }) {
    return (
        <TouchableOpacity
            className={`mx-6 mt-2 py-4 rounded-xl ${selectedSlot
                ? (darkMode ? 'bg-primary-dark' : 'bg-primary-light')
                : 'bg-gray-400'}`}
            disabled={disabled}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <Text className="text-white text-lg font-bold text-center">
                {booking ? 'Reservando...' : 'Reservar turno'}
            </Text>
        </TouchableOpacity>
    )
}