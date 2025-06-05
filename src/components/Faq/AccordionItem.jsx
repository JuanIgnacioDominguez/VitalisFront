import React, { useState } from 'react'
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native'
import { ChevronDownIcon } from 'react-native-heroicons/outline'

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function AccordionItem({ question, answer }) {
    const [expanded, setExpanded] = useState(false)

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setExpanded(!expanded)
    }

    return (
        <View className="mb-4">
        <TouchableOpacity
            onPress={toggleExpand}
            className="rounded-full px-4 py-3 flex-row justify-between items-center border"
            style={{
            borderColor: 'quaternary-light', 
            backgroundColor: 'quaternary-light', 
            borderWidth: 1.5,
            }}
        >
            <Text className="text-primary-light font-medium flex-1 pr-2">{question}</Text>
            <ChevronDownIcon
            size={20}
            color="#006A71"
            style={{
                transform: [{ rotate: expanded ? '180deg' : '0deg' }]
            }}
            />
        </TouchableOpacity>

        {expanded && (
            <View className="mt-2 px-2">
            <Text className="text-primary-light text-sm">
                {answer}
            </Text>
            </View>
        )}
        </View>
    )
}
