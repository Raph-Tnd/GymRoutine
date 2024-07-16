// ProgramForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Pressable } from 'react-native';
import SessionForm from './SessionForm';
import { ProgramModel } from '@/model/ProgramModel';
import { SessionModel } from '@/model/SessionModel';
import ProgramFormStyle from '@/style/Profile/ProgramFormStyle';

export default function ProgramForm(){
    const [program, setProgram] = useState<ProgramModel>({
        name: '',
        author: '',
        sessions: [],
    });

    const handleProgramNameChange = (name: string) => {
        setProgram(prev => ({ ...prev, name }));
    };

    const addSession = () => {
        setProgram(prev => ({
        ...prev,
        sessions: [...prev.sessions, { name: '', exercises: [] }],
        }));
    };

    const updateSession = (updatedSession: SessionModel, index: number) => {
        setProgram(prev => ({
        ...prev,
        sessions: prev.sessions.map((session, i) => 
            i === index ? updatedSession : session
        ),
        }));
    };

    return (
        <ScrollView 
            contentContainerStyle={ProgramFormStyle.body}>
            <TextInput
                style={ProgramFormStyle.programLabel}
                value={program.name}
                onChangeText={handleProgramNameChange}
                placeholder="Enter program name"
            />

            {program.sessions.map((session, index) => (
                <SessionForm
                key={index}
                session={session}
                onUpdate={(updatedSession) => updateSession(updatedSession, index)}
                />
            ))}
            <Pressable onPress={addSession}>Add Session</Pressable>


            <Pressable style={{}} onPress={() => console.log(program)}>Save Program</Pressable>
        </ScrollView>
    );
};

