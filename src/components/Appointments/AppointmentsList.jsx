import React from 'react'
import { ScrollView } from 'react-native'
import AppointmentCard from './AppointmentCard'

export default function AppointmentsList({ appointments, onPressDetail }) {
    return (
        <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 90 }}>
            {appointments.map(a => (
                <AppointmentCard
                    key={a.id}
                    doctor={a.doctorName}
                    specialty={a.specialty}
                    date={a.date}
                    time={a.time}
                    image={a.image}
                    onPress={() => onPressDetail(a)}
                />
            ))}
        </ScrollView>
    )
}