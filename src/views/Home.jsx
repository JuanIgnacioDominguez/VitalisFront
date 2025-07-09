import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Home/Header'
import SearchBar from '../components/Home/SearchBar'
import Banner from '../components/Home/Banner'
import SpecialtiesGrid from '../components/Home/SpecialtiesGrid'
import BestDoctors from '../components/Home/BestDoctors'
import DoctorSearchResults from '../components/Home/DoctorSearchResults'
import { fetchProfessionals } from '../Redux/slices/professionalsSlice'
import { fetchFavorites, toggleFavorite } from '../Redux/slices/favoritesSlice'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from '../hooks/useTranslation'

export default function Home({ navigation }) {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const { list: professionals, loading, error } = useSelector(state => state.professionals)
    const userId = useSelector(state => state.auth.user?.id)
    const favorites = useSelector(state => state.favorites.list)
    const { darkMode } = useTheme()
    const { t } = useTranslation() 

    useEffect(() => {
        dispatch(fetchProfessionals())
    }, [dispatch])

    useEffect(() => {
        if (userId) dispatch(fetchFavorites(userId))
    }, [userId, dispatch])

    const filteredDoctors = professionals.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase())
    )

    const handleFavorite = (doctor) => {
        if (!userId) return
        dispatch(toggleFavorite({ userId, doctor }))
    }

    const handleDoctorPress = (doctor) => {
        navigation.navigate('AppointmentDetail', { appointment: doctor })
    }

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <View className="flex-1 p-5 pb-20">
                <Header />
                <SearchBar value={search} onChangeText={setSearch} />
                {search.length > 0 ? (
                    <DoctorSearchResults
                        doctors={filteredDoctors}
                        loading={loading}
                        error={error}
                        favorites={favorites}
                        onFavorite={handleFavorite}
                        onPress={handleDoctorPress}
                    />
                ) : (
                    <>
                        <Banner />
                        <SpecialtiesGrid />
                        <BestDoctors />
                    </>
                )}
            </View>
        </View>
    )
}
