import React from 'react'
import { ScrollView, View } from 'react-native'
import Header from '../components/Home/Header'
import SearchBar from '../components/Home/SearchBar'
import Banner from '../components/Home/Banner'
import SpecialtiesGrid from '../components/Home/SpecialtiesGrid'
import BestDoctors from '../components/Home/BestDoctors'
import BottomNavbar from '../components/BotomNavbar/BottomNavbar'

export default function Home() {
    return (
        <View className="flex-1 bg-background-light">
        <ScrollView
            className="flex-1 px-4"
            contentContainerStyle={{ paddingTop: 24, paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
        >
            <Header />
            <SearchBar />
            <Banner />
            <SpecialtiesGrid />
            <BestDoctors />
        </ScrollView>
        <BottomNavbar />
        </View>
    )
}
