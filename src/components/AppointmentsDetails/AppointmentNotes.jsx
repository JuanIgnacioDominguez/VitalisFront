import React from 'react'
import { Text } from 'react-native'

export default function AppointmentNotes({ notes }) {
    return (
        <>
            <Text className="font-bold text-primary-light mb-1">Notas adicionales</Text>
            <Text className="mb-3 text-primary-light">{notes}</Text>
        </>
    )
}