import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
    UserGroupIcon, AcademicCapIcon, UserIcon, HeartIcon,
    HandRaisedIcon, BeakerIcon, SparklesIcon,
    EyeIcon, GlobeAltIcon, ShieldCheckIcon,
    WrenchScrewdriverIcon, UserCircleIcon,
    ArrowLeftIcon
} from 'react-native-heroicons/outline'

const SPECIALTIES = [
    { key: "CARDIOLOGO", label: "Cardiólogo", icon: HeartIcon },
    { key: "PEDIATRA", label: "Pediatra", icon: UserGroupIcon },
    { key: "PSIQUIATRA", label: "Psiquiatra", icon: AcademicCapIcon },
    { key: "GINECOLOGO", label: "Ginecólogo", icon: UserIcon },
    { key: "TRAUMATOLOGO", label: "Traumatólogo", icon: HandRaisedIcon },
    { key: "UROLOGO", label: "Urólogo", icon: BeakerIcon },
    { key: "DERMATOLOGO", label: "Dermatólogo", icon: SparklesIcon },
    { key: "NEUROLOGO", label: "Neurólogo", icon: UserIcon }, 
    { key: "OTORRINOLARINGOLOGO", label: "Otorrinolaringólogo", icon: UserIcon },
    { key: "OFTALMOLOGO", label: "Oftalmólogo", icon: EyeIcon },
    { key: "NEFROLOGO", label: "Nefrólogo", icon: UserIcon },
    { key: "ENDOCRINOLOGO", label: "Endocrinólogo", icon: GlobeAltIcon },
    { key: "ONCOLOGO", label: "Oncólogo", icon: ShieldCheckIcon },
    { key: "INTERNISTA", label: "Internista", icon: UserCircleIcon },
    { key: "ANESTESIOLOGO", label: "Anestesiólogo", icon: UserIcon }, 
    { key: "GASTROENTEROLOGO", label: "Gastroenterólogo", icon: UserIcon },
    { key: "NEUMOLOGO", label: "Neumólogo", icon: UserIcon },
    { key: "REUMATOLOGO", label: "Reumatólogo", icon: WrenchScrewdriverIcon },
    { key: "CIRUJANO_GENERAL", label: "Cirujano general", icon: WrenchScrewdriverIcon },
    { key: "MEDICO_GENERAL", label: "Médico general", icon: UserCircleIcon }
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
    const specialtiesRows = chunkArray(SPECIALTIES, 3)

    return (
        <View className="flex-1 bg-background-light pt-12 px-5">
            <View className="flex-row items-center mb-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-2">
                    <ArrowLeftIcon size={28} color="#006A71" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-primary-light text-center flex-1 mr-8">
                    Todas las Especialidades
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
                                <Text className="text-primary-light text-base font-semibold mt-2 text-center">{item.label}</Text>
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