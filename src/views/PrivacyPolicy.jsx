import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'

export default function PrivacyPolicy({ navigation }) {
    return (
        <View className="flex-1 bg-background-light">
            <ScrollView className="px-6 pt-14 pb-6">
                <View className="flex-row items-center mb-4">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={28} color="#006A71" />
                    </TouchableOpacity>
                    <Text className="text-primary-light text-2xl font-bold flex-1 text-center mr-8">
                        Políticas de Privacidad
                    </Text>
                </View>

                <Text className="text-xl text-primary-light font-bold mb-2">1. Introducción</Text>
                <Text className="text-base text-primary-light mb-4">
                    En Vitalis, nos comprometemos a proteger tu privacidad y garantizar la seguridad de tus datos personales. Esta política describe cómo recopilamos, usamos y protegemos tu información.
                </Text>

                <Text className="text-xl text-primary-light font-bold mb-2">2. Información que Recopilamos</Text>
                <Text className="text-base text-primary-light mb-4">
                    Recopilamos información que nos proporcionas directamente, como tu nombre, correo electrónico y datos de contacto. También recopilamos información automáticamente, como tu dirección IP, tipo de dispositivo y datos de uso de la aplicación.
                </Text>

                <Text className="text-xl text-primary-light font-bold mb-2">3. Uso de la Información</Text>
                <Text className="text-base text-primary-light mb-4">
                    Utilizamos tus datos para ofrecerte nuestros servicios, mejorar la experiencia de usuario, enviar notificaciones importantes y cumplir con obligaciones legales.
                </Text>

                <Text className="text-xl text-primary-light font-bold mb-2">4. Compartir Información</Text>
                <Text className="text-base text-primary-light mb-4">
                    No compartimos tu información personal con terceros, salvo en los casos necesarios para prestar nuestros servicios o cuando la ley lo requiera.
                </Text>

                <Text className="text-xl text-primary-light font-bold mb-2">5. Seguridad</Text>
                <Text className="text-base text-primary-light mb-4">
                    Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos contra accesos no autorizados, alteraciones o destrucción.
                </Text>

                <Text className="text-xl text-primary-light font-bold mb-2">6. Tus Derechos</Text>
                <Text className="text-base text-primary-light mb-4">
                    Puedes acceder, rectificar o eliminar tus datos personales en cualquier momento. Para ejercer estos derechos, contacta con nuestro equipo de soporte.
                </Text>

                <Text className="text-xl text-primary-light font-bold mb-2">7. Cambios en la Política</Text>
                <Text className="text-base text-primary-light mb-4">
                    Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Te notificaremos sobre cambios importantes a través de la aplicación.
                </Text>

                <Text className="text-xl text-primary-light font-bold mb-2">Términos y Condiciones</Text>
                <Text className="text-base text-primary-light mb-2">
                    1. El uso de la aplicación implica la aceptación de estos términos y condiciones. Si no estás de acuerdo, por favor no utilices nuestros servicios.
                </Text>
                <Text className="text-base text-primary-light mb-2">
                    2. El usuario se compromete a proporcionar información veraz y actualizada, y a no utilizar la aplicación para fines ilícitos o no autorizados.
                </Text>
                <Text className="text-base text-primary-light mb-2">
                    3. Vitalis no se hace responsable por daños derivados del uso incorrecto de la aplicación o por causas ajenas a nuestro control.
                </Text>
                <Text className="text-base text-primary-light mb-2">
                    4. Nos reservamos el derecho de suspender o cancelar cuentas que incumplan estos términos, sin previo aviso.
                </Text>
                <Text className="text-base text-primary-light mb-2">
                    5. Para cualquier consulta, puedes contactar con nuestro equipo de soporte a través del correo soporte@vitalis.com.
                </Text>
                <Text className="text-xl text-primary-light font-bold mt-6 mb-2">Preguntas Frecuentes</Text>
                <Text className="text-base text-primary-light mb-2">
                    <Text style={{ fontWeight: 'bold' }}>¿Cómo puedo eliminar mi cuenta?</Text> Puedes solicitar la eliminación de tu cuenta desde la sección de configuración o contactando con soporte.
                </Text>
                <Text className="text-base text-primary-light mb-2">
                    <Text style={{ fontWeight: 'bold' }}>¿Qué datos almacena Vitalis?</Text> Solo almacenamos los datos necesarios para el funcionamiento de la aplicación y la mejora de nuestros servicios.
                </Text>
                <Text className="text-base text-primary-light mb-2">
                    <Text style={{ fontWeight: 'bold' }}>¿Puedo modificar mis datos?</Text> Sí, puedes modificar tus datos personales en cualquier momento desde tu perfil.
                </Text>
                <Text className="text-base text-primary-light mb-2">
                    <Text style={{ fontWeight: 'bold' }}>¿Cómo protege Vitalis mi información?</Text> Utilizamos cifrado y otras medidas de seguridad para proteger tus datos.
                </Text>
                <Text className="text-base text-primary-light mb-2">
                    <Text style={{ fontWeight: 'bold' }}>¿Dónde puedo obtener más información?</Text> Consulta nuestra web o contacta con soporte para más detalles.
                </Text>
            </ScrollView>
        </View>
    )
}