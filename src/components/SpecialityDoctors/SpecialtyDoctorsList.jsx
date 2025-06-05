import React from 'react'
import { View, Text } from 'react-native'
import DoctorSearchCard from '../Home/DoctorSearchCard'
import PropTypes from 'prop-types'

export default function SpecialtyDoctorsList({ doctors, loading, error, specialtyLabels, onDoctorPress }) {
    if (loading) {
        return <Text className="text-primary-light text-center mt-10">Cargando...</Text>
    }
    if (error) {
        return <Text className="text-red-500 text-center mt-10">{error}</Text>
    }
    if (doctors.length === 0) {
        return (
            <Text className="text-primary-light text-center mt-10">
                No hay doctores de esta especialidad.
            </Text>
        )
    }
    return (
        <View>
            {doctors.map(doctor => (
                <DoctorSearchCard
                    key={doctor.id}
                    doctor={doctor}
                    isFavorite={false}
                    onFavorite={() => {}}
                    onPress={() => onDoctorPress(doctor)}
                >
                    <Text>{specialtyLabels[doctor.specialty] || doctor.specialty}</Text>
                </DoctorSearchCard>
            ))}
        </View>
    )
}

SpecialtyDoctorsList.propTypes = {
    doctors: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    specialtyLabels: PropTypes.object.isRequired,
    onDoctorPress: PropTypes.func.isRequired,
}