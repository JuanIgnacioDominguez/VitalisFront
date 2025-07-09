import translations from '../translations'

export function getMonthsArray(language = 'es') {
    if (language === 'en') {
        return [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ]
    }
    // Español por defecto
    return [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
}

export function getDaysArray(language = 'es') {
    if (language === 'en') {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
    // Español por defecto
    return ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
}

export function formatDateLocalized(fechaISO, language = 'es') {
    const fecha = new Date(fechaISO)
    const day = fecha.getDate()
    const month = fecha.getMonth()
    const year = fecha.getFullYear()
    
    const months = getMonthsArray(language)
    const monthName = months[month]
    
    return `${day} de ${monthName}, ${year}`
}

export function formatHourLocalized(hora, language = 'es') {
    // hora: '10:00' o '14:30'
    let [h, m] = hora.split(':')
    h = parseInt(h)
    
    if (language === 'en') {
        const suffix = h >= 12 ? 'PM' : 'AM'
        if (h > 12) h -= 12
        if (h === 0) h = 12
        return `${h}:${m} ${suffix}`
    }
    
    // Español
    const sufijo = h >= 12 ? 'PM' : 'AM'
    if (h > 12) h -= 12
    if (h === 0) h = 12
    return `${h}:${m} ${sufijo}`
}

export function getSpecialtyTranslation(specialtyKey, t) {
    // Mapear las claves de especialidades a las claves de traducción
    const specialtyKeyMap = {
        'CARDIOLOGO': 'cardiologist',
        'PEDIATRA': 'pediatrician', 
        'PSIQUIATRA': 'psychiatrist',
        'GINECOLOGO': 'gynecologist',
        'TRAUMATOLOGO': 'traumatologist',
        'UROLOGO': 'urologist',
        'DERMATOLOGO': 'dermatologist',
        'NEUROLOGO': 'neurologist',
        'OTORRINOLARINGOLOGO': 'otolaryngologist',
        'OFTALMOLOGO': 'ophthalmologist',
        'NEFROLOGO': 'nephrologist',
        'ENDOCRINOLOGO': 'endocrinologist',
        'ONCOLOGO': 'oncologist',
        'INTERNISTA': 'internist',
        'ANESTESIOLOGO': 'anesthesiologist',
        'GASTROENTEROLOGO': 'gastroenterologist',
        'NEUMOLOGO': 'pulmonologist',
        'REUMATOLOGO': 'rheumatologist',
        'CIRUJANO_GENERAL': 'generalSurgeon',
        'MEDICO_GENERAL': 'generalPractitioner'
    }
    
    const translationKey = specialtyKeyMap[specialtyKey]
    return translationKey ? t(translationKey) : specialtyKey
}
