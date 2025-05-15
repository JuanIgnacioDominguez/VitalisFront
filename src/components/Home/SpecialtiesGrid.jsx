import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { UserGroupIcon } from 'react-native-heroicons/outline'

const specialties = [
    { label: 'Pediatra', icon: <UserGroupIcon size={28} color="#006A71" /> },
    { label: 'Psiquiatra', icon: <UserGroupIcon size={28} color="#006A71" /> },
    { label: 'Ginecologo', icon: <UserGroupIcon size={28} color="#006A71" /> },
    { label: 'Cardiologo', icon: <UserGroupIcon size={28} color="#006A71" /> },
    { label: 'Traumatologo', icon: <UserGroupIcon size={28} color="#006A71" /> },
    { label: 'Urologo', icon: <UserGroupIcon size={28} color="#006A71" /> },
    { label: 'Dermatologo', icon: <UserGroupIcon size={28} color="#006A71" /> },
    { label: 'Ver mas', icon: <Text className="text-2xl text-primary-light">...</Text> },
]

export default function SpecialtiesGrid() {
    return (
        <View className="flex-row flex-wrap justify-between mb-6">
        {specialties.map((item, idx) => (
            <TouchableOpacity
            key={item.label}
            className="w-[23%] aspect-square bg-components-light rounded-xl justify-center items-center mb-3"
            activeOpacity={0.8}
            >
            {item.icon}
            <Text className="text-primary-light text-xs font-semibold mt-1">{item.label}</Text>
            </TouchableOpacity>
        ))}
        </View>
    )
}