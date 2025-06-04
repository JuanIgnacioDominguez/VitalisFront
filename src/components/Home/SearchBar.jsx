import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline'

export default function SearchBar({ value, onChangeText }) {
    return (
        <View className="flex-row items-center bg-components-light rounded-xl px-2 py-1 mb-4">
            <MagnifyingGlassIcon size={24} color="#006A71" />
            <TextInput
                className="ml-2 flex-1 text-base text-primary-light"
                placeholder="Encuentra tu doctor favorito..."
                placeholderTextColor="#7A8D8F"
                value={value}
                onChangeText={onChangeText}
            />
            {value.length > 0 && (
                <TouchableOpacity
                    onPress={() => onChangeText('')}
                    className="ml-2"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <XMarkIcon size={22} color="#F05C5F" />
                </TouchableOpacity>
            )}
        </View>
    )
}