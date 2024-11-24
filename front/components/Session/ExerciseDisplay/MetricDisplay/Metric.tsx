import { Text, Pressable } from "react-native";
import React from "react";
import { MetricModel } from "@/model/MetricModel";
import MetricStyle from "@/style/Session/ExerciseDisplay/MetricDisplay/MetricStyle";

export default function Metric({ metric }: { metric: MetricModel }) {
	return (
		<Pressable style={MetricStyle.body} onPress={() => {}}>
			<Text style={MetricStyle.label}>{metric.name}</Text>
			<Text style={MetricStyle.value}>{metric.value}</Text>
		</Pressable>
	);
}
