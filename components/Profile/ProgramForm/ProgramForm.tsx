// ProgramForm.tsx
import React, { useContext, useEffect, useState } from "react";
import { TextInput, ScrollView, Pressable, View, Text } from "react-native";
import SessionForm from "./SessionForm";
import { ProgramModel } from "@/model/ProgramModel";
import { SessionModel } from "@/model/SessionModel";
import ProgramFormStyle from "@/style/Profile/ProgramFormStyle";
import { AuthContext } from "@/components/global/Provider/AuthProvider";
import AddRemoveFormBloc from "./AddRemoveFormBloc";
import { FlatList } from "react-native-gesture-handler";
import CreateProgramHeader from "../CreateProgramHeader";

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
    <>
      <CreateProgramHeader />
      <ScrollView contentContainerStyle={ProgramFormStyle.body}>
        <TextInput
          style={ProgramFormStyle.programLabel}
          value={program.name}
          onChangeText={handleProgramNameChange}
          placeholder="Program name"
        />
        <FlatList
          scrollEnabled={false}
          data={program.sessions}
          renderItem={({ item, index }) => (
            <SessionForm
              key={index}
              session={item}
              onUpdate={(updatedSession) =>
                updateSession(updatedSession, index)
              }
            />
          )}
          ListFooterComponentStyle={ProgramFormStyle.programFooter}
          ListFooterComponent={
            <AddRemoveFormBloc
              style={"Session"}
              addMethod={addSession}
              removeMethod={removeSession}
              removeActive={program.sessions.length > 1}
            />
          }
        />
      </ScrollView>
    </>
  );
}

export function FormDelimiter() {
  return <View style={ProgramFormStyle.delimiter} />;
}
