// SessionForm.tsx
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import ExerciseForm from './ExerciseForm';
import { SessionModel } from '@/model/SessionModel';
import { ExerciseModel } from '@/model/ExerciseModel';
import ProgramFormStyle from '@/style/Profile/ProgramFormStyle';

interface SessionFormProps {
    session: SessionModel;
    onUpdate: (updatedSession: SessionModel) => void;
}

export default function SessionForm({ session, onUpdate } : { session : SessionModel, onUpdate : (updatedSession: SessionModel) => void}){
    const handleSessionNameChange = (name: string) => {
        onUpdate({ ...session, name });
    };

    const addExercise = () => {
        onUpdate({
        ...session,
        exercises: [...session.exercises, {
            name: '',
            sets: 0,
            repsPerSet: 0,
            weight: 0,
            weightUnit: "kg",
            pauseTime: 0,
            metrics: [],
        }],
        });
    };

    const updateExercise = (updatedExercise: ExerciseModel, index: number) => {
        onUpdate({
        ...session,
        exercises: session.exercises.map((exercise, i) => 
            i === index ? updatedExercise : exercise
        ),
        });
    };

    return (
        <View style={ProgramFormStyle.session}>
            <TextInput
                style={ProgramFormStyle.sessionLabel}
                value={session.name}
                onChangeText={handleSessionNameChange}
                placeholder="Enter session name"
            />
            {session.exercises.map((exercise, index) => (
                <ExerciseForm
                key={index}
                exercise={exercise}
                onUpdate={(updatedExercise) => updateExercise(updatedExercise, index)}
                />
            ))}
            <Pressable  onPress={addExercise}>Add Exercise</Pressable>
        </View>
    );
};
