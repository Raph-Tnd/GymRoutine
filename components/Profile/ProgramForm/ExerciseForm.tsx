// ExerciseForm.tsx
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import MetricForm from './MetricForm';
import { MetricModel } from '@/model/MetricModel';
import { ExerciseModel } from '@/model/ExerciseModel';
import ProgramFormStyle from '@/style/Profile/ProgramFormStyle';

export default function ExerciseForm({ exercise, onUpdate } : { exercise: ExerciseModel, onUpdate: (updatedExercise : ExerciseModel) => void}){
    const handleChange = (field: keyof ExerciseModel, value: string | number) => {
        onUpdate({ ...exercise, [field]: value });
    };

    const addMetric = () => {
        onUpdate({
        ...exercise,
        metrics: [...exercise.metrics, { name: '', value: 0 }],
        });
    };

    const updateMetric = (updatedMetric: MetricModel, index: number) => {
        onUpdate({
        ...exercise,
        metrics: exercise.metrics.map((metric, i) => 
            i === index ? updatedMetric : metric
        ),
        });
    };

    return (
        <View style={ProgramFormStyle.exercise}>
            <TextInput
                style={ProgramFormStyle.exerciseMainLabel}
                value={exercise.name}
                onChangeText={(value) => handleChange('name', value)}
                placeholder="Enter exercise name"
            />
            <Delimiter/>
            <TextInput
                style={ProgramFormStyle.exerciseLabel}
                value={exercise.sets.toString()}
                onChangeText={(value) => handleChange('sets', parseInt(value) || 0)}
                keyboardType="numeric"
                placeholder="Enter number of sets"
            />
            <Delimiter/>
            <TextInput
                style={ProgramFormStyle.exerciseLabel}
                value={exercise.repsPerSet.toString()}
                onChangeText={(value) => handleChange('repsPerSet', parseInt(value) || 0)}
                keyboardType="numeric"
                placeholder="Enter reps per set"
            />
            <Delimiter/>
            <TextInput
                style={ProgramFormStyle.exerciseLabel}
                value={exercise.weight.toString()}
                onChangeText={(value) => handleChange('weight', parseFloat(value) || 0)}
                keyboardType="numeric"
                placeholder="Enter weight"
            />
            <Delimiter/>
            <TextInput
                style={ProgramFormStyle.exerciseLabel}
                value={exercise.weightUnit}
                onChangeText={(value) => handleChange('weightUnit', value)}
                placeholder="Enter weight unit (e.g., kg, lbs)"
            />
            <Delimiter/>
            <TextInput
                style={ProgramFormStyle.exerciseLabel}
                value={exercise.pauseTime.toString()}
                onChangeText={(value) => handleChange('pauseTime', parseInt(value) || 0)}
                keyboardType="numeric"
                placeholder="Enter pause time in seconds"
            />


            {exercise.metrics.map((metric, index) => (
                <MetricForm
                key={index}
                metric={metric}
                onUpdate={(updatedMetric) => updateMetric(updatedMetric, index)}
                />
            ))}
            <Pressable onPress={addMetric}>Add Metric</Pressable>
        </View>
    );
};


function Delimiter() {
    return(
        <View style={ProgramFormStyle.delimiter}/>
    )
}
