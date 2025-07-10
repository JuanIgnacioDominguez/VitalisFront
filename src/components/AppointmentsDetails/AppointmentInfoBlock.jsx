import React from 'react'
import { Text } from 'react-native'

export default function AppointmentInfoBlock({ label, value }) {
    return (
        <>
            <Text className="font-bold text-primary-light mb-1">{label}</Text>
            <Text className="mb-3 text-primary-light">{value}</Text>
        </>
    )
}