import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Home/Header'
import SearchBar from '../components/Home/SearchBar'
import Banner from '../components/Home/Banner'
import SpecialtiesGrid from '../components/Home/SpecialtiesGrid'
import BestDoctors from '../components/Home/BestDoctors'
import BottomNavbar from '../components/BotomNavbar/BottomNavbar'
import DoctorSearchResults from '../components/Home/DoctorSearchResults'
import { fetchProfessionals } from '../Redux/slices/professionalsSlice'

export default function Home({ navigation }) {
    const [search, setSearch] = useState('')
    const [favorites, setFavorites] = useState([])

    const dispatch = useDispatch()
    const { list: professionals, loading, error } = useSelector(state => state.professionals)

    useEffect(() => {
        dispatch(fetchProfessionals())
    }, [dispatch])

    const filteredDoctors = professionals.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase())
    )

    const handleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id)
                ? prev.filter(f => f !== id)
                : [...prev, id]
        )
    }

    const handleDoctorPress = (doctor) => {
        navigation.navigate('AppointmentDetail', { appointment: doctor })
    }

    return (
        <View className="flex-1 bg-background-light">
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
            <BottomNavbar />
        </View>
    )
}
