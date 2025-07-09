import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import SpecialtyHeader from '../../components/SpecialityDoctors/SpecialtyHeader'
import SpecialtyDoctorsList from '../../components/SpecialityDoctors/SpecialtyDoctorsList'
import { fetchFavorites, toggleFavorite } from '../../Redux/slices/favoritesSlice'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from '../../hooks/useTranslation'
import { getSpecialtyTranslation } from '../../utils/translationUtils'

function SpecialtyDoctors({ route, navigation }) {
    const { specialty } = route.params
    const professionals = useSelector(state => state.professionals.list)
    const loading = useSelector(state => state.professionals.loading)
    const error = useSelector(state => state.professionals.error)
    const userId = useSelector(state => state.auth.user?.id)
    const favorites = useSelector(state => state.favorites.list)
    const dispatch = useDispatch()
    const { darkMode } = useTheme()
    const { t } = useTranslation()

    useEffect(() => {
        if (userId) dispatch(fetchFavorites(userId))
    }, [userId, dispatch])

    const handleToggleFavorite = (doctor) => {
        if (!userId) return
        dispatch(toggleFavorite({ userId, doctor }))
    }

    const filteredDoctors = professionals.filter(
        d => d.specialty?.toUpperCase() === specialty.toUpperCase()
    )

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <SpecialtyHeader title={getSpecialtyTranslation(specialty, t)} onBack={navigation.goBack} />
            <View className="flex-1 px-5">
                <SpecialtyDoctorsList
                    doctors={filteredDoctors}
                    loading={loading}
                    error={error}
                    onDoctorPress={doctor => navigation.navigate('AppointmentsSchedule', { professional: doctor })}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                    specialty={route.params.specialty}
                />
            </View>
        </View>
    )
}

SpecialtyDoctors.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            specialty: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired
    }).isRequired
}

export default SpecialtyDoctors