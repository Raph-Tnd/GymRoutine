import { View, Text } from "react-native";
import React from "react";
import { ToolModel } from "@/model/ToolModel";
import StopwatchPressable from "./StopwatchPressable";
import ToolListStyle from "@/style/Tools/ToolListStyle";
import MetronomePressable from "./MetronomePressable";

export default function ToolList({
  callUpdateMethod,
  exerciseTimers,
}: {
  callUpdateMethod: (tool: ToolModel) => void;
  exerciseTimers: number[];
}) {
  return (
    <View style={ToolListStyle.container}>
      <StopwatchPressable
        callUpdateMethod={callUpdateMethod}
        timers={exerciseTimers}
      />
      <MetronomePressable />
    </View>
  );
}
