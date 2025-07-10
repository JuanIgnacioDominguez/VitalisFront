import React from 'react'
import { ScrollView, TouchableOpacity, Text } from 'react-native'

export default function DaySelector({ daysOfMonth, selectedDate, setSelectedDate, darkMode }) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-2 mb-2 mt-4">
            {daysOfMonth.map(day => (
                <TouchableOpacity
                    key={day.value}
                    className={`items-center mx-1 px-2 py-1 rounded-2xl shadow-sm
                        ${selectedDate === day.value
                            ? (darkMode ? 'bg-primary-dark' : 'bg-primary-light')
                            : (darkMode ? 'bg-components-dark' : 'bg-white')}
                    `}
                    style={{
                        minWidth: 48,
                        minHeight: 36,
                        borderWidth: selectedDate === day.value ? 2 : 1,
                        borderColor: selectedDate === day.value
                            ? (darkMode ? '#07919A' : '#006A71')
                            : (darkMode ? '#232B2B' : '#E6ECEB'),
                        elevation: selectedDate === day.value ? 2 : 0,
                        opacity: day.isToday ? 0.5 : 1
                    }}
                    onPress={() => !day.isToday && setSelectedDate(day.value)}
                    activeOpacity={day.isToday ? 1 : 0.85}
                >
                    <Text 
                        className="text-xs mb-0.5"
                        style={{ 
                            color: selectedDate === day.value 
                                ? 'white' 
                                : (darkMode ? '#A0A0A0' : '#666')
                        }}
                    >
                        {day.label}
                    </Text>
                    <Text 
                        className="font-bold"
                        style={{ 
                            color: selectedDate === day.value 
                                ? 'white' 
                                : (darkMode ? '#E6E6E6' : '#008080')
                        }}
                    >
                        {day.day}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}