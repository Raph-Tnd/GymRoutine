// MetricForm.tsx
import { MetricModel } from "@/model/MetricModel";
import ProgramFormStyle from "@/style/Profile/ProgramFormStyle";
import MetricStyle from "@/style/Session/ExerciseDisplay/MetricDisplay/MetricStyle";
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { FormDelimiter } from "./ProgramForm";

export default function MetricForm({
  metric,
  onUpdate,
}: {
  metric: MetricModel;
  onUpdate: (metric: MetricModel) => void;
}) {
  const handleChange = (field: keyof MetricModel, value: string | number) => {
    onUpdate({ ...metric, [field]: value });
  };

  return (
    <View style={ProgramFormStyle.metric}>
      <TextInput
        style={ProgramFormStyle.metricInput}
        value={metric.name}
        onChangeText={(value) => handleChange("name", value)}
        placeholder="Metric"
      />
      <FormDelimiter />
      <TextInput
        style={ProgramFormStyle.metricInput}
        value={(metric.value ?? 0).toString()}
        onChangeText={(value) => handleChange("value", parseFloat(value) || 0)}
        keyboardType="numeric"
        placeholder="value"
      />
    </View>
  );
}
