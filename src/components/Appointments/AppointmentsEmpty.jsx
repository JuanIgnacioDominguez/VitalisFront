import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function AppointmentsEmpty({ navigation, darkMode }) {
    return (
        <View className="flex-1 items-center justify-center mt-10">
            <View className={`${darkMode ? 'bg-primary-dark' : 'bg-primary-light'} rounded-full w-44 h-44 items-center justify-center mb-8`}>
                <Text style={{ fontSize: 90 }} className="text-white">☹️</Text>
            </View>
            <Text className={`text-3xl font-bold text-center mb-8 leading-7 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                ¡No hay turnos{'\n'}Agendados!
            </Text>
            <TouchableOpacity
                className={`border-2 rounded-xl px-8 py-3 ${darkMode ? 'border-primary-dark' : 'border-primary-light'}`}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
            >
                <Text className={`text-xl font-bold ${darkMode ? 'text-primary-dark' : 'text-primary-light'}`}>Reserva tu turno</Text>
            </TouchableOpacity>
        </View>
    )
}