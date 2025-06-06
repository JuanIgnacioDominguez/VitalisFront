import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useTheme } from '../../context/ThemeContext'
import { useCancelAppointment } from '../../hooks/Appointments/useCancelAppointment'
import { formatHourEs } from '../../utils/appointments'

const SCREEN_WIDTH = Dimensions.get('window').width

export default function AppointmentDetail({ route, navigation }) {
    const { appointment } = route.params
    const { darkMode } = useTheme()
    const { cancelAppointment, loading } = useCancelAppointment()

    // Datos fijos para campos no presentes en la base
    const ubicacion = 'Clínica Vitalis, Av. Rivadavia 742'
    const sector = 'Sector C, consultorio 221'
    // Estado dinámico según status
    const estado =
        appointment.status === 'completed'
            ? 'Completado'
            : 'Confirmado'
    const notas = 'El paciente debe traer estudios de control previos.'

    // Formato de fecha y hora
    const fechaFormateada = (() => {
        const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
        const [año, mes, dia] = appointment.date.split('-')
        const dateObj = new Date(`${appointment.date}T00:00:00`)
        const diaSemana = dias[dateObj.getDay()]
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
        return `${diaSemana}, ${parseInt(dia)} de ${meses[parseInt(mes) - 1]} de ${año}`
    })()
    const horaFormateada = formatHourEs(appointment.time)

    const handleCancel = () => {
        Alert.alert(
            'Cancelar turno',
            '¿Estás seguro que deseas cancelar este turno?',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Sí, cancelar',
                    style: 'destructive',
                    onPress: async () => {
                        await cancelAppointment(appointment, () => {
                            navigation.goBack()
                        }, () => {
                            Alert.alert('Error', 'No se pudo cancelar el turno.')
                        })
                    }
                }
            ]
        )
    }

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', paddingBottom: 30 }}>
                <View className="flex-row items-center px-6 pt-10 pb-2">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
                    </TouchableOpacity>
                    <Text className={`text-2xl font-bold flex-1 text-center mr-8 ${darkMode ? 'text-primary-dark' : 'text-primary-light'}`}>
                        Turno Programado
                    </Text>
                </View>
                <View
                    className="flex-1 justify-center"
                    style={{
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <View
                        className="rounded-2xl mt-2 p-6 shadow-sm"
                        style={{
                            backgroundColor: '#E6ECEB',
                            width: SCREEN_WIDTH - 32,
                            minHeight: 540,
                            marginHorizontal: 16,
                        }}
                    >
                        <View className="flex-row items-center mb-4">
                            <Image
                                source={
                                    appointment.image
                                        ? { uri: appointment.image }
                                        : { uri: 'https://ui-avatars.com/api/?name=Doctor' }
                                }
                                className="w-16 h-16 rounded-full mr-4 border-2 border-primary-light"
                            />
                            <View>
                                <Text className="text-xl font-bold text-primary-light">{appointment.doctorName || appointment.doctor}</Text>
                                <Text className="text-base text-secondary-light">{appointment.specialty}</Text>
                                <Text className="text-base text-secondary-light">MP {appointment.professionalId}</Text>
                            </View>
                        </View>
                        <Text className="font-bold text-primary-light mb-1">Fecha y hora</Text>
                        <Text className="mb-3 text-primary-light">{fechaFormateada}{'\n'}{horaFormateada}</Text>
                        <Text className="font-bold text-primary-light mb-1">Ubicación</Text>
                        <Text className="mb-3 text-primary-light">{ubicacion}</Text>
                        <Text className="font-bold text-primary-light mb-1">Sector</Text>
                        <Text className="mb-3 text-primary-light">{sector}</Text>
                        <Text className="font-bold text-primary-light mb-1">Estado</Text>
                        <Text className="mb-3 text-primary-light">{estado}</Text>
                        <Text className="font-bold text-primary-light mb-1">Notas adicionales</Text>
                        <Text className="mb-3 text-primary-light">{notas}</Text>
                        {/* Solo mostrar el botón si el estado es pending */}
                        {appointment.status !== 'completed' && (
                            <TouchableOpacity
                                className="rounded-xl py-3 mt-4"
                                style={{ backgroundColor: '#F76C6C' }}
                                onPress={handleCancel}
                                disabled={loading}
                                activeOpacity={0.85}
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    {loading ? 'Cancelando...' : 'Cancelar turno'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}