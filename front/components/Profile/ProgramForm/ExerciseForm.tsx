// ExerciseForm.tsx
import React from "react";
import { Text, TextInput, Pressable } from "react-native";
import { ExerciseModel } from "@/model/ExerciseModel";
import ProgramFormStyle from "@/style/Profile/ProgramFormStyle";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { Colors } from "@/style/Colors";
import { FormDelimiter } from "@/app/(tabs)/profile/(create)/create";
import ExerciseExpandedForm from "./ExerciseExpandedForm";

export default function ExerciseForm({
	exercise,
	index,
	onUpdate,
}: {
	exercise: ExerciseModel;
	index: number;
	onUpdate: (updatedExercise: ExerciseModel) => void;
}) {
	const handleChange = (
		field: keyof ExerciseModel,
		value: string | number,
	) => {
		onUpdate({ ...exercise, [field]: value });
	};
	const isPressing = useSharedValue(0);
	const expandMetrics = useSharedValue(0);
	const tap = Gesture.LongPress()
		.shouldCancelWhenOutside(true)
		.onBegin(() => {
			isPressing.value = 1;
		})
		.onTouchesCancelled(() => {
			isPressing.value = 0;
		})
		.onEnd(() => {
			isPressing.value = 0;
			expandMetrics.value = (expandMetrics.value + 1) % 2;
		});
	const expandMetricsAnimatedStyle = useAnimatedStyle(() => {
		return {
			height: withTiming(expandMetrics.value * 40),
		};
	});
	const pressableAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(isPressing.value, [0, 1], [1, 0.8]),
			shadowColor: interpolateColor(
				isPressing.value,
				[0, 1],
				["black", "transparent"],
			),
			elevation: interpolate(isPressing.value, [0, 1], [5, 0]),
		};
	});
	return (
		<>
			<GestureDetector gesture={tap}>
				<>
					<Animated.View
						style={[
							ProgramFormStyle.exercise,
							pressableAnimatedStyle,
						]}
					>
						<TextInput
							style={ProgramFormStyle.exerciseMainLabel}
							value={exercise.name}
							onChangeText={(value) =>
								handleChange("name", value)
							}
							placeholder={`Exercise ${index + 1}`}
							placeholderTextColor={Colors.air_force_blue}
						/>
						<FormDelimiter />
						<TextInput
							style={[
								ProgramFormStyle.exerciseLabel,
								exercise.sets == 0
									? ProgramFormStyle.exerciseLabelPlaceholder
									: null,
							]}
							selectTextOnFocus={true}
							value={exercise.sets.toString()}
							onChangeText={(value) =>
								handleChange("sets", parseInt(value) || 0)
							}
							keyboardType="numeric"
						/>
						<Text style={ProgramFormStyle.exerciseInputCue}>x</Text>
						<TextInput
							style={[
								ProgramFormStyle.exerciseLabel,
								exercise.repsPerSet == 0
									? ProgramFormStyle.exerciseLabelPlaceholder
									: null,
							]}
							selectTextOnFocus={true}
							value={exercise.repsPerSet.toString()}
							onChangeText={(value) =>
								handleChange("repsPerSet", parseInt(value) || 0)
							}
							keyboardType="numeric"
						/>
						<FormDelimiter />
						<TextInput
							style={ProgramFormStyle.exerciseLabel}
							value={exercise.weight.toString()}
							onChangeText={(value) =>
								handleChange("weight", parseFloat(value) || 0)
							}
							keyboardType="numeric"
							placeholder="0"
							placeholderTextColor={Colors.air_force_blue}
						/>
						<TextInput
							style={ProgramFormStyle.exerciseLabel}
							value={exercise.weightUnit}
							onChangeText={(value) =>
								handleChange("weightUnit", value)
							}
							placeholder="Weight Unit)"
						/>
						<FormDelimiter />
						<TextInput
							style={ProgramFormStyle.exerciseLabel}
							value={exercise.pauseTime.toString()}
							onChangeText={(value) =>
								handleChange("pauseTime", parseInt(value) || 0)
							}
							keyboardType="numeric"
							placeholder="Pause time (sec)"
						/>
						<Text
							style={[
								ProgramFormStyle.exerciseInputCue,
								ProgramFormStyle.exerciceInputCueEdge,
							]}
						>
							s
						</Text>
					</Animated.View>
				</>
			</GestureDetector>
			<Animated.View
				style={[{ marginBottom: 10 }, expandMetricsAnimatedStyle]}
			>
				<ExerciseExpandedForm exercise={exercise} onUpdate={onUpdate} />
			</Animated.View>
		</>
	);
}
