import React from 'react'
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native'

export default function CancelAppointmentPopup({ 
    visible, 
    onClose, 
    onConfirm,
    loading = false,
    darkMode = false 
}) {
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
                        fontWeight: 'bold',
                        fontSize: 20,
                        textAlign: 'center',
                        marginBottom: 16
                    }}>
                        Cancelar turno
                    </Text>
                    <Text style={{
                        color: darkMode ? '#E6E6E6' : '#333',
                        fontSize: 16,
                        textAlign: 'center',
                        marginBottom: 24
                    }}>
                        ¿Estás seguro que deseas cancelar este turno?
                    </Text>
                    <View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#F76C6C',
                                borderRadius: 12,
                                paddingVertical: 12,
                                width: 200,
                                marginBottom: 12
                            }}
                            onPress={onConfirm}
                            disabled={loading}
                        >
                            <Text style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 18,
                                textAlign: 'center'
                            }}>
                                {loading ? 'Cancelando...' : 'Sí, cancelar'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: darkMode ? '#07919A' : '#008080',
                                borderRadius: 12,
                                paddingVertical: 12,
                                width: 200
                            }}
                            onPress={onClose}
                            disabled={loading}
                        >
                            <Text style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 18,
                                textAlign: 'center'
                            }}>
                                No
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}