// ProgramForm.tsx
import React, { useContext } from "react";
import { TextInput, ScrollView, View } from "react-native";
import SessionForm from "./SessionForm";
import { ProgramModel } from "@/model/ProgramModel";
import { SessionModel, newSession } from "@/model/SessionModel";
import ProgramFormStyle from "@/style/Profile/ProgramFormStyle";
import { AuthContext } from "@/components/global/Provider/AuthProvider";
import AddRemoveFormBloc from "./AddRemoveFormBloc";
import { FlatList } from "react-native-gesture-handler";
import CreateProgramHeader from "../CreateProgramHeader";
import { CreatedProgramContext } from "@/components/global/Provider/CreatedProgramProvider";
import { Colors } from "@/style/Colors";
import { GlobalAlert } from "@/components/global/GlobalAlert/GlobalAlert";
import GlobalStyle from "@/style/global/GlobalStyle";

export default function ProgramForm() {
  const { currentUser } = useContext(AuthContext);
  const { currentCreatedProgram, setCurrentCreatedProgram } = useContext(
    CreatedProgramContext,
  );

  const handleProgramNameChange = (name: string) => {
    if (currentCreatedProgram) {
      let newCreatedProgram = currentCreatedProgram;
      newCreatedProgram.name = name;
      setCurrentCreatedProgram({ ...newCreatedProgram });
    }
  };

  const addSession = () => {
    if (currentCreatedProgram) {
      let newCreatedProgram = currentCreatedProgram;
      newCreatedProgram.sessions = [
        ...newCreatedProgram.sessions,
        newSession(currentCreatedProgram.sessions.length + 1),
      ];
      setCurrentCreatedProgram({ ...newCreatedProgram });
    }
  };

  const removeSession = () => {
    if (currentCreatedProgram) {
      let newCreatedProgram = currentCreatedProgram;
      newCreatedProgram.sessions = newCreatedProgram.sessions.splice(
        0,
        newCreatedProgram.sessions.length - 1,
      );
      setCurrentCreatedProgram({ ...newCreatedProgram });
    }
  };

  const updateSession = (updatedSession: SessionModel, index: number) => {
    if (currentCreatedProgram) {
      let newCreatedProgram = currentCreatedProgram;
      newCreatedProgram.sessions[index] = updatedSession;
      setCurrentCreatedProgram({ ...newCreatedProgram });
    }
  };

  return (
    <View style={GlobalStyle.body}>
      <CreateProgramHeader />
      {currentCreatedProgram && (
        <ScrollView contentContainerStyle={ProgramFormStyle.body}>
          <TextInput
            style={ProgramFormStyle.programLabel}
            value={currentCreatedProgram.name}
            onChangeText={handleProgramNameChange}
            placeholder="Program name"
            placeholderTextColor={Colors.red}
          />
          <FlatList
            scrollEnabled={false}
            data={currentCreatedProgram.sessions}
            renderItem={({ item, index }) => (
              <SessionForm
                key={index}
                session={item}
                index={index}
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
                removeActive={currentCreatedProgram.sessions.length > 1}
              />
            }
          />
        </ScrollView>
      )}
    </View>
  );
}

export function FormDelimiter() {
  return <View style={ProgramFormStyle.delimiter} />;
}
