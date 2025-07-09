import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from '../../hooks/useTranslation'

export default function Banner() {
  const user = useSelector(state => state.auth.user)
  const navigation = useNavigation()
  const { t } = useTranslation()

  const shouldShowBanner = !user?.obraSocial || !user?.nroAfiliado || 
                          user.obraSocial.trim() === '' || user.nroAfiliado.trim() === ''

  const handlePress = () => {
    navigation.navigate('EditUser')
  }

  if (!shouldShowBanner) {
    return null
  }

  return (
    <View className="bg-primary-light rounded-2xl flex-row items-center p-4 mb-6">
      <View className="flex-1">
        <Text className="text-white text-xl font-bold mb-2 leading-7">
          {t('bannerTitle')}
        </Text>
        <TouchableOpacity 
          className="bg-warning rounded-lg px-4 py-2 mt-2 self-start"
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Text className="text-primary-light font-semibold text-base">{t('loadInsurance')}</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: 'https://img.freepik.com/foto-gratis/doctor-mujer-sonriente-bata-laboratorio-estetoscopio_23-2148827716.jpg' }}
        className="w-24 h-28 rounded-2xl ml-2"
        resizeMode="cover"
      />
    </View>
  )
}