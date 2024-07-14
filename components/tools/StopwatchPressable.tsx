import { Image, Pressable } from 'react-native'
import React from 'react'
import { ToolModel } from '@/model/ToolModel'
import ToolIconStyle from '@/style/Tools/ToolIconStyle';

export default function StopwatchPressable({callUpdateMethod, timers} : {callUpdateMethod : (tool : ToolModel) => void, timers : number[]}) {
    const stopwatch : ToolModel = {
        name : "Stopwatch",
        values : timers
    };
    return (
        <Pressable style={ToolIconStyle.icon} onPress={() => callUpdateMethod(stopwatch)}>
            <Image style={ToolIconStyle.image} source={require('../../assets/images/stopwatch.png')}/>
        </Pressable>
    )
}