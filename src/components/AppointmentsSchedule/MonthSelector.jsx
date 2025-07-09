import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/outline'
import { useTranslation } from '../../hooks/useTranslation'
import { getMonthsArray } from '../../utils/translationUtils'

export default function MonthSelector({ selectedMonth, selectedYear, darkMode, handlePrevMonth, handleNextMonth, today }) {
    const { language } = useTranslation()
    const monthsArray = getMonthsArray(language)
    
    return (
        <View className="flex-row items-center justify-center mt-1">
            <TouchableOpacity
                onPress={handlePrevMonth}
                disabled={selectedYear === today.getFullYear() && selectedMonth === today.getMonth()}
                className="p-1"
            >
                <ChevronLeftIcon size={20} color={(selectedYear === today.getFullYear() && selectedMonth === today.getMonth()) ? "#ccc" : "#006A71"} />
            </TouchableOpacity>
            <Text className={`mx-2 text-base font-bold ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                {monthsArray[selectedMonth]} {selectedYear}
            </Text>
            <TouchableOpacity onPress={handleNextMonth} className="p-1">
                <ChevronRightIcon size={20} color="#006A71" />
            </TouchableOpacity>
        </View>
    )
}