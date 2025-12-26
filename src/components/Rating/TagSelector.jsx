import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function TagSelector({ title, tags, selectedTags, setSelectedTags, disabled = false }) {
    const toggleTag = tag => {
        if (!disabled) {
            setSelectedTags(
            selectedTags.includes(tag)
                ? selectedTags.filter(t => t !== tag)
                : [...selectedTags, tag]
            )
        }
    }

    return (
        <View>
        <Text className="text-base text-primary-light font-bold mb-5">{title}</Text>
        <View className="flex-row flex-wrap gap-2 mb-5">
            {tags.map(tag => (
            <TouchableOpacity
                key={tag}
                onPress={() => toggleTag(tag)}
                disabled={disabled}
                className={`px-3 py-1 rounded-full ${
                selectedTags.includes(tag)
                    ? 'bg-primary-light text-white'
                    : 'bg-gray-200 text-primary-light'
                }`}
                style={disabled ? { opacity: 0.6 } : {}}
            >
                <Text className="text-sm font-medium">{tag}</Text>
            </TouchableOpacity>
            ))}
        </View>
        </View>
    )
}
