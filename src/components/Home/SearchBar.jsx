import React from 'react'
import { View, TextInput } from 'react-native'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'

export default function SearchBar() {
    return (
        <View className="flex-row items-center bg-components-light rounded-xl px-2 py-1 mb-4">
        <MagnifyingGlassIcon size={24} color="#006A71" />
        <TextInput
            className="ml-2 flex-1 text-base text-primary-light"
            placeholder="Encuentra tu doctor favorito..."
            placeholderTextColor="#7A8D8F"
        />
        </View>
    )
}