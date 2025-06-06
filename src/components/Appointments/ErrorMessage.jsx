import React from 'react'
import { Text } from 'react-native'

export default function ErrorMessage({ error }) {
    return (
        <Text className="text-red-500 text-center mt-10">{error}</Text>
    )
}