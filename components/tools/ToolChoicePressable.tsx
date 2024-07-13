import { View, Text, Pressable } from 'react-native'
import React from 'react'
import BottomSheetStyle from '@/style/global/BottomSheet/BottomSheetStyle'
import { getPauseTimeFormatted } from '@/model/ExerciseModel'

export default function ToolChoicePressable({choice} : {choice : number}) {
    return (
        <Pressable style={BottomSheetStyle.longPressable} >
            <Text style={BottomSheetStyle.pressableLabel}>{getPauseTimeFormatted(choice)}</Text>
        </Pressable>
    )
}