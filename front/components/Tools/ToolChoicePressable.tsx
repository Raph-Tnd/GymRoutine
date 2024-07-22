import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import BottomSheetStyle from "@/style/global/BottomSheet/BottomSheetStyle";
import { getPauseTimeFormatted } from "@/model/ExerciseModel";
import { ToolModel } from "@/model/ToolModel";
import { TimerContext } from "../Session/Session";

export default function ToolChoicePressable({
  choice,
  tool,
  applyMethod,
}: {
  choice: number;
  tool: ToolModel;
  applyMethod: () => void;
}) {
  const { setCurrentTimer } = useContext(TimerContext);
  const onPressHandler = () => {
    switch (tool.name.toLowerCase()) {
      case "stopwatch":
        setCurrentTimer(choice);
        break;
    }
    applyMethod();
  };
  return (
    <Pressable style={BottomSheetStyle.longPressable} onPress={onPressHandler}>
      <Text style={BottomSheetStyle.pressableLabel}>
        {getPauseTimeFormatted(choice)}
      </Text>
    </Pressable>
  );
}
