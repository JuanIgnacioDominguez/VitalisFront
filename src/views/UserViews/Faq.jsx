import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import AccordionItem from '../../components/Faq/AccordionItem'

export default function Faq({ navigation }) {
    const faqList = [
        {
        question: '¿Cómo restablezco mi contraseña?',
        answer: 'Ve a la pantalla de inicio de sesión y toca "¿Olvidaste tu contraseña?". Sigue los pasos indicados.'
        },
        {
        question: '¿Dónde encuentro mis turnos?',
        answer: 'Puedes ver tus turnos en la sección "Mis turnos" del menú principal.'
        },
        {
        question: '¿Cómo contacto con soporte?',
        answer: 'En el menú "Contactanos", encontrarás la opción para contactar directamente con soporte.'
        },
    ]

    return (
        <View className="flex-1 bg-background-light">
        <ScrollView className="px-6 pt-14 pb-10">
            <View className="flex-row items-center mb-6">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeftIcon size={28} color="#006A71" />
            </TouchableOpacity>
            <Text className="text-primary-light text-2xl font-bold flex-1 text-center mr-8">
                Ayuda
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
