import { View, Text, Pressable } from "react-native";
import React from "react";
import ProgramFormStyle from "@/style/Profile/ProgramFormStyle";

export default function AddRemoveFormBloc({
  style,
  addMethod,
  removeMethod,
}: {
  style: "Session" | "Exercise" | "Metric";
  addMethod: () => void;
  removeMethod: () => void;
}) {
  const colors = () => {
    switch (style) {
      case "Session":
        return ProgramFormStyle.addRemovePressableSession;
      case "Exercise":
        return ProgramFormStyle.addRemovePressableExercise;
      case "Metric":
        return ProgramFormStyle.addRemovePressableMetric;
    }
  };
  return (
    <View style={ProgramFormStyle.addRemovePressableContainer}>
      <Pressable
        style={[ProgramFormStyle.addRemovePressable, colors()]}
        onPress={removeMethod}
      >
        <Text style={ProgramFormStyle.addRemoveLabel}>-</Text>
      </Pressable>
      <Pressable
        style={[ProgramFormStyle.addRemovePressable, colors()]}
        onPress={addMethod}
      >
        <Text style={ProgramFormStyle.addRemoveLabel}>+</Text>
      </Pressable>
    </View>
  );
}
