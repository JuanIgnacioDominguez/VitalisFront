import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from '../../hooks/useTranslation'

export default function Banner() {
  const user = useSelector(state => state.auth.user)
  const navigation = useNavigation()
  const { t } = useTranslation()

  const faltaObraSocial = !user?.obraSocial || !user?.nroAfiliado || 
                          user.obraSocial.trim() === '' || user.nroAfiliado.trim() === ''

  const handlePress = () => {
    navigation.navigate('EditUser')
  }

  return (
    <View
      className="bg-primary-light rounded-2xl flex-row items-center mb-4"
      style={{ minHeight: 100, padding: 0}} 
    >
      <View className="flex-1 pr-2 p-4">
        <Text className="text-white text-xl font-bold mb-2 leading-7">
          {t('bannerTitle')}
        </Text>
        {faltaObraSocial ? (
          <TouchableOpacity 
            className="bg-warning rounded-lg px-4 py-2 mt-2 self-start"
            onPress={handlePress}
            activeOpacity={0.8}
          >
            <Text className="text-primary-light font-semibold text-base">{t('loadInsurance')}</Text>
          </TouchableOpacity>
        ) : (
          <>
            <Text className="text-white text-base font-semibold">
              ¡Gracias por elegirnos!
            </Text>
          </>
        )}
      </View>
      <Image
        source={
          faltaObraSocial
            ? require('../../../assets/doctorBanner1.png')
            : require('../../../assets/DoctorBanner2.webp')
        }
        style={{
          height: '100%',
          width: 96, 
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
        resizeMode="cover"
      />
    </View>
  )
}