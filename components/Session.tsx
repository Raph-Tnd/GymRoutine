import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Exercise from './ExerciseDisplay/Exercise'
import SessionStyle from '@/style/Session/SessionStyle'
import { SessionModel } from '@/model/SessionModel';
import { FlatList } from 'react-native-gesture-handler';
import { MetricUpdate } from './ExerciseDisplay/MetricUpdate';
import { useSharedValue } from 'react-native-reanimated';
import { MetricModel } from '@/model/MetricModel';


export default function Session() {
    const [currentSession, setCurrentSession] = useState<SessionModel>();
    const isMetricUpdateOpen = useSharedValue(false);
    const onUpdateMetricHandler = (metric: MetricModel) => {
        toggleSheet();
    };
    const toggleSheet = () => {
        console.log("toggle")
        isMetricUpdateOpen.value = !isMetricUpdateOpen.value;
    };
    useEffect(()=> {
        if(currentSession === undefined){
            var temp : SessionModel = require("@/mocked/Session.json");
            setCurrentSession(temp);
        }
    }, []);
    return (
        <View style={SessionStyle.body}>
            {   
                !(currentSession === undefined) ?
                <>
                    <Text>{currentSession.name}</Text>
                    <FlatList
                        contentContainerStyle={SessionStyle.exerciseListContainer}
                        style={SessionStyle.exerciseList}
                        data={currentSession.exercises}
                        renderItem={({item}) => <Exercise exercise={item} updateMetricMethod={onUpdateMetricHandler}/>}
                    />
                    <Text>Tools</Text>
                    <MetricUpdate isOpen={isMetricUpdateOpen} toggleSheet={toggleSheet}/>

                </>
                :
                <View /> /* Button to redirect to a program */
            }
            
        </View>
    )
}