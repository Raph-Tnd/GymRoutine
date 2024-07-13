import { View, Text, Pressable } from 'react-native'
import React from 'react'
import BottomSheetStyle from '@/style/global/BottomSheet/BottomSheetStyle'

export default function MetricChoicePressable({choice, updateMethod} : {choice : number, updateMethod: (value : number) => void}) {
    return (
        <Pressable style={BottomSheetStyle.pressable} onPress={() => updateMethod(choice)}>
            <Text style={BottomSheetStyle.pressableLabel}>{choice}</Text>
        </Pressable>
    )
}