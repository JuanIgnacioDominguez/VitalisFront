import React, { useState, useEffect } from 'react'
import { View, Text, Switch, TouchableOpacity, ScrollView, Image } from 'react-native'
import UserMenuItem from '../../components/User/UserMenuItem'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { useTranslation } from '../../hooks/useTranslation'
import CustomPopup from '../../components/PopUps/CustomPopup' 
import { useSelector } from 'react-redux'
import { requestDeleteCode } from '../../api/user'

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
        <View className={`flex-1 mt-10 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24, marginBottom: 16 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 16 }}>
                        <Image source={{ uri: backArrow }} style={{ width: 28, height: 28 }} />
                    </TouchableOpacity>
                    <Text className={`text-2xl font-bold text-center ${darkMode ? 'text-text-dark' : 'text-primary-light'}`} style={{ flex: 1, marginRight: 44 }}>
                        {t('settings')}
                    </Text>
                </View>
                <View className="px-8">
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32, justifyContent: 'space-between' }}>
                        <UserMenuItem
                            icon="https://img.icons8.com/ios-filled/48/008080/light-on.png"
                            label={t('darkMode')}
                            hideArrow
                            darkMode={darkMode}
                        />
                        <Switch
                            value={darkMode}
                            onValueChange={setDarkMode}
                            trackColor={{ false: '#ccc', true: '#008080' }}
                            thumbColor={darkMode ? '#fff' : '#fff'}
                        />
                    </View>
                    <View style={{ marginBottom: showLanguages ? 0 : 32 }}>
                        <UserMenuItem
                            icon="https://img.icons8.com/ios-filled/48/008080/language.png"
                            label={getCurrentLanguageLabel()}
                            onPress={() => setShowLanguages(!showLanguages)}
                            hideArrow
                            darkMode={darkMode}
                            rightComponent={
                                <Image
                                    source={{ uri: showLanguages ? chevronDownThin : chevronThin }}
                                    style={{ width: 24, height: 24, marginLeft: 8 }}
                                />
                            }
                        />
                        {showLanguages && (
                            <View className={`ml-14 mb-4 ${darkMode ? 'bg-components-dark' : 'bg-white'} rounded-lg p-4`}>
                                <TouchableOpacity onPress={() => handleLanguageChange('es')}>
                                    <Text className={`text-base py-1 ${darkMode ? 'text-text-dark' : 'text-text-light'}`}>
                                        {t('spanish')}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleLanguageChange('en')}>
                                    <Text className={`text-base py-1 ${darkMode ? 'text-text-dark' : 'text-text-light'}`}>
                                        {t('english')}
                                    </Text>
                                </TouchableOpacity>
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