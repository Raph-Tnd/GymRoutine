import { View, Text, Pressable } from 'react-native'
import React from 'react'
import MetricChoiceButtonStyle from '@/style/ExerciseDisplay/MetricDisplay/MetricChoiceButtonStyle'

export default function MetricChoiceButton({choice, updateMethod} : {choice : number, updateMethod: (value : number) => void}) {
    return (
        <Pressable style={MetricChoiceButtonStyle.body} onPress={() => updateMethod(choice)}>
            <Text style={MetricChoiceButtonStyle.label}>{choice}</Text>
        </Pressable>
    )
}