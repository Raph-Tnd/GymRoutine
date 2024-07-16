import { View, Pressable } from 'react-native'
import React from 'react'
import NewProgramOptionStyle from '@/style/Profile/NewProgramOptionStyle'
import { useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from './ProfileStack';
import { StackNavigationProp } from '@react-navigation/stack';

type ProgramFormNavigationProp = StackNavigationProp<ProfileStackParamList,'ProgramForm'>;

export default function NewProgramOption() {
    const route = useNavigation<ProgramFormNavigationProp>();
    const onCreatePressHandler = () => {
        route.navigate("ProgramForm");
    };
    return (
        <View style={NewProgramOptionStyle.body}>
            <Pressable style={NewProgramOptionStyle.pressable} onPress={onCreatePressHandler}>Create program</Pressable>
            <Pressable style={NewProgramOptionStyle.pressable}>Browse programs</Pressable>
        </View>
    )
}