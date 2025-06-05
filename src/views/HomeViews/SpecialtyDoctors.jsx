import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import SpecialtyHeader from '../../components/SpecialityDoctors/SpecialtyHeader'
import SpecialtyDoctorsList from '../../components/SpecialityDoctors/SpecialtyDoctorsList'

const specialtyLabels = {
    CARDIOLOGO: "Cardiólogo",
    PEDIATRA: "Pediatra",
    PSIQUIATRA: "Psiquiatra",
    GINECOLOGO: "Ginecólogo",
    TRAUMATOLOGO: "Traumatólogo",
    UROLOGO: "Urólogo",
    DERMATOLOGO: "Dermatólogo",
    NEUROLOGO: "Neurólogo",
    OTORRINOLARINGOLOGO: "Otorrinolaringólogo",
    OFTALMOLOGO: "Oftalmólogo",
    NEFROLOGO: "Nefrólogo",
    ENDOCRINOLOGO: "Endocrinólogo",
    ONCOLOGO: "Oncólogo",
    INTERNISTA: "Internista",
    ANESTESIOLOGO: "Anestesiólogo",
    GASTROENTEROLOGO: "Gastroenterólogo",
    NEUMOLOGO: "Neumólogo",
    REUMATOLOGO: "Reumatólogo",
    CIRUJANO_GENERAL: "Cirujano general",
    MEDICO_GENERAL: "Médico general"
}

function SpecialtyDoctors({ route, navigation }) {
    const { specialty } = route.params
    const professionals = useSelector(state => state.professionals.list)
    const loading = useSelector(state => state.professionals.loading)
    const error = useSelector(state => state.professionals.error)

    const filteredDoctors = professionals.filter(
        d => d.specialty?.toUpperCase() === specialty.toUpperCase()
    )

    return (
        <View className="flex-1 bg-background-light">
            <SpecialtyHeader title={specialty} onBack={navigation.goBack} />
            <View className="flex-1 px-5">
                <SpecialtyDoctorsList
                    doctors={filteredDoctors}
                    loading={loading}
                    error={error}
                    specialtyLabels={specialtyLabels}
                    onDoctorPress={doctor => navigation.navigate('AppointmentDetail', { appointment: doctor })}
                />
            </View>
        </View>
    )
}

SpecialtyDoctors.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            specialty: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired
    }).isRequired
}

export default SpecialtyDoctors