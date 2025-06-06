import React from 'react'
import { useNetwork } from '../../context/NetworkContext'
import CustomPopup from './CustomPopup'

function NetworkPopup() {
    const { isConnected } = useNetwork()

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
        />
    )
}

export default NetworkPopup