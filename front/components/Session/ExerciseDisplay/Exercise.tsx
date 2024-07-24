import { View, Text } from "react-native";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import ExerciseExpanded from "./ExerciseExpanded";
import { ExerciseModel, getPauseTimeFormatted } from "@/model/ExerciseModel";
import { MetricModel } from "@/model/MetricModel";
import GlobalStyle from "@/style/global/GlobalStyle";

export default function Exercise({
	exercise,
	callUpdateMetricMethod,
}: {
	exercise: ExerciseModel;
	callUpdateMetricMethod: (
		exercise: ExerciseModel,
		metric: MetricModel,
	) => void;
}) {
	const isPressing = useSharedValue(0);
	const expandMetrics = useSharedValue(0);
	const tap = Gesture.Tap()
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
	const expandMetricsAnimatedStyle = useAnimatedStyle(() => {
		return {
			height: withTiming(expandMetrics.value * 40),
		};
	});
	const updateMetric = (metric: MetricModel) => {
		callUpdateMetricMethod(exercise, metric);
	};
	return (
		<>
			<GestureDetector gesture={tap}>
				<Animated.View
					style={[GlobalStyle.pressable, pressableAnimatedStyle]}
				>
					<Text style={GlobalStyle.pressableMainLabel}>
						{exercise.name}
					</Text>
					<Delimiter />
					<Text>{`${exercise.sets}x${exercise.repsPerSet}`}</Text>
					<Delimiter />
					<Text>{`${exercise.weight}${exercise.weightUnit}`}</Text>
					<Delimiter />
					<Text>{getPauseTimeFormatted(exercise.pauseTime)}</Text>
				</Animated.View>
			</GestureDetector>
			<Animated.View
				style={[{ marginBottom: 10 }, expandMetricsAnimatedStyle]}
			>
				<ExerciseExpanded
					metrics={exercise.metrics}
					callUpdateMetricMethod={updateMetric}
				/>
			</Animated.View>
		</>
	);
}

function Delimiter() {
	return <View style={GlobalStyle.delimiter} />;
}
