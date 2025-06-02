import React from 'react'
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native'

export default function LogOut({ visible, onClose, onLogout }) {
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
                    backgroundColor: '#F8F6F2',
                    borderRadius: 16,
                    padding: 24,
                    alignItems: 'center',
                    width: 320,
                    elevation: 8,
                    borderWidth: 2,
                    borderColor: '#7AD7F0'
                }}>
                    <Image
                        source={require('../../../assets/LogoApp.png')}
                        style={{ width: 250, height: 250, marginBottom: 8 }} 
                        resizeMode="contain"
                    />
                    <Text style={{
                        color: '#008080',
                        fontWeight: 'bold',
                        fontSize: 20,
                        textAlign: 'center',
                        marginBottom: 20
                    }} className='mt-4'>
                        ¿Seguro que quieres{'\n'}cerrar sesión?
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#F76C6C',
                            borderRadius: 12,
                            paddingVertical: 12,
                            width: 200,
                            marginBottom: 12
                        }}
                        onPress={onLogout}
                    >
                        <Text style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 18,
                            textAlign: 'center'
                        }}>
                            Cerrar sesión
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#008080',
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