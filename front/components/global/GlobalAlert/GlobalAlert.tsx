import { AppDispatch, RootState } from "@/app/store";
import { resetAlertMessage } from "@/features/alert/globalAlertSlice";
import BottomSheetStyle from "@/style/global/BottomSheet/BottomSheetStyle";
import GlobalAlertStyle from "@/style/global/GlobalAlert/GlobalAlertStyle";
import GlobalStyle from "@/style/global/GlobalStyle";
import { useEffect } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

export function GlobalAlert({
	validateFunction,
	duration = 250,
}: {
	validateFunction?: () => void;
	duration?: number;
}) {
	const dispatch = useDispatch<AppDispatch>();
	const isOpen = useSharedValue<boolean>(false);
	const globalAlertMessage = useSelector(
		(state: RootState) => state.globalAlert,
	);
	const backdropStyle = useAnimatedStyle(() => ({
		opacity: isOpen.value ? withTiming(1, { duration }) : 0,
		zIndex: isOpen.value
			? 3
			: withDelay(duration, withTiming(-1, { duration: 0 })),
	}));

	useEffect(() => {
		isOpen.value = globalAlertMessage != "";
	}, [globalAlertMessage]);
	return (
		<>
			<Animated.View style={[GlobalAlertStyle.backdrop, backdropStyle]}>
				<TouchableOpacity
					style={BottomSheetStyle.backdropTouch}
					onPress={() => {
						if (isOpen.value) {
							dispatch(resetAlertMessage());
						}
					}}
				>
					<View style={GlobalAlertStyle.sheet}>
						<Text style={GlobalAlertStyle.information}>
							{globalAlertMessage}
						</Text>
						<View style={GlobalAlertStyle.pressableList}>
							{validateFunction != undefined && (
								<Pressable
									style={[
										GlobalAlertStyle.pressable,
										GlobalAlertStyle.pressableCancel,
									]}
									onPress={() => {
										if (isOpen.value) {
											dispatch(resetAlertMessage());
										}
									}}
								>
									<Text
										style={GlobalStyle.pressableMainLabel}
									>
										Cancel
									</Text>
								</Pressable>
							)}

							<Pressable
								style={[GlobalAlertStyle.pressable]}
								onPress={() => {
									if (isOpen.value) {
										dispatch(resetAlertMessage());
									}
								}}
							>
								<Text style={GlobalStyle.pressableMainLabel}>
									Ok
								</Text>
							</Pressable>
						</View>
					</View>
				</TouchableOpacity>
			</Animated.View>
		</>
	);
}
