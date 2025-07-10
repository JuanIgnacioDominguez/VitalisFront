import React, { useState } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import { useTheme } from '../../context/ThemeContext'
import { useCancelAppointment } from '../../hooks/Appointments/useCancelAppointment'
import AppointmentHeader from '../../components/AppointmentsDetails/AppointmentHeader'
import AppointmentDoctorInfo from '../../components/AppointmentsDetails/AppointmentDoctorInfo'
import AppointmentInfoBlock from '../../components/AppointmentsDetails/AppointmentInfoBlock'
import AppointmentNotes from '../../components/AppointmentsDetails/AppointmentNotes'
import AppointmentCancelButton from '../../components/AppointmentsDetails/AppointmentCancelButton'
import CancelAppointmentPopup from '../../components/PopUps/CancelAppointmentPopUp'
import CustomPopup from '../../components/PopUps/CustomPopup'
import { formatHourEs } from '../../utils/appointments'

const SCREEN_WIDTH = Dimensions.get('window').width

export default function AppointmentDetail({ route, navigation }) {
    const { appointment } = route.params
    const { darkMode } = useTheme()
    const { cancelAppointment, loading } = useCancelAppointment()
    const [showCancelPopup, setShowCancelPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [showErrorPopup, setShowErrorPopup] = useState(false)

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
        setShowCancelPopup(true)
    }

    const handleConfirmCancel = async () => {
        setShowCancelPopup(false)
        await cancelAppointment(appointment, () => {
            setShowSuccessPopup(true)
            setTimeout(() => {
                setShowSuccessPopup(false)
                navigation.goBack()
            }, 5000)
        }, () => {
            setShowErrorPopup(true)
        })
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
                        backgroundColor: darkMode ? '#232B2B' : '#E6ECEB',
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
                        darkMode={darkMode}
                    />
                    <View style={{ marginBottom: 30 }} />
                    <AppointmentInfoBlock
                        label="Fecha y hora"
                        value={`${fechaFormateada}\n${horaFormateada}`}
                        darkMode={darkMode}
                    />
                    <View style={{ marginBottom: 30 }} />
                    <AppointmentInfoBlock
                        label="Ubicación"
                        value={ubicacion}
                        darkMode={darkMode}
                    />
                    <View style={{ marginBottom: 30 }} />
                    <AppointmentInfoBlock
                        label="Sector"
                        value={sector}
                        darkMode={darkMode}
                    />
                    <View style={{ marginBottom: 30 }} />
                    <AppointmentInfoBlock
                        label="Estado"
                        value={estado}
                        darkMode={darkMode}
                    />
                    <View style={{ marginBottom: 30 }} />
                    <AppointmentNotes
                        notes={notas}
                        darkMode={darkMode}
                    />
                    {appointment.status !== 'completed' && (
                        <AppointmentCancelButton
                            onCancel={handleCancel}
                            loading={loading}
                        />
                    )}
                </View>
            </ScrollView>

            <CancelAppointmentPopup
                visible={showCancelPopup}
                onClose={() => setShowCancelPopup(false)}
                onConfirm={handleConfirmCancel}
                loading={loading}
                darkMode={darkMode}
            />

            <CustomPopup
                visible={showSuccessPopup}
                onClose={() => {}}
                title="¡Turno cancelado!"
                message="Tu turno fue cancelado exitosamente."
                color="#008080"
                borderColor="#7AD7F0"
                buttonText={null}
                darkMode={darkMode}
            />

            <CustomPopup
                visible={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                title="Error"
                message="No se pudo cancelar el turno. Intenta nuevamente."
                color="#F76C6C"
                borderColor="#F76C6C"
                buttonText="Volver"
                darkMode={darkMode}
            />
        </View>
    )
}