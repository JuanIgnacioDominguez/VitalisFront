import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useTheme } from '../../context/ThemeContext'

export default function PrivacyPolicy({ navigation }) {
    const { darkMode } = useTheme()
    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <ScrollView className="px-6 pt-14 pb-6">
                <View className="flex-row items-center mb-4">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
                    </TouchableOpacity>
                    <Text className={`text-2xl font-bold flex-1 text-center mr-8 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                        Políticas de Privacidad
                    </Text>
                </View>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>1. Introducción</Text>
                <Text className={`text-base mb-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    En Vitalis, nos comprometemos a proteger tu privacidad y garantizar la seguridad de tus datos personales. Esta política describe cómo recopilamos, usamos y protegemos tu información.
                </Text>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>2. Información que Recopilamos</Text>
                <Text className={`text-base mb-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    Recopilamos información que nos proporcionas directamente, como tu nombre, correo electrónico y datos de contacto. También recopilamos información automáticamente, como tu dirección IP, tipo de dispositivo y datos de uso de la aplicación.
                </Text>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>3. Uso de la Información</Text>
                <Text className={`text-base mb-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    Utilizamos tus datos para ofrecerte nuestros servicios, mejorar la experiencia de usuario, enviar notificaciones importantes y cumplir con obligaciones legales.
                </Text>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>4. Compartir Información</Text>
                <Text className={`text-base mb-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    No compartimos tu información personal con terceros, salvo en los casos necesarios para prestar nuestros servicios o cuando la ley lo requiera.
                </Text>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>5. Seguridad</Text>
                <Text className={`text-base mb-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos contra accesos no autorizados, alteraciones o destrucción.
                </Text>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>6. Tus Derechos</Text>
                <Text className={`text-base mb-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    Puedes acceder, rectificar o eliminar tus datos personales en cualquier momento. Para ejercer estos derechos, contacta con nuestro equipo de soporte.
                </Text>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>7. Cambios en la Política</Text>
                <Text className={`text-base mb-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Te notificaremos sobre cambios importantes a través de la aplicación.
                </Text>

                <Text className={`text-xl font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>Términos y Condiciones</Text>
                <Text className={`text-base mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    1. El uso de la aplicación implica la aceptación de estos términos y condiciones. Si no estás de acuerdo, por favor no utilices nuestros servicios.
                </Text>
                <Text className={`text-base mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    2. El usuario se compromete a proporcionar información veraz y actualizada, y a no utilizar la aplicación para fines ilícitos o no autorizados.
                </Text>
                <Text className={`text-base mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    3. Vitalis no se hace responsable por daños derivados del uso incorrecto de la aplicación o por causas ajenas a nuestro control.
                </Text>
                <Text className={`text-base mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    4. Nos reservamos el derecho de suspender o cancelar cuentas que incumplan estos términos, sin previo aviso.
                </Text>
                <Text className={`text-base mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    5. Para cualquier consulta, puedes contactar con nuestro equipo de soporte a través del correo soporte@vitalis.com.
                </Text>
            </ScrollView>
        </View>
    )
}