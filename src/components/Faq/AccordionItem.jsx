import React, { useState, forwardRef, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager, Animated } from 'react-native'
import { ChevronDownIcon } from 'react-native-heroicons/outline'
import { useTheme } from '../../context/ThemeContext'

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

const AccordionItem = forwardRef(({ question, answer, onOpen }, ref) => {
    const [expanded, setExpanded] = useState(false)
    const { darkMode } = useTheme()
    const animation = useRef(new Animated.Value(0)).current

    const borderColor = darkMode ? '#1C3B3D' : '#E6ECEB'
    const bgColor = darkMode ? '#E6ECEB' : '#E6ECEB'
    const contentBg = darkMode ? '#27484A' : '#F4FAFA'

    useEffect(() => {
        Animated.timing(animation, {
            toValue: expanded ? 1 : 0,
            duration: 260,
            useNativeDriver: false,
        }).start()
    }, [expanded])

    const animatedContentStyle = {
        opacity: animation,
        marginTop: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 8],
        }),
    }

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setExpanded(prev => {
            const next = !prev
            if (next && onOpen) onOpen()
            return next
        })
    }

    return (
        <View ref={ref} style={{ marginBottom: 16 }}>
            <TouchableOpacity
                onPress={toggleExpand}
                activeOpacity={0.8}
                style={{
                    borderRadius: 999,
                    borderWidth: 1.5,
                    borderColor: borderColor,
                    backgroundColor: bgColor,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text style={{
                    color: darkMode ? '#006A71' : '#006A71',
                    fontWeight: '500',
                    flex: 1,
                    paddingRight: 8
                }}>
                    {question}
                </Text>
                <ChevronDownIcon
                    size={20}
                    color={darkMode ? "#006A71" : "#006A71"}
                    style={{
                        transform: [{ rotate: expanded ? '180deg' : '0deg' }]
                    }}
                />
            </TouchableOpacity>

            {(
                <Animated.View style={{
                    ...animatedContentStyle,
                    backgroundColor: contentBg,
                    marginHorizontal: 12,
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    paddingVertical: expanded ? 12 : 0,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    display: expanded ? 'flex' : 'none',
                }}>
                    <Text style={{
                        color: darkMode ? '#fff' : '#006A71',
                        fontSize: 14,
                    }}>
                        {answer}
                    </Text>
                </Animated.View>
            )}
        </View>
    )
})

export default AccordionItem
