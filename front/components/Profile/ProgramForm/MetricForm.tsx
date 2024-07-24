// MetricForm.tsx
import { MetricModel } from "@/model/MetricModel";
import ProgramFormStyle from "@/style/Profile/ProgramFormStyle";
import React from "react";
import { View, TextInput } from "react-native";
import { FormDelimiter } from "./ProgramForm";

export default function MetricForm({
	metric,
	onUpdate,
}: {
	metric: MetricModel;
	onUpdate: (metric: MetricModel) => void;
}) {
	const handleChange = (field: keyof MetricModel, value: string) => {
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
		</View>
	);
}
