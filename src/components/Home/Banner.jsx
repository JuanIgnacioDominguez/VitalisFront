import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

export default function Banner() {
  return (
    <View className="bg-primary-light rounded-2xl flex-row items-center p-4 mb-6">
      <View className="flex-1">
        <Text className="text-white text-xl font-bold mb-2 leading-7">
          Tu salud es nuestra{'\n'}Prioridad
        </Text>
        <TouchableOpacity className="bg-warning rounded-lg px-4 py-2 mt-2 self-start">
          <Text className="text-primary-light font-semibold text-base">Cargar obra Social</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: 'https://img.freepik.com/foto-gratis/doctor-mujer-sonriente-bata-laboratorio-estetoscopio_23-2148827716.jpg' }}
        className="w-24 h-28 rounded-2xl ml-2"
        resizeMode="cover"
      />
    </View>
  )
}