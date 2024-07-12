import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Exercise from './ExerciseDisplay/Exercise'
import SessionStyle from '@/style/Session/SessionStyle'
import { SessionModel } from '@/model/SessionModel';
import { FlatList } from 'react-native-gesture-handler';
import { MetricUpdateBottomSheet } from './ExerciseDisplay/MetricDisplay/MetricUpdateBottomSheet';
import { useSharedValue } from 'react-native-reanimated';
import { MetricModel } from '@/model/MetricModel';
import { ExerciseModel, exerciseEquals } from '@/model/ExerciseModel';


export default function Session() {
    const [currentSession, setCurrentSession] = useState<SessionModel>();
    const [exerciseToUpdate, setExerciseToUpdate] = useState<ExerciseModel>({} as ExerciseModel);
    const [metricToUpdate, setMetricToUpdate] = useState<MetricModel>({} as MetricModel);
    const isMetricUpdateOpen = useSharedValue(false);
    const onUpdateMetricHandler = (exercise : ExerciseModel, metric: MetricModel) => {
        setExerciseToUpdate(exercise);
        setMetricToUpdate(metric);
        toggleSheet();
    };
    const toggleSheet = () => {
        isMetricUpdateOpen.value = !isMetricUpdateOpen.value;
    };
    const updateMetric = (exercise : ExerciseModel) => {
        let tempSession : SessionModel | undefined = currentSession;
        if(tempSession != undefined){
            tempSession.exercises[tempSession.exercises.findIndex(x => exerciseEquals(x,exercise))] = exercise;
            setCurrentSession({...tempSession})
        }
        toggleSheet();
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
                    <MetricUpdateBottomSheet isOpen={isMetricUpdateOpen}
                        toggleSheet={toggleSheet} 
                        exerciseToUpdate={exerciseToUpdate} 
                        metricToUpdate={metricToUpdate}
                        onUpdateMethod={updateMetric}
                    />
                </>
                :
                <View /> /* Button to redirect to a program */
            }
            
        </View>
    )
}