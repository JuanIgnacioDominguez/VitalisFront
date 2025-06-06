export function getDaysOfMonth(year, month) {
    const days = []
    const today = new Date()
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate())
    const startDay = (year === today.getFullYear() && month === today.getMonth()) ? today.getDate() : 1
    const lastDay = new Date(year, month + 1, 0).getDate()
    for (let d = startDay; d <= lastDay; d++) {
        const date = new Date(year, month, d)
        if (date < minDate || date > maxDate) continue
        days.push({
            label: date.toLocaleDateString('es-AR', { weekday: 'short' }),
            day: d,
            value: date.toISOString().slice(0, 10),
            isToday: date.toDateString() === today.toDateString()
        })
    }
    return days
}

export function generateTimeSlots() {
    const slots = []
    for (let hour = 9; hour < 18; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`)
        slots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
    slots.push('18:00')
    return slots
}