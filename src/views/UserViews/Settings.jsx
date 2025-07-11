import React, { useState, useEffect } from 'react'
import { View, Text, Switch, TouchableOpacity, ScrollView, Image } from 'react-native'
import UserMenuItem from '../../components/User/UserMenuItem'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { useTranslation } from '../../hooks/useTranslation'
import CustomPopup from '../../components/PopUps/CustomPopup' 
import { useSelector } from 'react-redux'
import { requestDeleteCode } from '../../api/user'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'

const chevronThin = 'https://img.icons8.com/ios-filled/24/008080/chevron-right.png'
const chevronDownThin = 'https://img.icons8.com/ios-filled/24/008080/chevron-down.png'
const backArrow = 'https://img.icons8.com/ios/30/008080/left.png'

export default function Settings({ navigation }) {
    const { darkMode, setDarkMode } = useTheme()
    const { language, changeLanguage, loadSavedLanguage } = useLanguage()
    const { t } = useTranslation()
    const [showLanguages, setShowLanguages] = useState(false)
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const userId = useSelector(state => state.auth.user?.id)
    const token = useSelector(state => state.auth.token)
    const userEmail = useSelector(state => state.auth.user?.email)

    useEffect(() => {
        loadSavedLanguage()
    }, [])

    const handleLanguageChange = (newLanguage) => {
        changeLanguage(newLanguage)
        setShowLanguages(false)
    }

    const getCurrentLanguageLabel = () => {
        return language === 'es' ? t('spanish') : t('english')
    }

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
                <View className="flex-row items-center mt-12 mb-6 px-6">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
                    </TouchableOpacity>
                    <Text className={`text-2xl font-bold flex-1 text-center mr-8 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                        {t('settings')}
                    </Text>
                </View>
                <View className="px-8 mt-14">
                    <View className="space-y-14">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <View className="bg-primary-light/10 rounded-full p-2 mr-4">
                                    <Image source={{ uri: "https://img.icons8.com/ios-filled/48/008080/light-on.png" }} className="w-7 h-7" />
                                </View>
                                <Text className={`text-lg ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>{t('darkMode')}</Text>
                            </View>
                            <Switch
                                value={darkMode}
                                onValueChange={setDarkMode}
                                trackColor={{ false: '#ccc', true: '#008080' }}
                                thumbColor={darkMode ? '#fff' : '#fff'}
                            />
                        </View>
                        <View>
                            <UserMenuItem
                                icon="https://img.icons8.com/ios-filled/48/008080/language.png"
                                label={getCurrentLanguageLabel()}
                                onPress={() => setShowLanguages(!showLanguages)}
                                hideArrow
                                darkMode={darkMode}
                                rightComponent={
                                    <Image
                                        source={{ uri: showLanguages ? chevronDownThin : chevronThin }}
                                        style={{ width: 24, height: 24, marginLeft: 3 }}
                                    />
                                }
                            />
                            {showLanguages && (
                                <View
                                    className={`
                                        w-full
                                        mt-0
                                        px-2
                                    `}
                                >
                                    <View
                                        className={`
                                            rounded-2xl shadow
                                            border
                                            ${darkMode ? 'bg-components-dark border-primary-dark' : 'bg-white border-primary-light'}
                                            flex-col
                                            overflow-hidden
                                        `}
                                        style={{
                                            minWidth: 350,
                                            alignSelf: 'center',
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => handleLanguageChange('es')}
                                            className={`
                                                px-5 py-4
                                                ${language === 'es'
                                                    ? (darkMode ? 'bg-primary-dark' : 'bg-primary-light')
                                                    : ''}
                                            `}
                                            activeOpacity={0.8}
                                        >
                                            <Text className={`
                                                text-base
                                                ${language === 'es' ? 'font-bold' : ''}
                                                ${darkMode
                                                    ? (language === 'es' ? 'text-white' : 'text-text-dark')
                                                    : (language === 'es' ? 'text-white' : 'text-primary-light')}
                                            `}>
                                                {t('spanish')}
                                            </Text>
                                        </TouchableOpacity>
                                        <View className={`${darkMode ? 'border-t border-primary-dark' : 'border-t border-primary-light'}`} />
                                        <TouchableOpacity
                                            onPress={() => handleLanguageChange('en')}
                                            className={`
                                                px-5 py-4
                                                ${language === 'en'
                                                    ? (darkMode ? 'bg-primary-dark' : 'bg-primary-light')
                                                    : ''}
                                            `}
                                            activeOpacity={0.8}
                                        >
                                            <Text className={`
                                                text-base
                                                ${language === 'en' ? 'font-bold' : ''}
                                                ${darkMode
                                                    ? (language === 'en' ? 'text-white' : 'text-text-dark')
                                                    : (language === 'en' ? 'text-white' : 'text-primary-light')}
                                            `}>
                                                {t('english')}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                        <UserMenuItem
                            icon="https://img.icons8.com/ios-filled/48/008080/key.png"
                            label={t('changePassword')}
                            onPress={() => navigation.navigate('ChangePassword')}
                            darkMode={darkMode}
                        />
                        <UserMenuItem
                            icon="https://img.icons8.com/ios-filled/48/008080/trash--v1.png"
                            label={t('deleteAccount')}
                            onPress={() => setShowDeletePopup(true)}
                            darkMode={darkMode}
                        />
                    </View>
                </View>
            </ScrollView>
            <CustomPopup
                visible={showDeletePopup}
                onClose={() => setShowDeletePopup(false)}
                title={t('attention')}
                message={t('deleteAccountConfirm')}
                color="#F76C6C"
                borderColor="#F76C6C"
                buttonText={t('continue')}
                onButtonPress={async () => {
                    try {
                        console.log('Solicitando código de borrado para userId:', userId)
                        console.log('Token enviado:', token)
                        const response = await requestDeleteCode(userId, token)
                        console.log('Respuesta del backend:', response)
                        navigation.navigate('VerifyDeleteCode', { email: userEmail })
                    } catch (e) {
                        console.log('Error al solicitar código de borrado:', e)
                        if (e?.response) {
                            console.log('Status:', e.response.status)
                            console.log('Data:', e.response.data)
                            alert(`No se pudo enviar el código de borrado. Detalle: ${e.response.data?.mensaje || JSON.stringify(e.response.data)}`)
                        } else {
                            alert(`No se pudo enviar el código de borrado. Error: ${e?.mensaje || e?.message || e}`)
                        }
                    }
                }}
                secondButtonText={t('back')}
                onSecondButtonPress={() => setShowDeletePopup(false)}
                darkMode={darkMode}
            />
        </View>
    )
}