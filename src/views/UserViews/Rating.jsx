import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import RatingStars from '../../components/Rating/RatingStars'
import TagSelector from '../../components/Rating/TagSelector'
import CommentBox from '../../components/Rating/CommentBox'
import SubmitButton from '../../components/Rating/SubmitButton'
import { useTheme } from '../../context/ThemeContext'

const TAGS_LIKED = ['FÁCIL DE USAR', 'COMPLETA', 'ÚTIL', 'CÓMODA', 'BUEN DISEÑO']
const TAGS_IMPROVE = ['PODRÍA TENER MÁS FUNCIONES', 'COMPLICADA', 'POCO INTERACTIVA', 'SOLO EN ESPAÑOL']

export default function Rating({ navigation }) {
    const [rating, setRating] = useState(3)
    const [likedTags, setLikedTags] = useState([])
    const [improveTags, setImproveTags] = useState([])
    const [comment, setComment] = useState('')
    const { darkMode } = useTheme()

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
        <ScrollView className="px-6 pt-14 pb-10 space-y-10">
            <View className="flex-row items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
            </TouchableOpacity>
            <Text className={`text-2xl font-bold flex-1 text-center mr-8 mb-5 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                Calificación
            </Text>
            </View>
            <View>
            <Text className={`text-lg font-bold mb-5 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>Calificar la app</Text>
            <Text className={`text-base mb-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>¿Qué te pareció la app?</Text>
            <RatingStars rating={rating} setRating={setRating} />
            </View>
            <TagSelector
            title="¿Qué te gustó de la app?"
            tags={TAGS_LIKED}
            selectedTags={likedTags}
            setSelectedTags={setLikedTags}
            />
            <TagSelector
            title="¿Qué se podría mejorar?"
            tags={TAGS_IMPROVE}
            selectedTags={improveTags}
            setSelectedTags={setImproveTags}
            />
            <CommentBox comment={comment} setComment={setComment} />
            <SubmitButton onPress={() => console.log({ rating, likedTags, improveTags, comment })} />
        </ScrollView>
        </View>
    )
}
