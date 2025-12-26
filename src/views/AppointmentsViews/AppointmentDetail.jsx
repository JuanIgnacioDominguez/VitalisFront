import React, { useState } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from '../../hooks/useTranslation'
import { useCancelAppointment } from '../../hooks/Appointments/useCancelAppointment'
import AppointmentHeader from '../../components/AppointmentsDetails/AppointmentHeader'
import AppointmentDoctorInfo from '../../components/AppointmentsDetails/AppointmentDoctorInfo'
import AppointmentInfoBlock from '../../components/AppointmentsDetails/AppointmentInfoBlock'
import AppointmentNotes from '../../components/AppointmentsDetails/AppointmentNotes'
import AppointmentCancelButton from '../../components/AppointmentsDetails/AppointmentCancelButton'
import CancelAppointmentPopup from "../../components/PopUps/CancelAppointmentPopup"
import CustomPopup from '../../components/PopUps/CustomPopup'
import { formatHourEs } from '../../utils/appointments'

const SCREEN_WIDTH = Dimensions.get('window').width

export default function AppointmentDetail({ route, navigation }) {
    const { appointment } = route.params
    const { darkMode } = useTheme()
    const { t } = useTranslation()
    const { cancelAppointment, loading } = useCancelAppointment()
    const [showCancelPopup, setShowCancelPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [showErrorPopup, setShowErrorPopup] = useState(false)

    const ubicacion = 'Clínica Vitalis, Av. Rivadavia 742'
    const sector = 'Sector C, consultorio 221'
    const estado = appointment.status === 'completed' ? t('completed') : t('confirmed')
    const notas = 'El paciente debe traer estudios de control previos.'

    const fechaFormateada = (() => {
        const dias = [
            t('daysLong.sunday'),
            t('daysLong.monday'),
            t('daysLong.tuesday'),
            t('daysLong.wednesday'),
            t('daysLong.thursday'),
            t('daysLong.friday'),
            t('daysLong.saturday')
        ]
        const meses = [
            t('months.january'), t('months.february'), t('months.march'),
            t('months.april'), t('months.may'), t('months.june'),
            t('months.july'), t('months.august'), t('months.september'),
            t('months.october'), t('months.november'), t('months.december')
        ]
        const [año, mes, dia] = appointment.date.split('-')
        const dateObj = new Date(`${appointment.date}T00:00:00`)
        const diaSemana = dias[dateObj.getDay()]
        const mesNombre = meses[parseInt(mes) - 1]
        
        const currentLang = t('english') 
        if (currentLang === 'English') {
            return `${diaSemana}, ${mesNombre} ${parseInt(dia)}, ${año}`
        }
        return `${diaSemana}, ${parseInt(dia)} de ${mesNombre.toLowerCase()} de ${año}`
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
        <View className={`flex-1 justify-center ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <AppointmentHeader
                onBack={() => navigation.goBack()}
                title={t('scheduledAppointment')}
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
                <View className=" flex justify-center rounded-2xl mt-4 mb-10 p-6 shadow-sm"
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
                        label={t('dateAndTime')}
                        value={`${fechaFormateada}\n${horaFormateada}`}
                        darkMode={darkMode}
                    />
                    <View style={{ marginBottom: 30 }} />
                    <AppointmentInfoBlock
                        label={t('location')}
                        value={ubicacion}
                        darkMode={darkMode}
                    />
                    <View style={{ marginBottom: 30 }} />
                    <AppointmentInfoBlock
                        label={t('sector')}
                        value={sector}
                        darkMode={darkMode}
                    />
                    <View style={{ marginBottom: 30 }} />
                    <AppointmentInfoBlock
                        label={t('status')}
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
                title={t('appointmentCanceled')}
                message={t('appointmentCanceledMessage')}
                color="#008080"
                borderColor="#7AD7F0"
                buttonText={null}
                darkMode={darkMode}
            />

            <CustomPopup
                visible={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                title={t('error')}
                message="No se pudo cancelar el turno. Intenta nuevamente."
                color="#F76C6C"
                borderColor="#F76C6C"
                buttonText="Volver"
                darkMode={darkMode}
            />
        </View>
    )
}