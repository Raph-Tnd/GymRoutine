import { View, Text, Pressable } from 'react-native'
import React from 'react'

export default function CountdownTimerPressable({timers} : {timers : number[]}) {
return (
    <Pressable style={{width: 50, height : 50, backgroundColor: 'orange'}}>
        <Text>Timer</Text>
    </Pressable>
)
}