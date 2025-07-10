import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useTranslation } from '../../hooks/useTranslation'

const chunkArray = (array, size) => {
    const result = []
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size))
    }
    return result
}

export default function TimeSlots({ allTimeSlots, reservedTimes, selectedSlot, setSelectedSlot, darkMode, loading }) {
    const { t } = useTranslation()
    
    if (loading) {
        return (
            <Text 
                className="text-center mt-4"
                style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
            >
                {t('loadingSchedules')}
            </Text>
        )
    }

    const timeRows = chunkArray(allTimeSlots, 4)

    return (
        <View className="w-full">
            {timeRows.map((row, idx) => (
                <View key={idx} className="flex-row justify-between mb-3">
                    {row.map(time => {
                        const isReserved = reservedTimes.includes(time)
                        const isSelected = selectedSlot === time && !isReserved
                        return (
                            <TouchableOpacity
                                key={time}
                                className={`
                                    w-[22%] aspect-square rounded-xl justify-center items-center
                                    ${isSelected
                                        ? (darkMode ? 'bg-primary-dark' : 'bg-primary-light')
                                        : (darkMode ? 'bg-components-dark' : 'bg-components-light')}
                                    ${isReserved ? 'opacity-40' : ''}
                                `}
                                style={{
                                    borderWidth: isSelected ? 2 : 1,
                                    borderColor: isSelected
                                        ? (darkMode ? '#07919A' : '#006A71')
                                        : (darkMode ? '#232B2B' : '#E6ECEB'),
                                }}
                                onPress={() => !isReserved && setSelectedSlot(time)}
                                disabled={isReserved}
                                activeOpacity={isReserved ? 1 : 0.85}
                            >
                                <Text 
                                    className="font-bold text-base text-center"
                                    style={{ 
                                        color: isSelected 
                                            ? 'white' 
                                            : (darkMode ? '#E6E6E6' : '#008080')
                                    }}
                                >
                                    {time}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                    {/* Si la fila tiene menos de 4, agrega espacios vacíos para alinear */}
                    {Array.from({ length: 4 - row.length }).map((_, emptyIdx) => (
                        <View key={`empty-${emptyIdx}`} className="w-[22%] aspect-square" />
                    ))}
                </View>
            ))}
        </View>
    )
}