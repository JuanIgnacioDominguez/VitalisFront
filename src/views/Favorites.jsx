import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFavorites, toggleFavorite } from '../Redux/slices/favoritesSlice'
import FavoritesList from '../components/Favorites/FavoritesList'
import BottomNavbar from '../components/BotomNavbar/BottomNavbar'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../context/ThemeContext'

export default function Favorites() {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const userId = useSelector(state => state.auth.user?.id)
    const favorites = useSelector(state => state.favorites.list)
    const professionals = useSelector(state => state.professionals.list)
    const { darkMode } = useTheme()
    const favoriteDoctors = favorites
        .map(fav => professionals.find(doc => doc.id === fav.professionalId))
        .filter(Boolean)

    useEffect(() => {
        if (userId) dispatch(fetchFavorites(userId))
    }, [userId, dispatch])

    const handleToggleFavorite = (doctor) => {
        if (!userId) return
        dispatch(toggleFavorite({ userId, doctor }))
    }

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <Text className={`text-2xl font-bold text-center mt-12 mb-6 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                Vista de favoritos
            </Text>
            <FavoritesList
                doctors={favoriteDoctors}
                onPressDoctor={doctor => {
                    if (doctor) navigation.navigate('AppointmentDetail', { appointment: doctor })
                    else navigation.navigate('Home')
                }}
                onToggleFavorite={handleToggleFavorite}
            />
            <BottomNavbar />
        </View>
    )
}