import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function AppointmentsHeader({ tab, setTab, darkMode }) {
    return (
        <View className="pt-12 pb-4 px-6">
            <Text className={`text-2xl font-bold text-center mb-7 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>Vista de Turnos</Text>
            <View className="flex-row justify-center mb-7">
                <TouchableOpacity
                    className={`flex-1 mr-2 py-2 rounded-full border-2 ${tab === 'Pendientes' ? (darkMode ? 'bg-primary-dark border-primary-dark' : 'bg-primary-light border-primary-light') : (darkMode ? 'border-primary-dark bg-transparent' : 'border-primary-light bg-transparent')}`}
                    onPress={() => setTab('Pendientes')}
                    activeOpacity={0.8}
                >
                    <Text className={`text-base font-semibold text-center ${tab === 'Pendientes' ? 'text-white' : (darkMode ? 'text-primary-dark' : 'text-primary-light')}`}>Pendientes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-1 py-2 rounded-full border-2 ${tab === 'Completados' ? (darkMode ? 'bg-primary-dark border-primary-dark' : 'bg-primary-light border-primary-light') : (darkMode ? 'border-primary-dark bg-transparent' : 'border-primary-light bg-transparent')}`}
                    onPress={() => setTab('Completados')}
                    activeOpacity={0.8}
                >
                    <Text className={`text-base font-semibold text-center ${tab === 'Completados' ? 'text-white' : (darkMode ? 'text-primary-dark' : 'text-primary-light')}`}>Completados</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}