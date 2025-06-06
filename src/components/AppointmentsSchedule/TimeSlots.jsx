import React from 'react'
import { ScrollView, TouchableOpacity, Text } from 'react-native'

export default function TimeSlots({ allTimeSlots, reservedTimes, selectedSlot, setSelectedSlot, darkMode, loading }) {
    if (loading) {
        return <Text className="text-center mt-4 text-primary-light">Cargando horarios...</Text>
    }
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-4">
            {allTimeSlots.map(time => {
                const isReserved = reservedTimes.includes(time)
                return (
                    <TouchableOpacity
                        key={time}
                        className={`px-4 py-2 rounded-xl mx-1 mb-2 border-2
                            ${selectedSlot === time && !isReserved
                                ? (darkMode ? 'border-primary-dark bg-primary-dark' : 'border-primary-light bg-primary-light')
                                : (darkMode ? 'border-components-dark bg-components-dark' : 'border-components-light bg-components-light')}
                        `}
                        style={{
                            opacity: isReserved ? 0.4 : 1,
                        }}
                        onPress={() => !isReserved && setSelectedSlot(time)}
                        disabled={isReserved}
                        activeOpacity={0.85}
                    >
                        <Text className={`font-bold text-base ${selectedSlot === time && !isReserved
                            ? 'text-white'
                            : (darkMode ? 'text-primary-dark' : 'text-primary-light')}`}>
                            {time}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}