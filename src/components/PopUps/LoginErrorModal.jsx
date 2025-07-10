import React from 'react'
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native'

export default function LoginErrorModal({ visible, onClose, message, darkMode }) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.7)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    backgroundColor: darkMode ? '#121212' : '#F8F6F2',
                    borderRadius: 16,
                    padding: 24,
                    alignItems: 'center',
                    width: 320,
                    elevation: 8,
                    borderWidth: 2,
                    borderColor: '#F76C6C'
                }}>
                    <Image
                        source={require('../../../assets/LogoApp.png')}
                        style={{ width: 180, height: 180, marginBottom: 8 }}
                        resizeMode="contain"
                    />
                    <Text style={{
                        color: '#F76C6C',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: 16
                    }}>
                        Error de inicio de sesión
                    </Text>
                    <Text style={{
                        color: darkMode ? '#E6E6E6' : '#333',
                        fontSize: 16,
                        textAlign: 'center',
                        marginBottom: 24
                    }}>
                        {message}
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#F76C6C',
                            borderRadius: 12,
                            paddingVertical: 12,
                            width: 200
                        }}
                        onPress={onClose}
                    >
                        <Text style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 18,
                            textAlign: 'center'
                        }}>
                            Volver
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}