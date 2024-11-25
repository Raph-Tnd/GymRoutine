import { View, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import ExerciseExpanded from "./ExerciseExpanded";
import { ExerciseModel, getPauseTimeFormatted } from "@/model/ExerciseModel";
import { MetricModel } from "@/model/MetricModel";
import GlobalStyle from "@/style/global/GlobalStyle";
import ExerciseStyle from "@/style/Program/session/exercice/ExerciseStyle";

export default function Exercise({
	exercise,
	index,
	updateExerciseMethod,
	callUpdateMetricMethod,
}: {
	exercise: ExerciseModel;
	index: number;
	updateExerciseMethod: (
		exercise: Partial<ExerciseModel>,
		index: number,
	) => void;
	callUpdateMetricMethod: (
		exercise: ExerciseModel,
		metric: MetricModel,
	) => void;
}) {
	const updateExercise = (exercise: Partial<ExerciseModel>) => {
		updateExerciseMethod(exercise, index);
	};
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
		return {};
	});
	return (
		<>
			<GestureDetector gesture={tap}>
				<Animated.View
					style={[ExerciseStyle.pressable, pressableAnimatedStyle]}
				>
					<Text style={ExerciseStyle.exerciseLabel}>
						{exercise.name}
					</Text>
					<Text
						style={ExerciseStyle.mainLabel}
					>{`${exercise.sets}x${exercise.repsPerSet}`}</Text>
					<Text
						style={ExerciseStyle.mainLabel}
					>{`${exercise.weight}${exercise.weightUnit}`}</Text>
					{exercise.pauseTime && (
						<Text style={ExerciseStyle.mainLabel}>
							{getPauseTimeFormatted(exercise.pauseTime)}
						</Text>
					)}
				</Animated.View>
			</GestureDetector>
			<ExerciseExpanded
				exercise={exercise}
				isExpanded={expandMetrics}
				updateExerciseMethod={updateExercise}
			/>
		</>
	);
}

function Delimiter() {
	return <View style={GlobalStyle.delimiter} />;
}
