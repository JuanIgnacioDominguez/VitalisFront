import React from 'react'
import { View, Text } from 'react-native'
import DoctorCard from './DoctorCard'

const doctors = [
  {
    name: 'Agustin Safronchik',
    specialty: 'Pediatra',
    image: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    name: 'Patricio Brenan',
    specialty: 'Cardiologo',
    image: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    name: 'Martín Pérez',
    specialty: 'Psiquiatra',
    image: 'https://randomuser.me/api/portraits/men/4.jpg'
  },
  {
    name: 'Tomas Osso',
    specialty: 'Traumatologo',
    image: 'https://randomuser.me/api/portraits/men/5.jpg'
  }
]

export default function BestDoctors() {
  return (
    <View className="mb-4">
      <Text className="text-primary-light text-xl font-bold mb-3">Mejores Doctores</Text>
      <View className="flex-row flex-wrap justify-between">
        {doctors.map(d => (
          <DoctorCard key={d.name} {...d} />
        ))}
      </View>
    </View>
  )
}