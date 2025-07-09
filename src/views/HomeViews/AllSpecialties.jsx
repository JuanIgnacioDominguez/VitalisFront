import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from '../../hooks/useTranslation'
import { getSpecialtyTranslation } from '../../utils/translationUtils'
import {
    UserGroupIcon, AcademicCapIcon, UserIcon, HeartIcon,
    HandRaisedIcon, BeakerIcon, SparklesIcon,
    EyeIcon, GlobeAltIcon, ShieldCheckIcon,
    WrenchScrewdriverIcon, UserCircleIcon,
    ArrowLeftIcon
} from 'react-native-heroicons/outline'

const SPECIALTIES = [
    { key: "CARDIOLOGO", icon: HeartIcon },
    { key: "PEDIATRA", icon: UserGroupIcon },
    { key: "PSIQUIATRA", icon: AcademicCapIcon },
    { key: "GINECOLOGO", icon: UserIcon },
    { key: "TRAUMATOLOGO", icon: HandRaisedIcon },
    { key: "UROLOGO", icon: BeakerIcon },
    { key: "DERMATOLOGO", icon: SparklesIcon },
    { key: "NEUROLOGO", icon: UserIcon }, 
    { key: "OTORRINOLARINGOLOGO", icon: UserIcon },
    { key: "OFTALMOLOGO", icon: EyeIcon },
    { key: "NEFROLOGO", icon: UserIcon },
    { key: "ENDOCRINOLOGO", icon: GlobeAltIcon },
    { key: "ONCOLOGO", icon: ShieldCheckIcon },
    { key: "INTERNISTA", icon: UserCircleIcon },
    { key: "ANESTESIOLOGO", icon: UserIcon }, 
    { key: "GASTROENTEROLOGO", icon: UserIcon },
    { key: "NEUMOLOGO", icon: UserIcon },
    { key: "REUMATOLOGO", icon: WrenchScrewdriverIcon },
    { key: "CIRUJANO_GENERAL", icon: WrenchScrewdriverIcon },
    { key: "MEDICO_GENERAL", icon: UserCircleIcon }
]

function chunkArray(array, size) {
    const result = []
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size))
    }
    return result
}

export default function AllSpecialties() {
    const navigation = useNavigation()
    const { t } = useTranslation()
    const specialtiesRows = chunkArray(SPECIALTIES, 3)

    return (
        <View className="flex-1 bg-background-light pt-12 px-5">
            <View className="flex-row items-center mb-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-2">
                    <ArrowLeftIcon size={28} color="#006A71" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-primary-light text-center flex-1 mr-8">
                    {t('allSpecialties')}
                </Text>
            </View>
            <ScrollView>
                {specialtiesRows.map((row, idx) => (
                    <View key={idx} className="flex-row justify-between mb-4">
                        {row.map((item) => (
                            <TouchableOpacity
                                key={item.key}
                                className="w-[30%] aspect-square bg-components-light rounded-xl justify-center items-center"
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('SpecialtyDoctors', { specialty: item.key })}
                            >
                                <item.icon size={32} color="#006A71" />
                                <Text className="text-primary-light text-base font-semibold mt-2 text-center">
                                    {getSpecialtyTranslation(item.key, t)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        {Array.from({ length: 3 - row.length }).map((_, i) => (
                            <View key={i} className="w-[30%] aspect-square" />
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}