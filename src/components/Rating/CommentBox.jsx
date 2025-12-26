import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { useTranslation } from '../../hooks/useTranslation'

export default function CommentBox({ comment, setComment, disabled = false }) {
    const { t } = useTranslation()
    
    return (
        <View>
        <Text className="text-base text-primary-light font-bold mb-6">
            {t('anythingElseToComment')}
        </Text>
        <TextInput
            className="bg-white border border-gray-300 rounded-lg p-4 text-base text-primary-light"
            placeholder={t('tellUsWhatYouThink')}
            multiline
            numberOfLines={15} 
            style={{
                textAlignVertical: 'top',
                minHeight: 200,
                opacity: disabled ? 0.6 : 1
            }}
            value={comment}
            onChangeText={setComment}
            editable={!disabled}
        />
        </View>
    )
    }
