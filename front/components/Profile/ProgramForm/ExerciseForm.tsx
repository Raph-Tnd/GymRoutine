import { TextInput, Pressable, View } from "react-native";
import { ExerciseModel, mandatoryExerciseField } from "@/model/ExerciseModel";
import ProgramFormStyle from "@/style/Profile/ProgramFormStyle";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import { Colors } from "@/style/Colors";
import { Picker } from "@react-native-picker/picker";
import { Trash2 } from "lucide-react-native";
import {
	removeExercise,
	updateExerciseProp,
} from "@/features/program/createdProgramSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";

export default function ExerciseForm({
	exercise,
	sessionIndex,
	exerciseIndex,
}: {
	exercise: ExerciseModel;
	sessionIndex: number;
	exerciseIndex: number;
}) {
	const dispatch = useDispatch<AppDispatch>();

	const removeCurrentExercise = () => {
		dispatch(
			removeExercise({
				sessionIndex: sessionIndex,
				exerciseIndex: exerciseIndex,
			}),
		);
	};

	const updateExercise = (
		field: keyof ExerciseModel,
		value: string | number,
	) => {
		dispatch(
			updateExerciseProp({
				exerciseProp: { key: field, value: value },
				sessionIndex: sessionIndex,
				exerciseIndex: exerciseIndex,
			}),
		);
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
	/* const expandMetricsAnimatedStyle = useAnimatedStyle(() => {
		return {
			height: withTiming(expandMetrics.value * 40),
		};
	}); */
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
							ProgramFormStyle.exerciseContainerAnimatedView,
							pressableAnimatedStyle,
						]}
					>
						{Object.entries(exercise).map((item) => {
							let key = item[0] as keyof ExerciseModel;
							let prop = exercise[key];
							switch (typeof prop) {
								case "string":
									switch (key) {
										case "weightUnit":
											return (
												<Picker
													key={key}
													selectedValue={prop}
													onValueChange={(
														value,
														index,
													) => {
														updateExercise(
															key,
															value,
														);
													}}
													style={
														ProgramFormStyle.exercisePicker
													}
												>
													<Picker.Item
														label={"kg"}
														value={"kg"}
													/>
													<Picker.Item
														label={"lbs"}
														value={"lbs"}
													/>
												</Picker>
											);
										default:
											return (
												<View
													key={key}
													style={
														ProgramFormStyle.exerciseTextInputContainer
													}
												>
													<TextInput
														style={[
															ProgramFormStyle.exerciseLabel,
															key == "name"
																? ProgramFormStyle.exerciseMainLabel
																: key == "note"
																	? ProgramFormStyle.exerciseNoteLabel
																	: null,
														]}
														value={prop}
														onChangeText={(value) =>
															updateExercise(
																key,
																value,
															)
														}
														placeholder={
															key == "name"
																? "Exercise name"
																: `${item[0]}`
														}
														placeholderTextColor={
															mandatoryExerciseField.includes(
																key,
															)
																? Colors.red
																: Colors.text_secondary
														}
													/>
													{key == "note" && (
														<Pressable
															style={
																ProgramFormStyle.exerciseRemove
															}
															onPress={
																removeCurrentExercise
															}
														>
															<Trash2
																size={16}
																color={
																	Colors.text_secondary
																}
															/>
														</Pressable>
													)}
												</View>
											);
									}
								case "number":
									if (key != "rmPercentage") {
										return (
											<TextInput
												key={key}
												style={
													ProgramFormStyle.exerciseLabel
												}
												value={
													prop == 0
														? ""
														: prop.toString()
												}
												onChangeText={(value) => {
													if (!isNaN(+value)) {
														updateExercise(
															key,
															value == ""
																? 0
																: parseInt(
																		value,
																	),
														);
													}
												}}
												placeholder={`${
													key == "pauseTime"
														? "pause (sec)"
														: key
																.toString()
																.split(
																	/(?<![A-Z])(?=[A-Z])/,
																)
																.join(" ")
																.toLowerCase()
												}`}
												placeholderTextColor={
													mandatoryExerciseField.includes(
														key,
													)
														? Colors.red
														: Colors.text_secondary
												}
												keyboardType="numeric"
											/>
										);
									}
								default:
									return null;
							}
						})}
					</Animated.View>
				</>
			</GestureDetector>
			{/* <Animated.View
				style={[{ marginBottom: 10 }, expandMetricsAnimatedStyle]}
			>
				<ExerciseExpandedForm exercise={exercise} onUpdate={onUpdate} />
			</Animated.View> */}
		</>
	);
}
