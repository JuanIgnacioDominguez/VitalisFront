import React from 'react'
import { View, Text, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { addAppointment } from '../Redux/slices/appointmentsSlice'

export default function Home() {
    const list = useSelector(state => state.appointments.list)
    const dispatch = useDispatch()

    return (
        <View className="p-4">
        <Text className="text-xl mb-2">Turnos Médicos</Text>
        {list.map(a => (
            <Text key={a.id}>– {a.patient}</Text>
        ))}
        <Button
            title="Agregar turno"
            onPress={() =>
            dispatch(addAppointment({ id: Date.now(), patient: 'Paciente Ejemplo' }))
            }
        />
        </View>
    )
    }
