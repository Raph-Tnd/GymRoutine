import { View, Pressable, Text } from "react-native";
import React, { useContext } from "react";
import SessionChangeStyle from "@/style/Session/SessionChangeStyle";
import { ProgramContext } from "../global/Provider/ProgramProvider";

export default function SessionChange({
  maxSession = 0,
  saveMethod,
}: {
  maxSession?: number;
  saveMethod: () => void;
}) {
  const { currentSessionIndex, setCurrentSessionIndex } =
    useContext(ProgramContext);
  const onSessionChange = (previous: boolean) => {
    saveMethod();
    setCurrentSessionIndex(currentSessionIndex + (previous ? -1 : 1));
  };
  return (
    <View style={SessionChangeStyle.body}>
      {currentSessionIndex > 0 ? (
        <Pressable
          style={SessionChangeStyle.pressable}
          onPress={() => onSessionChange(true)}
        >
          <Text style={SessionChangeStyle.pressableLabel}>Previous</Text>
        </Pressable>
      ) : (
        <View></View>
      )}
      {currentSessionIndex < maxSession ? (
        <Pressable
          style={SessionChangeStyle.pressable}
          onPress={() => onSessionChange(false)}
        >
          <Text style={SessionChangeStyle.pressableLabel}>Next</Text>
        </Pressable>
      ) : (
        <View></View>
      )}
    </View>
  );
}
