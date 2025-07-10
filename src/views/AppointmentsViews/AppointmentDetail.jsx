import React from 'react'
import { View, ScrollView, Alert, Dimensions } from 'react-native'
import { useTheme } from '../../context/ThemeContext'
import { useCancelAppointment } from '../../hooks/Appointments/useCancelAppointment'
import AppointmentHeader from '../../components/AppointmentsDetails/AppointmentHeader'
import AppointmentDoctorInfo from '../../components/AppointmentsDetails/AppointmentDoctorInfo'
import AppointmentInfoBlock from '../../components/AppointmentsDetails/AppointmentInfoBlock'
import AppointmentNotes from '../../components/AppointmentsDetails/AppointmentNotes'
import AppointmentCancelButton from '../../components/AppointmentsDetails/AppointmentCancelButton'
import { formatHourEs } from '../../utils/appointments'

const SCREEN_WIDTH = Dimensions.get('window').width

export default function AppointmentDetail({ route, navigation }) {
    const { appointment } = route.params
    const { darkMode } = useTheme()
    const { cancelAppointment, loading } = useCancelAppointment()

    const ubicacion = 'Clínica Vitalis, Av. Rivadavia 742'
    const sector = 'Sector C, consultorio 221'
    const estado = appointment.status === 'completed' ? 'Completado' : 'Confirmado'
    const notas = 'El paciente debe traer estudios de control previos.'

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
        <View className={`flex-1 mt-3 justify-center ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <AppointmentHeader
                    onBack={() => navigation.goBack()}
                    title="Turno Programado"
                    darkMode={darkMode}
                />
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 30,
                    alignItems: 'center',
                    justifyContent: "center"
                }}
            >
                <View className=" flex justify-center rounded-2xl mt-10 mb-10 p-6 shadow-sm"
                    style={{
                        backgroundColor: '#E6ECEB',
                        width: SCREEN_WIDTH > 500 ? 420 : SCREEN_WIDTH - 24,
                        marginVertical: 15,
                        padding: 24,
                        borderRadius: 16,
                    }}
                >
                    <AppointmentDoctorInfo
                        doctorName={appointment.doctorName || appointment.doctor}
                        specialty={appointment.specialty}
                        professionalId={appointment.professionalId}
                        image={appointment.image}
                    />
                    <View style={{ marginBottom: 30 }} />
                    <AppointmentInfoBlock label="Fecha y hora" value={`${fechaFormateada}\n${horaFormateada}`} />
                    <View style={{ marginBottom: 30 }} />
                    <AppointmentInfoBlock label="Ubicación" value={ubicacion} />
                    <View style={{ marginBottom: 30 }} />
                    <AppointmentInfoBlock label="Sector" value={sector} />
                    <View style={{ marginBottom: 30 }} />
                    <AppointmentInfoBlock label="Estado" value={estado} />
                    <View style={{ marginBottom: 30 }} />
                    <AppointmentNotes notes={notas} />
                    {appointment.status !== 'completed' && (
                        <AppointmentCancelButton onCancel={handleCancel} loading={loading} />
                    )}
                </View>
            </ScrollView>
        </View>
    )
}