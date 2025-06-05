import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFavorites, toggleFavorite } from '../Redux/slices/favoritesSlice'
import FavoritesList from '../components/Favorites/FavoritesList'
import BottomNavbar from '../components/BotomNavbar/BottomNavbar'
import { useNavigation } from '@react-navigation/native'

export default function Favorites() {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const userId = useSelector(state => state.auth.user?.id)
    const favorites = useSelector(state => state.favorites.list)
    const professionals = useSelector(state => state.professionals.list)
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

    const handlePressDoctor = (doctor) => {
        navigation.navigate('AppointmentDetail', { appointment: doctor })
    }

    return (
        <View className="flex-1 bg-background-light">
        <Text className="text-primary-light text-2xl font-bold text-center mt-12 mb-6">
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