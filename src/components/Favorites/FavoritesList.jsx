import React from 'react'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import DoctorSearchCard from '../Home/DoctorSearchCard'

export default function FavoritesList({ doctors, onPressDoctor, onToggleFavorite }) {
    if (doctors.length === 0) {
        return (
        <View className="flex-1 items-center justify-center mt-20 px-6p">
            <Text className="text-primary-light text-lg font-bold mb-4">¡No tienes favoritos aún!</Text>
            <View className="bg-quaternary-light rounded-full w-36 h-36 items-center justify-center mb-6">
            <Text style={{ fontSize: 80 }} className="text-primary-light">💔</Text>
            </View>
            <Text className="text-primary-light text-xl font-bold text-center mb-2">
            ¡No se encontraron favoritos!
            </Text>
            <Text className="text-secondary-light text-center mb-6">
            Agrega doctores a favoritos para verlos aquí.
            </Text>
            <TouchableOpacity
            className="bg-primary-light rounded-xl px-8 py-3"
            activeOpacity={0.8}
            onPress={() => onPressDoctor(null)}
            >
            <Text className="text-white text-lg font-bold">Volver a Inicio</Text>
            </TouchableOpacity>
        </View>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={{
                paddingBottom: 90,
                alignItems: 'center', 
            }}
        >
            {doctors.map(doctor => (
                <DoctorSearchCard
                    key={doctor.id}
                    doctor={doctor}
                    isFavorite={true}
                    onFavorite={() => onToggleFavorite(doctor)}
                    onPress={() => onPressDoctor(doctor)}
                />
            ))}
        </ScrollView>
    )
}