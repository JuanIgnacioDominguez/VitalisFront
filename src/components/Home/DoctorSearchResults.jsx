import React from 'react'
import { ScrollView, Text, ActivityIndicator } from 'react-native'
import DoctorSearchCard from './DoctorSearchCard'

export default function DoctorSearchResults({ doctors, loading, error, favorites, onFavorite, onPress }) {
    if (loading) return <ActivityIndicator size="large" color="#006A71" style={{ marginTop: 40 }} />
    if (error) return <Text className="text-red-500 text-center mt-10">{error}</Text>
    if (doctors.length === 0) {
        return (
            <Text className="text-primary-light text-center mt-10">
                No se encontraron doctores.
            </Text>
        )
    }

    return (
        <ScrollView>
            {doctors.map((doctor) => (
                <DoctorSearchCard
                    key={doctor.id}
                    doctor={doctor}
                    isFavorite={favorites.some(f => f.professionalId === doctor.id)}
                    onFavorite={() => onFavorite(doctor)}
                    onPress={() => onPress(doctor)}
                />
            ))}
        </ScrollView>
    )
}