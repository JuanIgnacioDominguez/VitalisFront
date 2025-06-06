import React from 'react'
import { ActivityIndicator } from 'react-native'

export default function Spinner({ darkMode }) {
    return (
        <ActivityIndicator size="large" color={darkMode ? "#07919A" : "#006A71"} style={{ marginTop: 40 }} />
    )
}