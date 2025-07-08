import React, { useMemo } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import DoctorCard from './DoctorCard'

export default function BestDoctors() {
  const navigation = useNavigation()
  const { list: professionals } = useSelector(state => state.professionals)

  const randomDoctors = useMemo(() => {
    if (professionals.length === 0) return []
    
    const shuffled = [...professionals].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 4)
  }, [professionals])

  const handleDoctorPress = (doctor) => {
    navigation.navigate('AppointmentsSchedule', { professional: doctor })
  }

  return (
    <View className="mb-2">
      <Text className="text-primary-light text-xl font-bold mb-3">Mejores Doctores</Text>
      <View className="flex-row flex-wrap justify-between">
        {randomDoctors.map(doctor => (
          <DoctorCard 
            key={doctor.id} 
            name={doctor.name}
            specialty={doctor.specialty}
            image={
              doctor.imagen
                ? `data:image/jpeg;base64,${doctor.imagen}`
                : 'https://ui-avatars.com/api/?name=Doctor'
            }
            onPress={() => handleDoctorPress(doctor)}
          />
        ))}
      </View>
    </View>
  )
}