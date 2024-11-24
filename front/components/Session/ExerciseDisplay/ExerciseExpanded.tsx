import { TextInput } from "react-native";
import Metric from "./MetricDisplay/Metric";
import { MetricModel } from "@/model/MetricModel";
import { FlatList } from "react-native-gesture-handler";
import ExerciseExpandedStyle from "@/style/Session/ExerciseDisplay/ExerciseExpandedStyle";
import Animated, {
	SharedValue,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
import { Colors } from "@/style/Colors";
import { ExerciseModel } from "@/model/ExerciseModel";

export default function ExerciseExpanded({
	exercise,
	isExpanded,
	updateExerciseMethod,
}: {
	exercise: ExerciseModel;
	isExpanded: SharedValue<number>;
	updateExerciseMethod: (exercise: Partial<ExerciseModel>) => void;
}) {
	const expandMetricsAnimatedStyle = useAnimatedStyle(() => {
		return {
			height: withTiming(isExpanded.value * 80),
			borderWidth: withTiming(isExpanded.value),
			borderTopWidth: 0,
		};
	});
	const expandNoteAnimatedStyle = useAnimatedStyle(() => {
		return {
			height: withTiming(isExpanded.value * 39),
			borderTopWidth: withTiming(isExpanded.value),
			borderColor: Colors.border_color,
		};
	});
	return (
		<Animated.View
			style={[ExerciseExpandedStyle.body, expandMetricsAnimatedStyle]}
		>
			<FlatList
				contentContainerStyle={
					ExerciseExpandedStyle.metricListContainer
				}
				horizontal={true}
				style={ExerciseExpandedStyle.metricList}
				data={exercise.metrics}
				renderItem={({ item }) => <Metric metric={item} />}
			/>
			<Animated.View style={expandNoteAnimatedStyle}>
				<TextInput
					value={exercise.note}
					onChangeText={(text: string) => {
						updateExerciseMethod({ note: text });
					}}
					placeholder={"Note..."}
					placeholderTextColor={Colors.text_secondary}
					style={ExerciseExpandedStyle.noteInput}
				/>
			</Animated.View>
		</Animated.View>
	);
}
