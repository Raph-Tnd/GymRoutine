import { Text, Pressable } from "react-native";
import React from "react";
import { MetricModel } from "@/model/MetricModel";
import MetricStyle from "@/style/Session/ExerciseDisplay/MetricDisplay/MetricStyle";

export default function Metric({
  metric,
  callUpdateMetricMethod,
}: {
  metric: MetricModel;
  callUpdateMetricMethod: (metric: MetricModel) => void;
}) {
  return (
    <Pressable
      style={MetricStyle.body}
      onPress={() => callUpdateMetricMethod(metric)}
    >
      <Text style={MetricStyle.label}>{metric.name}</Text>
      <Text style={MetricStyle.value}>{metric.value}</Text>
    </Pressable>
  );
}
