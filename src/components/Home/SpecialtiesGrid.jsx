import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {
  UserGroupIcon, AcademicCapIcon, HeartIcon, UserIcon,
  HandRaisedIcon, BeakerIcon, SparklesIcon, EllipsisHorizontalIcon
} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

const specialties = [
    { label: 'Pediatra', icon: UserGroupIcon },
    { label: 'Psiquiatra', icon: AcademicCapIcon },
    { label: 'Ginecologo', icon: UserIcon },
    { label: 'Cardiologo', icon: HeartIcon },
    { label: 'Traumatologo', icon: HandRaisedIcon },
    { label: 'Urologo', icon: BeakerIcon },
    { label: 'Dermatologo', icon: SparklesIcon },
    { label: 'Ver mas', icon: EllipsisHorizontalIcon },
]

export default function SpecialtiesGrid() {
    const navigation = useNavigation()
    return (
        <View className="flex-row flex-wrap justify-between mb-2">
        {specialties.map((item, idx) => (
            <TouchableOpacity
                key={item.label}
                className="w-[22%] h-[21%] aspect-square bg-components-light rounded-xl justify-center items-center mb-3"
                activeOpacity={0.8}
                onPress={() => {
                    if (item.label !== 'Ver mas') {
                        navigation.navigate('SpecialtyDoctors', { specialty: item.label })
                    }
                }}
            >
                <item.icon size={28} color="#006A71" />
                <Text className="text-primary-light text-xs font-semibold mt-1 text-center">{item.label}</Text>
            </TouchableOpacity>
        ))}
        </View>
    )
}