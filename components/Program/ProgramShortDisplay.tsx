import { Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { ProgramModel } from '@/model/ProgramModel'
import GlobalStyle from '@/style/global/GlobalStyle'
import ProgramShortDisplayStyle from '@/style/Program/ProgramShortDisplayStyle'
import { ProgramContext } from '../global/Provider/ProgramProvider'

export default function ProgramShortDisplay({program} : {program: ProgramModel}) {
    const {setCurrentProgram} = useContext(ProgramContext);

    return (
        <Pressable style={GlobalStyle.pressable} onPress={() => setCurrentProgram(program)}>
            <Text style={GlobalStyle.pressableMainLabel}>{program.name + " by " + program.author}</Text>
            <Text style={ProgramShortDisplayStyle.selectPressable}>Select</Text>
        </Pressable>
    )
}