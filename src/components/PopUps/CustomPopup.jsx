import React from 'react'
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native'

export default function CustomPopup({ visible, onClose, title, message, color = '#008080', borderColor = '#7AD7F0', buttonText = 'Volver', secondButtonText, onButtonPress, onSecondButtonPress }) {
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
                    borderColor: borderColor
                }}>
                    <Image
                        source={require('../../../assets/LogoApp.png')}
                        style={{ width: 180, height: 180, marginBottom: 8 }}
                        resizeMode="contain"
                    />
                    <Text style={{
                        color: color,
                        fontWeight: 'bold',
                        fontSize: 20,
                        textAlign: 'center',
                        marginBottom: 16
                    }}>
                        {title}
                    </Text>
                    <Text style={{
                        color: '#333',
                        fontSize: 16,
                        textAlign: 'center',
                        marginBottom: 24
                    }}>
                        {message}
                    </Text>
                    <View>
                        {buttonText && (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: color,
                                    borderRadius: 12,
                                    paddingVertical: 12,
                                    width: 200,
                                    marginBottom: secondButtonText ? 12 : 0
                                }}
                                onPress={onButtonPress || onClose}
                            >
                                <Text style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    textAlign: 'center'
                                }}>
                                    {buttonText}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {secondButtonText && (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#008080',
                                    borderRadius: 12,
                                    paddingVertical: 12,
                                    width: 200
                                }}
                                onPress={onSecondButtonPress || onClose}
                            >
                                <Text style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    textAlign: 'center'
                                }}>
                                    {secondButtonText}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    )
}