import { Text } from "react-native";
import React from "react";
import { ProgramModel } from "@/model/ProgramModel";
import GlobalStyle from "@/style/global/GlobalStyle";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import ProgramExpandedDisplay from "./ProgramExpandedDisplay";

export default function ProgramShortDisplay({
	program,
}: {
	program: ProgramModel;
}) {
	const isPressing = useSharedValue(0);
	const expandActions = useSharedValue(0);
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
			expandActions.value = (expandActions.value + 1) % 2;
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
	const expandActionAnimatedStyle = useAnimatedStyle(() => {
		return {
			height: withTiming(expandActions.value * 40),
		};
	});
	return (
		<>
			<GestureDetector gesture={tap}>
				<Animated.View
					style={[GlobalStyle.pressable, pressableAnimatedStyle]}
				>
					<Text style={GlobalStyle.pressableMainLabel}>
						{program.name + " by @" + program.author}
					</Text>
				</Animated.View>
			</GestureDetector>
			<Animated.View
				style={[{ marginBottom: 10 }, expandActionAnimatedStyle]}
			>
				<ProgramExpandedDisplay program={program} />
			</Animated.View>
		</>
	);
}
