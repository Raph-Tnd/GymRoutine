import { Image, Pressable, Text } from 'react-native'
import React, { useContext, useEffect,  } from 'react'
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
            return () => clearInterval(timeout);
        }
    },[currentTimer])
    return (
        <Pressable style={ToolIconStyle.icon} onPress={() => callUpdateMethod(stopwatch)}>
            {
                currentTimer == 0 ?
                    <Image style={ToolIconStyle.image} source={require('../../assets/images/stopwatch.png')}/>
                :
                <Text style={ToolIconStyle.stopwatchTimer}>{stopwatchReadableTime(currentTimer)}</Text>
            }
        </Pressable>
    )
}