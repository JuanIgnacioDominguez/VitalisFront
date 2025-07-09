import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from '../../hooks/useTranslation'

export default function PrivacyPolicy({ navigation }) {
    const { darkMode } = useTheme()
    const { t } = useTranslation()
    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <ScrollView className="px-6 pt-14 pb-6">
                <View className="flex-row items-center mb-4">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
                    </TouchableOpacity>
                    <Text className={`text-2xl font-bold flex-1 text-center mr-8 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                        {t('privacyPolicy')}
                    </Text>
                </View>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>1. {t('introduction')}</Text>
                <Text className={`text-base mb-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    {t('introductionText')}
                </Text>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>2. {t('informationWeCollect')}</Text>
                <Text className={`text-base mb-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    {t('informationWeCollectText')}
                </Text>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>3. {t('useOfInformation')}</Text>
                <Text className={`text-base mb-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    {t('useOfInformationText')}
                </Text>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>4. {t('sharingInformation')}</Text>
                <Text className={`text-base mb-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    {t('sharingInformationText')}
                </Text>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>5. {t('security')}</Text>
                <Text className={`text-base mb-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    {t('securityText')}
                </Text>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>6. {t('yourRights')}</Text>
                <Text className={`text-base mb-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    {t('yourRightsText')}
                </Text>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>7. {t('policyChanges')}</Text>
                <Text className={`text-base mb-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    {t('policyChangesText')}
                </Text>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>{t('termsAndConditions')}</Text>
                <Text className={`text-base mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    1. {t('terms1')}
                </Text>
                <Text className={`text-base mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    2. {t('terms2')}
                </Text>
                <Text className={`text-base mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    3. {t('terms3')}
                </Text>
                <Text className={`text-base mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    4. {t('terms4')}
                </Text>
                <Text className={`text-base mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    5. {t('terms5')}
                </Text>
            </ScrollView>
        </View>
    )
}