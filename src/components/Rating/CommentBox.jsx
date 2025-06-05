import React from 'react'
import { View, Text, TextInput } from 'react-native'

export default function CommentBox({ comment, setComment }) {
    return (
        <View>
        <Text className="text-base text-primary-light font-bold mb-6">
            ¿Algo más que quieras comentar?
        </Text>
        <TextInput
            className="bg-white border border-gray-300 rounded-lg p-4 text-base text-primary-light"
            placeholder="Cuéntanos lo que quieras"
            multiline
            numberOfLines={15} 
            style={{
                textAlignVertical: 'top',
                minHeight: 200 
            }}
            value={comment}
            onChangeText={setComment}
        />
        </View>
    )
    }
