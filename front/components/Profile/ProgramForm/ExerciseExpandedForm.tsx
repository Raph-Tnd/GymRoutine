import { View } from "react-native";
import React from "react";
import { ExerciseModel } from "@/model/ExerciseModel";
import { MetricModel } from "@/model/MetricModel";
import MetricForm from "./MetricForm";
import AddRemoveFormBloc from "./AddRemoveFormBloc";
import ProgramFormStyle from "@/style/Profile/ProgramFormStyle";
import { FlatList } from "react-native-gesture-handler";

export default function ExerciseExpandedForm({
	exercise,
	onUpdate,
}: {
	exercise: ExerciseModel;
	onUpdate: (updatedExercise: ExerciseModel) => void;
}) {
	const addMetric = () => {
		onUpdate({
			...exercise,
			metrics: [...exercise.metrics, { name: "", value: 0 }],
		});
	};

	const removeMetric = () => {
		onUpdate({
			...exercise,
			metrics: [
				...exercise.metrics.splice(0, exercise.metrics.length - 1),
			],
		});
	};

	const updateMetric = (updatedMetric: MetricModel, index: number) => {
		onUpdate({
			...exercise,
			metrics: exercise.metrics.map((metric, i) =>
				i === index ? updatedMetric : metric,
			),
		});
	};
	return (
		<View style={ProgramFormStyle.metricView}>
			<FlatList
				contentContainerStyle={ProgramFormStyle.metricListContainer}
				style={ProgramFormStyle.metricList}
				data={exercise.metrics}
				horizontal={true}
				renderItem={({ item, index }) => (
					<MetricForm
						key={index}
						metric={item}
						onUpdate={(updatedMetric) =>
							updateMetric(updatedMetric, index)
						}
					/>
				)}
				ListFooterComponentStyle={ProgramFormStyle.metricFooter}
				ListFooterComponent={
					<AddRemoveFormBloc
						type={"Metric"}
						addMethod={addMetric}
						removeMethod={removeMetric}
						removeActive={exercise.metrics.length > 0}
					/>
				}
			/>
		</View>
	);
}
