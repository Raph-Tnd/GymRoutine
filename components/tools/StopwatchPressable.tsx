import { Image, Pressable, Text } from 'react-native'
import React, { useContext, useEffect, useState,  } from 'react'
import { ToolModel, stopwatchReadableTime } from '@/model/ToolModel'
import ToolIconStyle from '@/style/Tools/ToolIconStyle';
import { TimerContext } from '../Session';

export default function StopwatchPressable({callUpdateMethod, timers} : {callUpdateMethod : (tool : ToolModel) => void, timers : number[]}) {
    const stopwatch : ToolModel = {
        name : "Stopwatch",
        values : timers
    };
    const {currentTimer, setCurrentTimer} = useContext(TimerContext);
    useEffect(() => {
        if(currentTimer > 0){
            let newTime = currentTimer-1;
            const timeout = setTimeout(() => setCurrentTimer(newTime), 1000);
            return () => clearTimeout(timeout);
        }
    },[currentTimer])
    return (
        <Pressable style={[currentTimer == 0 ? ToolIconStyle.icon :ToolIconStyle.iconActive]} onPress={() => callUpdateMethod(stopwatch)}>
            {
                currentTimer == 0 ?
                    <Image style={ToolIconStyle.image} source={require('../../assets/images/stopwatch_icon.png')}/>
                :
                <Text style={ToolIconStyle.timer}>{stopwatchReadableTime(currentTimer)}</Text>
            }
        </Pressable>
    )
}