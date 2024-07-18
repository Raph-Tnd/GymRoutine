import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { ToolModel } from "@/model/ToolModel";
import BottomSheetStyle from "@/style/global/BottomSheet/BottomSheetStyle";
import ToolChoicePressable from "./ToolChoicePressable";

export default function ToolDisplay({
  tool,
  applyMethod,
}: {
  tool: ToolModel;
  applyMethod: () => void;
}) {
  return (
    <>
      <Text style={BottomSheetStyle.name}>{tool.name}</Text>
      {
        <FlatList
          style={BottomSheetStyle.numberListContainer}
          contentContainerStyle={BottomSheetStyle.numberList}
          data={[...new Set(tool.values)].sort((a, b) => {
            return a - b;
          })}
          renderItem={({ item }) => (
            <ToolChoicePressable
              choice={item}
              tool={tool}
              applyMethod={applyMethod}
            ></ToolChoicePressable>
          )}
        />
      }
    </>
  );
}
