import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {
  UserGroupIcon, AcademicCapIcon, HeartIcon, UserIcon,
  HandRaisedIcon, BeakerIcon, SparklesIcon, EllipsisHorizontalIcon
} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from '../../hooks/useTranslation'
import { getSpecialtyTranslation } from '../../utils/translationUtils'

export default function SpecialtiesGrid({ darkMode }) {
    const navigation = useNavigation()
    const { t, language } = useTranslation()
    
    const specialties = [
        { key: 'PEDIATRA', icon: UserGroupIcon },
        { key: 'PSIQUIATRA', icon: AcademicCapIcon },
        { key: 'GINECOLOGO', icon: UserIcon },
        { key: 'CARDIOLOGO', icon: HeartIcon },
        { key: 'TRAUMATOLOGO', icon: HandRaisedIcon },
        { key: 'UROLOGO', icon: BeakerIcon },
        { key: 'DERMATOLOGO', icon: SparklesIcon },
        { key: 'VER_MAS', icon: EllipsisHorizontalIcon },
    ]
    
    return (
        <View className="flex-row flex-wrap justify-between mb-2">
        {specialties.map((item, idx) => (
            <TouchableOpacity
                key={item.key}
                className={`w-[22%] h-[21%] aspect-square rounded-xl justify-center items-center mb-3 ${darkMode ? 'bg-primary-dark' : 'bg-components-light'}`}
                activeOpacity={0.8}
                onPress={() => {
                    if (item.key === 'VER_MAS') {
                        navigation.navigate('AllSpecialties')
                    } else {
                        navigation.navigate('SpecialtyDoctors', { specialty: item.key })
                    }
                }}
            >
                <item.icon size={28} color={darkMode ? "#BFB9AD" : "#000000"} />
                <Text className={`text-sm font-semibold mt-1 text-center ${darkMode ? 'text-text-dark' : 'text-text-light'}`}>
                    {item.key === 'VER_MAS' 
                        ? t('seeMore')
                        : getSpecialtyTranslation(item.key, t)
                    }
                </Text>
            </TouchableOpacity>
        ))}
        </View>
    )
}