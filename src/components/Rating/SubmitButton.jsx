import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default function SubmitButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress} className="bg-primary-light py-4 rounded-xl mt-6">
        <Text className="text-white text-center text-lg font-semibold">Enviar</Text>
        </TouchableOpacity>
    )
}
