import { Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ToolModel } from '@/model/ToolModel'
import ToolIconStyle from '@/style/Tools/ToolIconStyle'
import { Audio } from 'expo-av';
import { Sound, SoundObject } from 'expo-av/build/Audio';

export default function MetronomePressable() {
    const metronome : ToolModel = {
        name : "Metronome",
        values : []
    };
    const [isActive, setIsActive] = useState(false);
    const [sound, setSound] = useState<Sound>();
    const onPressHandler = () => {
        setIsActive((prev) => !prev);
    }
    useEffect(() => {
        let timeout : NodeJS.Timeout;
        const playSoundMethod = async () => {
            if(isActive){
                const { sound } = await Audio.Sound.createAsync(require('@/assets/sounds/metronome.mp3'));
                setSound(sound);
                timeout = setInterval(async () => await sound.replayAsync(), 1000);
            }
        };
        playSoundMethod();
        return () => {
            clearInterval(timeout);
            if(sound)
                sound.unloadAsync();
        }
        
    },[isActive])
    return (
        <Pressable style={[!isActive ? ToolIconStyle.icon : ToolIconStyle.iconActive]}  onPress={onPressHandler}>
            <Image style={ToolIconStyle.image} source={require('../../assets/images/metronome_icon.png')}/>
        </Pressable>
    )
}