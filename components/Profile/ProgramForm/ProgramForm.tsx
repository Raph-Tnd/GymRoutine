// ProgramForm.tsx
import React, { useContext, useEffect, useState } from "react";
import { TextInput, ScrollView, Pressable, View } from "react-native";
import SessionForm from "./SessionForm";
import { ProgramModel } from "@/model/ProgramModel";
import { SessionModel } from "@/model/SessionModel";
import ProgramFormStyle from "@/style/Profile/ProgramFormStyle";
import { AuthContext } from "@/components/global/Provider/AuthProvider";
import AddRemoveFormBloc from "./AddRemoveFormBloc";

const defaultSession: SessionModel = {
  name: "",
  exercises: [
    {
      name: "",
      sets: 0,
      repsPerSet: 0,
      pauseTime: 0,
      weight: 0,
      weightUnit: "kg",
      metrics: [],
    },
  ],
};

export default function ProgramForm() {
  const { currentUser } = useContext(AuthContext);
  const [program, setProgram] = useState<ProgramModel>({
    name: "",
    author: "",
    sessions: [],
  });

  const handleProgramNameChange = (name: string) => {
    setProgram((prev) => ({ ...prev, name }));
  };

  const addSession = () => {
    setProgram((prev) => ({
      ...prev,
      sessions: [
        ...prev.sessions,
        {
          name: "",
          exercises: [
            {
              name: "",
              sets: 0,
              repsPerSet: 0,
              pauseTime: 0,
              weight: 0,
              weightUnit: "kg",
              metrics: [],
            },
          ],
        },
      ],
    }));
  };

  const removeSession = () => {
    setProgram((prev) => ({
      ...prev,
      sessions: [...prev.sessions.splice(0, prev.sessions.length - 1)],
    }));
  };

  const updateSession = (updatedSession: SessionModel, index: number) => {
    setProgram((prev) => ({
      ...prev,
      sessions: prev.sessions.map((session, i) =>
        i === index ? updatedSession : session,
      ),
    }));
  };

  useEffect(() => {
    setProgram((prev) => ({
      ...prev,
      author: currentUser ? currentUser.user.email : "",
      sessions: [defaultSession],
    }));
  }, []);

  return (
    <ScrollView contentContainerStyle={ProgramFormStyle.body}>
      <TextInput
        style={ProgramFormStyle.programLabel}
        value={program.name}
        onChangeText={handleProgramNameChange}
        placeholder="Program name"
      />

      {program.sessions.map((session, index) => (
        <SessionForm
          key={index}
          session={session}
          onUpdate={(updatedSession) => updateSession(updatedSession, index)}
        />
      ))}
      <AddRemoveFormBloc
        style={"Session"}
        addMethod={addSession}
        removeMethod={removeSession}
      />
      <Pressable style={{}} onPress={() => console.log(program)}>
        Save Program
      </Pressable>
    </ScrollView>
  );
}

export function FormDelimiter() {
  return <View style={ProgramFormStyle.delimiter} />;
}
