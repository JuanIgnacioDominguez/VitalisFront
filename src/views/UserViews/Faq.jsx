import React, { useRef } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import AccordionItem from '../../components/Faq/AccordionItem'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from '../../hooks/useTranslation'

export default function Faq({ navigation }) {
    const { darkMode } = useTheme()
    const { t } = useTranslation()

    const faqKeys = [
        "resetPassword",
        "findAppointments",
        "contactSupport",
        "howToBook",
        "cancelAppointment",
        "editProfile",
        "addInsurance",
        "seeFavorites",
        "notifications",
        "changeLanguage",
        "rateDoctor",
        "forgotEmail",
        "privacy",
        "appFree",
        "multipleAppointments",
        "specialties",
        "problemsWithBooking"
    ]

    const faqList = faqKeys.map(key => ({
        question: t(`faqQuestions.${key}`),
        answer: t(`faqQuestions.${key}Answer`)
    }))

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <ScrollView
                className="px-6 pt-14"
                contentContainerStyle={{ paddingBottom: 160 }}
            >
                <View className="flex-row items-center mb-6">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
                    </TouchableOpacity>
                    <Text className={`text-2xl font-bold flex-1 text-center mr-8 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                        {t('faq')}
                    </Text>
                </View>
                {faqList.map((item, index) => (
                    <AccordionItem
                        key={index}
                        question={item.question}
                        answer={item.answer}
                    />
                ))}
            </ScrollView>
        </View>
    )
}
