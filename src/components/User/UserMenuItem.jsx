import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

export default function UserMenuItem({ icon, label, onPress, hideArrow, rightComponent, darkMode }) {
    return (
        <TouchableOpacity
            className="flex-row items-center justify-between py-3"
            onPress={onPress}
            activeOpacity={onPress ? 0.7 : 1}
            disabled={!onPress}
        >
            <View className="flex-row items-center">
                <View className="bg-primary-light/10 rounded-full p-2 mr-4">
                    <Image source={{ uri: icon }} className="w-7 h-7" />
                </View>
                <Text className={`text-base ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>{label}</Text>
            </View>
            {rightComponent ? rightComponent : (!hideArrow && (
                <Image
                    source={{ uri: 'https://img.icons8.com/ios-filled/24/008080/chevron-right.png' }}
                    style={{ width: 24, height: 24 }}
                />
            ))}
        </TouchableOpacity>
    )
}