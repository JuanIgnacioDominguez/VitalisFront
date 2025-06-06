import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/outline'

export default function MonthSelector({ selectedMonth, selectedYear, MONTHS_ES, darkMode, handlePrevMonth, handleNextMonth, today }) {
    return (
        <View className="flex-row items-center justify-center mb-2 mt-4">
            <TouchableOpacity
                onPress={handlePrevMonth}
                disabled={selectedYear === today.getFullYear() && selectedMonth === today.getMonth()}
                className="p-1"
            >
                <ChevronLeftIcon size={20} color={(selectedYear === today.getFullYear() && selectedMonth === today.getMonth()) ? "#ccc" : "#006A71"} />
            </TouchableOpacity>
            <Text className={`mx-2 text-base font-bold ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                {MONTHS_ES[selectedMonth]} {selectedYear}
            </Text>
            <TouchableOpacity onPress={handleNextMonth} className="p-1">
                <ChevronRightIcon size={20} color="#006A71" />
            </TouchableOpacity>
        </View>
    )
}