import { View, Pressable } from 'react-native'
import React, { useContext } from 'react'
import SessionChangeStyle from '@/style/Session/SessionChangeStyle'
import { ProgramContext } from '../global/Provider/ProgramProvider'

export default function SessionChange({maxSession = 0, saveMethod} : {maxSession? : number, saveMethod : () => void}) {
    const {currentSessionIndex, setCurrentSessionIndex} = useContext(ProgramContext);
    const onSessionChange = (previous : boolean) => {
        saveMethod();
        setCurrentSessionIndex(currentSessionIndex + (previous ? -1 : 1));
    }
    return (
        <View style={SessionChangeStyle.body}>
            {
                currentSessionIndex > 0 ?
                <Pressable style={SessionChangeStyle.pressable} onPress={() => onSessionChange(true)}>Previous</Pressable>
                :
                <View></View>
            }
            {
                currentSessionIndex < maxSession ?
                <Pressable style={SessionChangeStyle.pressable} onPress={() => onSessionChange(false)}>Next</Pressable>:
                <View></View>
            }
        </View>
    )
}