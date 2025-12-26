import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import RatingStars from '../../components/Rating/RatingStars'
import TagSelector from '../../components/Rating/TagSelector'
import CommentBox from '../../components/Rating/CommentBox'
import SubmitButton from '../../components/Rating/SubmitButton'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from '../../hooks/useTranslation'
import { useSelector } from 'react-redux'
import { createAppRating, hasUserRated, getMyRating } from '../../api/rating'
import CustomPopup from '../../components/PopUps/CustomPopup'

export default function Rating({ navigation }) {
    const [rating, setRating] = useState(3)
    const [likedTags, setLikedTags] = useState([])
    const [improveTags, setImproveTags] = useState([])
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)
    const [checkingRating, setCheckingRating] = useState(true)
    const [alreadyRated, setAlreadyRated] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')
    const { darkMode } = useTheme()
    const { t } = useTranslation()
    const token = useSelector(state => state.auth.token)

    const TAGS_LIKED = [
        t('easyToUse'), 
        t('complete'), 
        t('useful'), 
        t('comfortable'), 
        t('goodDesign')
    ]
    
    const TAGS_IMPROVE = [
        t('couldHaveMoreFeatures'), 
        t('complicated'), 
        t('notInteractive'), 
        t('onlyInSpanish')
    ]

    useEffect(() => {
        checkIfUserRated()
    }, [])

    const checkIfUserRated = async () => {
        try {
            const hasRated = await hasUserRated(token)
            if (hasRated) {
                const myRating = await getMyRating(token)
                setAlreadyRated(true)
                setRating(myRating.puntuacion)
                setLikedTags(myRating.aspectosPositivos || [])
                setImproveTags(myRating.aspectosMejorar || [])
                setComment(myRating.comentario || '')
            }
        } catch (error) {
            console.log('Error verificando calificación:', error)
        } finally {
            setCheckingRating(false)
        }
    }

    const handleSubmit = async () => {
        if (alreadyRated) {
            setPopupMessage('Ya has calificado la aplicación anteriormente')
            setShowErrorPopup(true)
            return
        }

        if (rating < 1 || rating > 5) {
            setPopupMessage('La puntuación debe estar entre 1 y 5')
            setShowErrorPopup(true)
            return
        }

        setLoading(true)
        try {
            const ratingData = {
                puntuacion: rating,
                aspectosPositivos: likedTags,
                aspectosMejorar: improveTags,
                comentario: comment
            }

            await createAppRating(ratingData, token)
            setPopupMessage('¡Gracias por tu calificación!')
            setShowSuccessPopup(true)
            setAlreadyRated(true)
        } catch (error) {
            setPopupMessage(error.message || 'Error al enviar la calificación')
            setShowErrorPopup(true)
        } finally {
            setLoading(false)
        }
    }

    const handleCloseSuccessPopup = () => {
        setShowSuccessPopup(false)
        setShowErrorPopup(false)
        navigation.goBack()
    }

    const handleCloseErrorPopup = () => {
        setShowErrorPopup(false)
        setShowSuccessPopup(false)
    }

    if (checkingRating) {
        return (
            <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'} justify-center items-center`}>
                <ActivityIndicator size="large" color={darkMode ? "#07919A" : "#006A71"} />
            </View>
        )
    }

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
        <ScrollView className="px-6 pt-14 pb-10 space-y-10">
            <View className="flex-row items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
            </TouchableOpacity>
            <Text className={`text-2xl font-bold flex-1 text-center mr-8 mb-5 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                {t('rating')}
            </Text>
            </View>
            
            {alreadyRated && (
                <View className={`p-4 rounded-xl ${darkMode ? 'bg-primary-dark/20 border-primary-dark' : 'bg-primary-light/20 border-primary-light'} border-2`}>
                    <Text className={`text-center font-bold ${darkMode ? 'text-primary-dark' : 'text-primary-light'}`}>
                        {t('alreadyRatedApp')}
                    </Text>
                </View>
            )}
            
            <View>
            <Text className={`text-lg font-bold mb-5 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>{t('rateApp')}</Text>
            <Text className={`text-base mb-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('howDidYouLikeApp')}</Text>
            <RatingStars rating={rating} setRating={setRating} disabled={alreadyRated} />
            </View>
            <TagSelector
            title={t('whatDidYouLikeAboutApp')}
            tags={TAGS_LIKED}
            selectedTags={likedTags}
            setSelectedTags={setLikedTags}
            disabled={alreadyRated}
            />
            <TagSelector
            title={t('whatCouldBeImproved')}
            tags={TAGS_IMPROVE}
            selectedTags={improveTags}
            setSelectedTags={setImproveTags}
            disabled={alreadyRated}
            />
            <CommentBox comment={comment} setComment={setComment} disabled={alreadyRated} />
            <SubmitButton 
                onPress={handleSubmit} 
                loading={loading}
                disabled={alreadyRated}
            />
        </ScrollView>

        <CustomPopup
            visible={showSuccessPopup}
            onClose={handleCloseSuccessPopup}
            title={t('success')}
            message={popupMessage}
            color="#008080"
            borderColor="#7AD7F0"
            buttonText={t('goBack')}
            darkMode={darkMode}
        />
        
        <CustomPopup
            visible={showErrorPopup}
            onClose={handleCloseErrorPopup}
            title={t('error')}
            message={popupMessage}
            color="#F76C6C"
            borderColor="#F76C6C"
            buttonText={t('goBack')}
            darkMode={darkMode}
        />
        </View>
    )
}
