import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Exercise from './ExerciseDisplay/Exercise'
import SessionStyle from '@/style/Session/SessionStyle'
import { SessionModel } from '@/model/SessionModel';
import { FlatList } from 'react-native-gesture-handler';
import { MetricUpdateBottomSheet as BottomSheet } from './global/BottomSheet';
import { useSharedValue } from 'react-native-reanimated';
import { MetricModel } from '@/model/MetricModel';
import { ExerciseModel, exerciseEquals } from '@/model/ExerciseModel';
import MetricUpdate from './ExerciseDisplay/MetricDisplay/MetricUpdate';
import ToolList from './Tools/ToolList';
import { ToolModel } from '@/model/ToolModel';
import ToolDisplay from './Tools/ToolDisplay';


export default function Session() {
    const [currentSession, setCurrentSession] = useState<SessionModel>();
    const [exerciseToUpdate, setExerciseToUpdate] = useState<ExerciseModel>();
    const [metricToUpdate, setMetricToUpdate] = useState<MetricModel>();
    const [toolToDisplay, setToolToDisplay] = useState<ToolModel>();
    const isMetricUpdateOpen = useSharedValue(false);
    const toggleSheet = () => {
        isMetricUpdateOpen.value = !isMetricUpdateOpen.value;
    };
    const onUpdateMetricHandler = (exercise : ExerciseModel, metric: MetricModel) => {
        setToolToDisplay(undefined);
        setExerciseToUpdate(exercise);
        setMetricToUpdate(metric);
        toggleSheet();
    };
    const updateMetricOnExercise = (metric : MetricModel) => {
        if(exerciseToUpdate != undefined){
            exerciseToUpdate.metrics[exerciseToUpdate.metrics.findIndex(x => x.name === metric.name)] = metric;
            let tempSession : SessionModel | undefined = currentSession;
            if(tempSession != undefined){
                tempSession.exercises[tempSession.exercises.findIndex(x => exerciseEquals(x,exerciseToUpdate))] = exerciseToUpdate;
                setCurrentSession({...tempSession})
            }
            toggleSheet();
        }
    };
    const onUpdateToolHandler = (tool : ToolModel) => {
        setExerciseToUpdate(undefined);
        setMetricToUpdate(undefined);
        setToolToDisplay(tool);
        toggleSheet();
    }
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
                        renderItem={({item}) => <Exercise exercise={item} callUpdateMetricMethod={onUpdateMetricHandler}/>}
                    />
                    <ToolList callUpdateMethod={onUpdateToolHandler} exerciseTimers={currentSession.exercises.map(ex => ex.pauseTime)}/>
                    {/* Has to be in Session because absolute position inside a scrollview/flatlist isn't working */}
                    <BottomSheet isOpen={isMetricUpdateOpen}
                        toggleSheet={toggleSheet}
                    >
                        {
                            metricToUpdate != undefined  ?
                            <MetricUpdate metric={metricToUpdate} updateMethod={updateMetricOnExercise}/>
                            :
                            toolToDisplay != undefined ?
                            <ToolDisplay tool={toolToDisplay}/>
                            :
                            undefined
                            
                        }
                    </BottomSheet>
                </>
                :
                <View /> /* Button to redirect to a program */
            }
            
        </View>
    )
}