import React from 'react'
import { useNetwork } from '../../context/NetworkContext'
import { useTheme } from '../../context/ThemeContext'
import CustomPopup from './CustomPopup'

function NetworkPopup() {
    const { isConnected } = useNetwork()
    const { darkMode } = useTheme()

    if (isConnected) return null

    return (
        <CustomPopup
            visible={true}
            onClose={() => {}}
            title="Sin conexión"
            message="No tienes conexión a internet. Por favor, verifica tu conexión y vuelve a intentarlo."
            color="#F76C6C"
            borderColor="#F76C6C"
            buttonText={null}
            darkMode={darkMode}
        />
    )
}

export default NetworkPopup