import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import PropTypes from 'prop-types'

export default function SpecialtyHeader({ title, onBack }) {
    return (
        <View className="flex-row items-center px-5 pt-12 pb-4 bg-background-light">
            <TouchableOpacity onPress={onBack} className="mr-2">
                <ArrowLeftIcon size={28} color="#006A71" />
            </TouchableOpacity>
            <Text className="text-primary-light text-2xl font-bold">{title}</Text>
        </View>
    )
}

SpecialtyHeader.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
}