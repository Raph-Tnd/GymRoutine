import { View, Text } from 'react-native'
import React from 'react'
import CountdownTimerPressable from './CountdownTimerPressable'

export default function ToolList({exerciseTimers} : {exerciseTimers : number[]}) {
return (
    <View>
        <CountdownTimerPressable timers={exerciseTimers}/>
    </View>
)
}