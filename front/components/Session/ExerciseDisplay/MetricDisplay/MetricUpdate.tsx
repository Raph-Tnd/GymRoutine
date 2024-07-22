import React from "react";
import { MetricModel, metricPossibleValue } from "@/model/MetricModel";
import { FlatList } from "react-native-gesture-handler";
import MetricChoicePressable from "./MetricChoicePressable";
import { Text } from "react-native";
import BottomSheetStyle from "@/style/global/BottomSheet/BottomSheetStyle";

export default function MetricUpdate({
  metric,
  updateMethod,
}: {
  metric: MetricModel;
  updateMethod: (metric: MetricModel) => void;
}) {
  const metricChoices = metricPossibleValue(metric);
  const updateMetric = (value: number) => {
    metric.value = value;
    updateMethod(metric);
  };
  return (
    <>
      <Text style={BottomSheetStyle.name}>{metric.name}</Text>
      {metricChoices.length <= 10 && (
        <FlatList
          style={BottomSheetStyle.numberListContainer}
          contentContainerStyle={BottomSheetStyle.numberList}
          numColumns={5}
          data={metricChoices}
          renderItem={({ item }) => (
            <MetricChoicePressable choice={item} updateMethod={updateMetric} />
          )}
        />
      )}
    </>
  );
}
