import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { StarIcon } from 'react-native-heroicons/solid'

export default function RatingStars({ rating, setRating }) {
    return (
        <View className="flex-row mt-2 mb-6">
        {[1, 2, 3, 4, 5].map(i => (
            <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <StarIcon size={30} color={i <= rating ? '#008080' : '#D1D5DB'} />
            </TouchableOpacity>
        ))}
        </View>
    )
}
