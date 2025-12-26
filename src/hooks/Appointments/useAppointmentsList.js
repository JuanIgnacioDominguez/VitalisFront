import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from '../useTranslation'

export function useAppointmentsList(appointments, tab) {
    const professionals = useSelector(state => state.professionals.list)
    const { t } = useTranslation()

    return useMemo(() => {
        return appointments
            .map(a => {
                const doctor = professionals.find(d => d.id === a.professionalId)
                return {
                    ...a,
                    doctorName: doctor?.name || 'Doctor',
                    specialty: doctor?.specialty || 'Especialidad',
                    image: doctor?.imagen
                        ? `data:image/jpeg;base64,${doctor.imagen}`
                        : 'https://ui-avatars.com/api/?name=Doctor'
                }
            })
            .filter(a => tab === t('pending') ? a.status === 'pending' : a.status === 'completed')
            .sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.time}`)
                const dateB = new Date(`${b.date}T${b.time}`)
                return dateA - dateB
            })
    }, [appointments, professionals, tab, t])
}