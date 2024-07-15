import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import Exercise from './ExerciseDisplay/Exercise'
import SessionStyle from '@/style/Session/SessionStyle'
import { SessionModel } from '@/model/SessionModel';
import { FlatList } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { MetricModel } from '@/model/MetricModel';
import { ExerciseModel, exerciseEquals } from '@/model/ExerciseModel';
import MetricUpdate from './ExerciseDisplay/MetricDisplay/MetricUpdate';
import ToolList from './Tools/ToolList';
import { ToolModel } from '@/model/ToolModel';
import ToolDisplay from './Tools/ToolDisplay';
import { BottomSheet } from './global/BottomSheet';

export type TimerContextType = {
    currentTimer : number;
    setCurrentTimer : (timer : number) => void;
}

export const TimerContext = createContext<TimerContextType>({} as TimerContextType);

export default function Session() {
    const [currentSession, setCurrentSession] = useState<SessionModel>();
    const [exerciseToUpdate, setExerciseToUpdate] = useState<ExerciseModel>();
    const [metricToUpdate, setMetricToUpdate] = useState<MetricModel>();
    const [toolToDisplay, setToolToDisplay] = useState<ToolModel>();
    const [currentTimer, setCurrentTimer] = useState(0);
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
        <TimerContext.Provider value={{currentTimer, setCurrentTimer}}>
            <View style={SessionStyle.body}>
                {   
                    !(currentSession === undefined) ?
                    <>
                        <Text style ={SessionStyle.label}>{currentSession.name}</Text>
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
                                <ToolDisplay tool={toolToDisplay} applyMethod={toggleSheet}/>
                                :
                                undefined
                                
                            }
                        </BottomSheet>
                    </>
                    :
                    <View /> /* Button to redirect to a program */
                }
            </View>
        </TimerContext.Provider>
    )
}