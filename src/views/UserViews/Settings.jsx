import React, { useState } from 'react'
import { View, Text, Switch, TouchableOpacity, ScrollView, Image } from 'react-native'
import UserMenuItem from '../../components/User/UserMenuItem'
import { useTheme } from '../../context/ThemeContext'

const chevronThin = 'https://img.icons8.com/ios-filled/24/008080/chevron-right.png'
const chevronDownThin = 'https://img.icons8.com/ios-filled/24/008080/chevron-down.png'
const backArrow = 'https://img.icons8.com/ios/30/008080/left.png'

export default function Settings({ navigation }) {
    const { darkMode, setDarkMode } = useTheme()
    const [showLanguages, setShowLanguages] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState('Español')

    return (
        <View className={`flex-1 mt-10 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24, marginBottom: 16 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 16 }}>
                        <Image source={{ uri: backArrow }} style={{ width: 28, height: 28 }} />
                    </TouchableOpacity>
                    <Text className={`text-2xl font-bold text-center ${darkMode ? 'text-text-dark' : 'text-primary-light'}`} style={{ flex: 1, marginRight: 44 }}>
                        Ajustes
                    </Text>
                </View>
                <View className="px-8">
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32, justifyContent: 'space-between' }}>
                        <UserMenuItem
                            icon="https://img.icons8.com/ios-filled/48/008080/light-on.png"
                            label="Modo Oscuro"
                            hideArrow
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
                            label={selectedLanguage}
                            onPress={() => setShowLanguages(!showLanguages)}
                            hideArrow
                            rightComponent={
                                <Image
                                    source={{ uri: showLanguages ? chevronDownThin : chevronThin }}
                                    style={{ width: 24, height: 24, marginLeft: 8 }}
                                />
                            }
                        />
                        {showLanguages && (
                            <View style={{ marginLeft: 56, marginBottom: 16 }}>
                                <TouchableOpacity onPress={() => { setSelectedLanguage('Español'); setShowLanguages(false); }}>
                                    <Text style={{ color: '#008080', fontSize: 16, paddingVertical: 4 }}>Español</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setSelectedLanguage('Inglés'); setShowLanguages(false); }}>
                                    <Text style={{ color: '#008080', fontSize: 16, paddingVertical: 4 }}>Inglés</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <UserMenuItem
                        icon="https://img.icons8.com/ios-filled/48/008080/key.png"
                        label="Cambiar Contraseña"
                        onPress={() => navigation.navigate('ChangePassword')}
                    />
                    <UserMenuItem
                        icon="https://img.icons8.com/ios-filled/48/008080/user-male-delete.png"
                        label="Borrar Cuenta"
                        onPress={() => {}}
                    />
                </View>
            </ScrollView>
        </View>
    )
}