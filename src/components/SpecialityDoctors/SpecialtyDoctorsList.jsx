import React from 'react'
import { View, Text } from 'react-native'
import DoctorSearchCard from '../Home/DoctorSearchCard'
import PropTypes from 'prop-types'
import { useTranslation } from '../../hooks/useTranslation'
import { getSpecialtyTranslation } from '../../utils/translationUtils'

export default function SpecialtyDoctorsList({
    doctors,
    loading,
    error,
    onDoctorPress,
    favorites,
    onToggleFavorite,
    specialty 
}) {
    const { t } = useTranslation()
    
    if (loading) {
        return <Text className="text-primary-light text-center mt-10">{t('loading')}</Text>
    }
    if (error) {
        return <Text className="text-red-500 text-center mt-10">{error}</Text>
    }
    if (doctors.length === 0) {
        return (
            <Text className="text-primary-light text-center mt-10">
                {t('noDoctorsSpecialty')}
            </Text>
        )
    }
    return (
        <View>
            {doctors.map(doctor => (
                <DoctorSearchCard
                    key={doctor.id}
                    doctor={doctor}
                    isFavorite={favorites.some(f => f.professionalId === doctor.id)}
                    onFavorite={() => onToggleFavorite(doctor)}
                    onPress={() => onDoctorPress(doctor)}
                >
                    <Text>{getSpecialtyTranslation(doctor.specialty, t)}</Text>
                </DoctorSearchCard>
            ))}
        </View>
    )
}

SpecialtyDoctorsList.propTypes = {
    doctors: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    onDoctorPress: PropTypes.func.isRequired,
    favorites: PropTypes.array,
    onToggleFavorite: PropTypes.func,
    specialty: PropTypes.string.isRequired,
}